import { Request, ResponseToolkit } from 'hapi';
import { buildResume, saveResume, getResumes, renameResume, deleteResume } from '../handlers/resume';

const buildResumeRoute = {
  method: 'POST',
  path: '/resume/build/{resumeType}/{resumeName}',
  handler: (request: Request, responseToolkit: ResponseToolkit) => buildResume(request, responseToolkit),
};

const saveResumeRoute = {
  method: 'POST',
  path: '/resume/save',
  config: {
    auth: 'jwt'
  },
  handler: (request: Request, responseToolkit: ResponseToolkit) => saveResume(request, responseToolkit),
};

const getResumesRoute = {
  method: 'GET',
  path: '/resumes',
  config: {
    auth: 'jwt'
  },
  handler: (request: Request, responseToolkit: ResponseToolkit) => getResumes(request, responseToolkit),
};

const renameResumeRoute = {
  method: 'PATCH',
  path: '/resume/{id}/rename',
  config: {
    auth: 'jwt'
  },
  handler: (request: Request, responseToolkit: ResponseToolkit) => renameResume(request, responseToolkit),
};

const deleteResumeRoute = {
  method: 'DELETE',
  path: '/resume/{id}',
  config: {
    auth: 'jwt'
  },
  handler: (request: Request, responseToolkit: ResponseToolkit) => deleteResume(request, responseToolkit),
};

export default [buildResumeRoute, saveResumeRoute, getResumesRoute, renameResumeRoute, deleteResumeRoute];
