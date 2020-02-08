import cloudinary from 'cloudinary';
import fs from 'fs-extra';
import path from 'path';
import Boom from '@hapi/boom';
import request from 'request';
import word2pdf from 'word2pdf';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import CONSTANTS from '../constants';

import { CloudinaryResource } from '../interfaces/cloudinary';

export const buildTemplatePreviews = async () => {
  try {
    const templates = await cloudinary.v2.api.resources({
      resource_type: 'raw',
      type: 'upload',
      prefix: 'resume_architect/resumes'
    });

    for (const template of templates.resources) {
      await writeTemplateLocally(template, 'temp/template.docx');

      const templateData = JSON.parse(fs.readFileSync('template_sample_data.json', 'UTF8'));
      const populatedTemplate = await populateTemplate('temp/template.docx', templateData);
      fs.writeFileSync(path.join(CONSTANTS.rootDir, 'temp/populated_template.docx'), populatedTemplate);

      const pdf = await word2pdf(path.join(CONSTANTS.rootDir, 'temp/populated_template.docx'), 'binary');
      await fs.writeFile(path.join(CONSTANTS.rootDir, 'temp/template_preview.pdf'), pdf);

      // Change the resumes folder to previews, and the docx extension to pdf.
      const pdfFileName = template.public_id.replace('resumes/', 'previews/').replace('docx', 'pdf');

      await cloudinary.v2.uploader.upload(path.join(CONSTANTS.rootDir, 'temp/template_preview.pdf'), {
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

export const writeTemplateLocally = (template: CloudinaryResource, filePath: string) => {
  return new Promise((resolve, reject) => {
    const writeStream = request(template.secure_url).pipe(fs.createWriteStream(path.join(CONSTANTS.rootDir, filePath)));

    writeStream.on('finish', resolve);
    writeStream.on('error', reject);
  });
};

export const populateTemplate = async (inputFilePath: string, templateData: any) => {
  try {
    const template = await fs.readFile(path.join(CONSTANTS.rootDir, inputFilePath), 'binary');

    const zipContent = new PizZip(template);
    const doc = new Docxtemplater();
    await doc.loadZip(zipContent).setOptions({ parser: CONSTANTS.customDocxParser });

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

    fs.writeFile('template_previews.json', JSON.stringify(templatePreviews), () => {
      console.log('Previews list updated');
    });
  } catch (err) {
    console.log(err);
    throw Boom.badImplementation('Something went wrong fetching and storing the preview links.');
  }
};
