import Boom from '@hapi/boom';
import Resume from '../models/resume';
import { Request, ResponseToolkit } from 'hapi';
import { getResumeDOCX, getResumePDF, sanitizeAndFormatFormData } from '../utils/resume';
import { safelyParseJSON } from '../utils/json';
import { IResumeData, IResumeToSave } from '../interfaces/resume';
import { IToken } from '../interfaces/user';
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
    const { _id } = request.auth.credentials as IToken;
    const resume = safelyParseJSON(request.payload as IResumeToSave);

    if (resume.meta.resumeName.length > 55) {
      return Boom.badRequest('Your resume name is too long. Try to shorten it to 55 characters.');
    }

    const savedResume = await Resume.create({
      ...resume,
      meta: {
        ...resume.meta,
        user_id: _id
      }
    });

    return res.response(savedResume);
  } catch (err) {
    console.log(err);
    return Boom.badImplementation('Something went wrong saving the resume.');
  }
};

export const getResumes = async (request: Request, res: ResponseToolkit) => {
  try {
    const { _id } = request.auth.credentials as IToken;

    const resumes = await Resume.find({ 'meta.user_id': _id });

    return res.response(resumes);
  } catch (err) {
    console.log(err);
    return Boom.badImplementation('Something went wrong fetching the resumes.');
  }
};

export const renameResume = async (request: Request, res: ResponseToolkit) => {
  try {
    const { _id } = request.auth.credentials as IToken;

    const newResumeName = JSON.parse(request.payload as string);

    if (newResumeName.length > 55) {
      return Boom.badRequest('Your new resume name is too long. Try to shorten it to 55 characters.');
    }

    const resume = await Resume.findById(request.params.id);
    const resumeId = resume.meta.user_id.toString();

    if (resumeId === _id) {
      await Resume.findByIdAndUpdate(request.params.id, { $set: { 'meta.resumeName': newResumeName } });
    } else {
      return Boom.unauthorized('You are not allowed to rename that resume.');
    }

    return res.response({
      message: 'Resume renamed.'
    });
  } catch (err) {
    console.log(err);
    return Boom.badImplementation('Something went wrong fetching the resumes.');
  }
};

export const deleteResume = async (request: Request, res: ResponseToolkit) => {
  try {
    const { _id } = request.auth.credentials as IToken;

    const resume = await Resume.findById(request.params.id);
    const resumeId = resume.meta.user_id.toString();

    if (resumeId === _id) {
      await Resume.findByIdAndDelete(request.params.id);
    } else {
      return Boom.unauthorized('You are not allowed to delete that resume.');
    }

    return res.response({
      message: 'Resume deleted.'
    });
  } catch (err) {
    console.log(err);
    return Boom.badImplementation('Something went wrong deleting the resume.');
  }
};
