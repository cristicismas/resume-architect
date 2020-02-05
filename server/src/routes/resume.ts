import { Request, ResponseToolkit } from '@hapi/hapi';
import { buildResume } from '../handlers/resume';

const buildResumeRoute = {
  method: 'POST',
  path: '/resume/build/{resumeType}/{resumeName}',
  handler: (request: Request, responseToolkit: ResponseToolkit) => buildResume(request, responseToolkit)
};

export default [buildResumeRoute];
