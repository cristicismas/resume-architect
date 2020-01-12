import * as jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/user';

export const createToken = (user: IUser) => {
  const { _id, username } = user;

  return jwt.sign(
    {
      _id,
      username
    },
    process.env.SECRET_KEY
  );
};
