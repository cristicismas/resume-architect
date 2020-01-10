import * as cloudinary from 'cloudinary';

import { IResume } from '../interfaces/resume';

export const getTemplateLinks = async () => {
  const templates = await cloudinary.v2.api.resources({ type: 'upload', prefix: 'resume_architect/' });

  // Returns all template links with a .png extension in an array
  return templates.resources.map((pdf: IResume) => {
    return `${pdf.secure_url.slice(0, -4)}.png`;
  });
};
