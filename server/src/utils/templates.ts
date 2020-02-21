import cloudinary from 'cloudinary';
import fs from 'fs-extra';
import path from 'path';
import Boom from '@hapi/boom';
import word2pdf from 'word2pdf';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { readJSON, writeStreamFromURL, writeToTemp } from '../utils/files';
import rootDir from '../constants/rootDir';
import docxParser from '../constants/docxParser';
import { CloudinaryResource } from '../interfaces/cloudinary';

export const buildTemplatePreviews = async () => {
  try {
    const templates = await cloudinary.v2.api.resources({
      resource_type: 'raw',
      type: 'upload',
      prefix: 'resume_architect/resumes'
    });

    for (const template of templates.resources) {
      await writeStreamFromURL(template.secure_url, 'temp/template.docx');

      const templateData = await readJSON('template_sample_data.json');
      const populatedTemplate = await populateTemplate('temp/template.docx', templateData);
      await writeToTemp('populated_template.docx', populatedTemplate);

      const pdf = await word2pdf(path.join(rootDir, 'temp/populated_template.docx'), 'binary');
      await writeToTemp('template_preview.pdf', pdf);

      // Change the resumes folder to previews, and the docx extension to pdf.
      const pdfFileName = template.public_id.replace('resumes/', 'previews/').replace('docx', 'pdf');

      await cloudinary.v2.uploader.upload(path.join(rootDir, 'temp/template_preview.pdf'), {
        public_id: pdfFileName,
        resource_type: 'image'
      });
    }

    console.log('Previews uploaded');
  } catch (err) {
    console.log(err);
    throw Boom.badImplementation('Something went wrong building the templates.');
  }
};

export const populateTemplate = async (inputFilePath: string, templateData: any) => {
  try {
    const template = await fs.readFile(path.join(rootDir, inputFilePath), 'binary');

    const zipContent = new PizZip(template);
    const doc = new Docxtemplater();
    await doc.loadZip(zipContent).setOptions({ parser: docxParser });

    doc.setData(templateData);
    doc.render();

    const buffer = doc.getZip().generate({ type: 'nodebuffer' });
    return buffer;
  } catch (err) {
    console.log(err);
    throw Boom.badImplementation('Something went wrong filling a template.');
  }
};

export const fetchAndStorePreviewLinks = async () => {
  try {
    const templates = await cloudinary.v2.api.resources({
      type: 'upload',
      prefix: 'resume_architect/previews',
      max_results: 500
    });

    // Returns all template previews with a .png extension
    const templatePreviews = templates.resources.map((pdf: CloudinaryResource) => {
      const url = `${pdf.secure_url.slice(0, -4)}.png`;
      const name = pdf.public_id.substring(pdf.public_id.lastIndexOf('/') + 1);

      return {
        name,
        url
      };
    });

    await fs.writeFile('template_previews.json', JSON.stringify(templatePreviews));
    console.log('Previews list updated');
  } catch (err) {
    console.log(err);
    throw Boom.badImplementation('Something went wrong fetching and storing the preview links.');
  }
};
