import fs from 'fs-extra';
import path from 'path';
import word2pdf from 'word2pdf';
import cloudinary from 'cloudinary';
import Boom from '@hapi/boom';
import { CloudinaryResource } from '../interfaces/cloudinary';
import { getTempFileName, readJSON, removeFile, writeStreamFromURL } from '../utils/files';
import { populateTemplate } from '../utils/templates';
import CONSTANTS from '../constants';

const getResumeLink = async (resumeName: string) => {
  try {
    const resumes = await readJSON('resumes_list.json');

    const remoteResumePath = `resume_architect/resumes/${resumeName.slice(0, -4)}.docx`;
    const foundResume = resumes.find((resume: CloudinaryResource) => resume.public_id === remoteResumePath);

    return foundResume;
  } catch (err) {
    console.log(err);
    return Boom.badImplementation("Couldn't find the requested resume.");
  }
};

export const fetchAndStoreResumeLinks = async () => {
  try {
    const resumes = await cloudinary.v2.api.resources({
      resource_type: 'raw',
      type: 'upload',
      prefix: 'resume_architect/resumes'
    });

    const resumesList = resumes.resources.map((resume: CloudinaryResource) => {
      const { secure_url, public_id } = resume;

      return {
        secure_url,
        public_id
      };
    });

    await fs.writeFile('resumes_list.json', JSON.stringify(resumesList));
    console.log('Resumes list updated');
  } catch (err) {
    console.log(err);
    return Boom.badImplementation('Something went wrong fetching or storing the resume links.');
  }
};

export const getResumeDOCX = async (resumeName: string, resumeData: any) => {
  try {
    const resume = await getResumeLink(resumeName);

    const localResumePath = getTempFileName('.docx');
    await writeStreamFromURL(resume.secure_url, localResumePath);

    const populatedResume = await populateTemplate(localResumePath, resumeData);
    removeFile(localResumePath);

    return populatedResume;
  } catch (err) {
    console.log(err);
    return Boom.badImplementation('Something went wrong getting the resume DOCX file.');
  }
};

export const getResumePDF = async (resumeName: string, resumeData: any) => {
  try {
    const docxBuffer = await getResumeDOCX(resumeName, resumeData);
    const docxPath = path.join(CONSTANTS.rootDir, getTempFileName('.docx'));
    await fs.writeFile(docxPath, docxBuffer);

    const pdfBuffer = await word2pdf(docxPath);
    fs.unlink(docxPath);

    return pdfBuffer;
  } catch (err) {
    console.log(err);
    return Boom.badImplementation('Something went wrong getting the resume PDF file.');
  }
};
