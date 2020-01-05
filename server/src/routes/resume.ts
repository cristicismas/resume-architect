import { Request } from '@hapi/hapi';
import { buildResume } from '../handlers/resume';

const buildResumeRoute = {
  method: 'POST',
  path: '/resume',
  handler: (request: Request) => buildResume(request.payload)
};

export default [buildResumeRoute];
