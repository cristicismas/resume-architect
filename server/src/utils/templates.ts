import * as cloudinary from 'cloudinary';
import * as fs from 'fs';
import { IResume } from '../interfaces/resume';

export const fetchTemplateLinks = async () => {
  const templates = await cloudinary.v2.api.resources({
    type: 'upload',
    prefix: 'resume_architect/'
  });

  // Returns all template links with a .png extension
  const templateLinks = templates.resources.map((pdf: IResume) => {
    return {
      name: pdf.public_id,
      url: getPngURL(pdf.secure_url)
    };
  });

  fs.writeFile('template_links.json', JSON.stringify(templateLinks), () => {
    console.log('Templates list updated');
  })
};

const getPngURL = (originalURL: string) => `${originalURL.slice(0, -4)}.png`;
