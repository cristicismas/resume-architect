import Boom from '@hapi/boom';
import { Request, ResponseToolkit } from 'hapi';
import { getResumeDOCX, getResumePDF, sanitizeAndFormatFormData } from '../utils/resume';
import CONSTANTS from '../constants';

export const buildResume = async (request: Request, res: ResponseToolkit) => {
  try {
    const { resumeType, resumeName } = request.params;
    let resumeData = request.payload;

    if (typeof request.payload === 'string') {
      resumeData = sanitizeAndFormatFormData(JSON.parse(request.payload));
    }

    switch (resumeType.toLowerCase()) {
      case 'docx':
        const docxBuffer = await getResumeDOCX(resumeName, resumeData);
        return res.response(docxBuffer).header('content-type', CONSTANTS.mimeTypes.docx);
      case 'pdf':
        const pdfBuffer = await getResumePDF(resumeName, resumeData);
        return res.response(pdfBuffer).header('content-type', CONSTANTS.mimeTypes.pdf);
      default:
        return Boom.badRequest('The resume type must be either docx or pdf.');
    }
  } catch (err) {
    console.log(err);
    return Boom.badImplementation('Something went wrong building the resume.');
  }
};
