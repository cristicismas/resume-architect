import * as cloudinary from 'cloudinary';
import * as request from 'request';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as word2pdf from 'word2pdf';
import * as Docxtemplater from 'docxtemplater';
import * as PizZip from 'pizzip';
import * as Boom from '@hapi/boom';

import { CloudinaryResource } from '../interfaces/cloudinary';

export const buildTemplatePreviews = async () => {
  try {
    const templates = await cloudinary.v2.api.resources({
      resource_type: 'raw',
      type: 'upload',
      prefix: 'resume_architect/resumes'
    });

    for (const template of templates.resources) {
      await writeTemplateLocally(template);
      await populateTemplate();

      const pdf = await word2pdf(path.join(__dirname, '../../temp/populated_template.docx'), 'binary');
      await fs.writeFile(path.join(__dirname, '../../temp/template_preview.pdf'), pdf);

      // Change the pdf folder to previews, and the extension to pdf.
      const pdfFileName = template.public_id.replace('resumes/', 'previews/').replace('docx', 'pdf');

      await cloudinary.v2.uploader.upload(path.join(__dirname, '../../temp/template_preview.pdf'), {
        public_id: pdfFileName,
        resource_type: 'image'
      });

      console.log('Previews uploaded');
    }
  } catch (err) {
    return Boom.badImplementation('Something went wrong building the templates.');
  }
};

const writeTemplateLocally = (template: CloudinaryResource) => {
  return new Promise((resolve, reject) => {
    const writeStream = request(template.secure_url).pipe(
      fs.createWriteStream(path.join(__dirname, '../../temp/template.docx'))
    );

    writeStream.on('finish', resolve);
    writeStream.on('error', reject);
  });
};

const populateTemplate = async () => {
  try {
    const template = await fs.readFile(path.join(__dirname, '../../temp/template.docx'), 'binary');

    const zipContent = new PizZip(template);
    const doc = new Docxtemplater();
    await doc.loadZip(zipContent);

    const template_sample_data = JSON.parse(fs.readFileSync('template_sample_data.json', 'UTF8'));
    doc.setData(template_sample_data);
    doc.render();

    const buffer = doc.getZip().generate({ type: 'nodebuffer' });
    fs.writeFileSync(path.join(__dirname, '../../temp/populated_template.docx'), buffer);
  } catch (err) {
    return Boom.badImplementation('Something went wrong filling a template.');
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
    return Boom.badImplementation('Something went wrong fetching and storing the preview links.');
  }
};
