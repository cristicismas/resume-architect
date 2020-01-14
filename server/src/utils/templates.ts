import * as cloudinary from 'cloudinary';
import * as fs from 'fs';
import { IResume } from '../interfaces/resume';

export const fetchTemplatePreviews = async () => {
  const templates = await cloudinary.v2.api.resources({
    type: 'upload',
    prefix: 'resume_architect/previews'
  });

  // Returns all template previews with a .png extension
  const templatePreviews = templates.resources.map((pdf: IResume) => {
    return {
      name: pdf.public_id,
      url: getPngURL(pdf.secure_url)
    };
  });

  fs.writeFile('template_previews.json', JSON.stringify(templatePreviews), () => {
    console.log('Template previews list updated');
  })
};

const getPngURL = (originalURL: string) => `${originalURL.slice(0, -4)}.png`;
