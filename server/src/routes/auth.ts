import { Request, ResponseToolkit } from 'hapi';
import { signup, login } from '../handlers/auth';
import { IUser } from '../interfaces/user';

const signupRoute = {
  method: 'POST',
  path: '/auth/signup',
  handler: (request: Request, h: ResponseToolkit) => signup(request.payload as IUser)
};

const loginRoute = {
  method: 'POST',
  path: '/auth/login',
  handler: (request: Request, h: ResponseToolkit) => login(request.payload as IUser)
};

export default [signupRoute, loginRoute];
