import Boom from '@hapi/boom';
import Resume from '../models/resume';
import { Request, ResponseToolkit } from 'hapi';
import { getResumeDOCX, getResumePDF, sanitizeAndFormatFormData } from '../utils/resume';
import { safelyParseJSON } from '../utils/json';
import { IResumeData, IResumeToSave } from '../interfaces/resume';
import SCHEMAS from '../constants/schemas';
import MIME_TYPES from '../constants/mimeTypes';

export const buildResume = async (request: Request, res: ResponseToolkit) => {
  try {
    const { resumeType, resumeName } = request.params;
    let resumeData = request.payload as IResumeData;

    resumeData = sanitizeAndFormatFormData(safelyParseJSON(request.payload));

    try {
      await SCHEMAS.buildResumeSchema.validateAsync(resumeData);
    } catch (err) {
      console.log(err);
      return Boom.badRequest("The data you've sent seems to be wrong.");
    }

    switch (resumeType.toLowerCase()) {
      case 'docx':
        const docxBuffer = await getResumeDOCX(resumeName, resumeData);
        return res.response(docxBuffer).header('content-type', MIME_TYPES.docx);
      case 'pdf':
        const pdfBuffer = await getResumePDF(resumeName, resumeData);
        return res.response(pdfBuffer as ArrayBuffer).header('content-type', MIME_TYPES.pdf);
      default:
        return Boom.badRequest('The resume type must be either docx or pdf.');
    }
  } catch (err) {
    console.log(err);
    return Boom.badImplementation('Something went wrong building the resume.');
  }
};

export const saveResume = async (request: Request, res: ResponseToolkit) => {
  try {
    const resume = safelyParseJSON(request.payload as IResumeToSave);
    await Resume.create(resume);

    return res.response(resume);
  } catch (err) {
    console.log(err);
    return Boom.badImplementation('Something went wrong saving the resume.');
  }
};

export const getResumes = async (request: Request, res: ResponseToolkit) => {
  try {
    const resumes = await Resume.find();

    return res.response(resumes);
  } catch (err) {
    console.log(err);
    return Boom.badImplementation('Something went wrong fetching the resumes');
  }
};
