import { Server, Request, ResponseToolkit } from '@hapi/hapi';

import { IUser } from '../interfaces/user';
import User from '../models/user';

const validate = async (decoded: IUser, request: Request, h: ResponseToolkit) => {
  let isValid = true;

  const { _id } = decoded;

  const user = await User.findOne({ _id });

  if (!user) {
    isValid = false;
  }

  return { isValid };
};

export const configureJWT = async (server: Server) => {
  await server.register(require('hapi-auth-jwt2'));

  server.auth.strategy('jwt', 'jwt', {
    key: process.env.SECRET_KEY,
    validate
  });
};
