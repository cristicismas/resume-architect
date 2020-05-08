import { Request, ResponseToolkit } from 'hapi';
import { signup, login, deleteAccount } from '../handlers/auth';
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

const deleteAccountRoute = {
  method: 'DELETE',
  path: '/user/delete',
  config: {
    auth: 'jwt'
  },
  handler: (request: Request, h: ResponseToolkit) => deleteAccount(request, h)
}

const checkTokenRoute = {
  method: 'POST',
  config: {
    auth: 'jwt'
  },
  path: '/auth/check',
  handler: (request: Request) => {
    // If the handle runs, it means it passed jwt validation so the token is valid.
    return request.auth.credentials;
  }
};

export default [signupRoute, loginRoute, deleteAccountRoute, checkTokenRoute];
