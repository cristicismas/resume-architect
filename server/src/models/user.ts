import mongoose from 'mongoose';
import { IUser } from '../interfaces/user';

const userModel = new mongoose.Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true }
});

export default mongoose.model<IUser>('User', userModel);
