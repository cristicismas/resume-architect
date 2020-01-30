import * as fs from 'fs-extra';
import * as path from 'path';
import * as cloudinary from 'cloudinary';
import * as Boom from '@hapi/boom';
import { Request, ResponseToolkit } from 'hapi';
import { CloudinaryResource } from '../interfaces/cloudinary';
import { writeTemplateLocally, populateTemplate } from '../utils/templates';
import CONSTANTS from '../constants';

export const buildResume = async (request: Request, responseToolkit: ResponseToolkit) => {
  try {
    const resumeData = JSON.parse(request.payload.toString());
    const { resumeName } = request.params;

    const resumes = await cloudinary.v2.api.resources({
      resource_type: 'raw',
      type: 'upload',
      prefix: 'resume_architect/resumes'
    });

    const remoteResumePath = `resume_architect/resumes/${resumeName.slice(0, -4)}.docx`;
    const foundResume = resumes.resources.find((resume: CloudinaryResource) => resume.public_id === remoteResumePath);

    const localResumePath = `temp/${resumeName.slice(0, -4)}.docx`;
    if (!fs.existsSync(localResumePath)) await writeTemplateLocally(foundResume, localResumePath);

    const populatedResume = await populateTemplate(localResumePath, resumeData);
    await fs.unlink(path.join(CONSTANTS.rootDir, localResumePath));

    return responseToolkit
      .response(populatedResume)
      .type('application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  } catch (err) {
    console.log(err);
    return Boom.badImplementation('Something went wrong building the resume.');
  }
};
