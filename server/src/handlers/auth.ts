import bcrypt from 'bcrypt';
import Boom from '@hapi/boom';

import { createToken } from '../utils/jwt';
import { safelyParseJSON } from '../utils/json';
import { IUser } from '../interfaces/user';
import User from '../models/user';

export const signup = async (credentials: IUser) => {
  try {
    const { username, password } = safelyParseJSON(credentials);

    const saltRounds = 10;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    let user = null;
    try {
      user = await User.create({
        username,
        password: encryptedPassword
      });
    } catch (err) {
      return Boom.badRequest('A user with that username already exists.');
    }

    return {
      username: username,
      token: createToken(user)
    };
  } catch (err) {
    console.log(err);
    return Boom.badImplementation('Signup failed.');
  }
};

export const login = async (credentials: IUser) => {
  try {
    const { username, password } = safelyParseJSON(credentials);

    const user = await User.findOne({ username: username });

    if (!user) {
      return Boom.badRequest('That user does not exist.');
    }

    const isPasswordValid = bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return Boom.badRequest('Your password is wrong.');
    }

    return {
      username: username,
      token: createToken(user)
    };
  } catch (err) {
    console.log(err);
    return Boom.badImplementation('Login failed.');
  }
};
