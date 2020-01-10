import * as bcrypt from 'bcrypt';

import { createToken } from '../util/jwt';
import { IUser } from '../interfaces/user';
import User from '../models/user';

export const signup = async (credentials: IUser) => {
  try {
    const { username, password } = credentials;

    const saltRounds = 10;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      username,
      password: encryptedPassword
    });

    return {
      username: username,
      token: createToken(user)
    };
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const login = async (credentials: IUser) => {
  try {
    const { username, password } = credentials;

    const user = await User.findOne({ username: username });

    if (!user) {
      throw Error('Cannot find user with that username');
    }

    const isPasswordValid = bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw Error('Your password is wrong.');
    }

    return {
      username: username,
      token: createToken(user)
    };
  } catch (err) {
    return err;
  }
};
