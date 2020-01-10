import { Request, ResponseToolkit } from '@hapi/hapi';
import { signup, login } from '../handlers/auth';

const signupRoute = {
  method: 'POST',
  path: '/auth/signup',
  handler: (request: Request, h: ResponseToolkit) => signup(request.payload)
};

const loginRoute = {
  method: 'POST',
  path: '/auth/login',
  handler: (request: Request, h: ResponseToolkit) => login(request.payload)
};

export default [signupRoute, loginRoute];
