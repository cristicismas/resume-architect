import { ObjectId } from 'mongodb';
import mongoose, { Document } from 'mongoose';
import { IResumeToSave } from '../interfaces/resume';

interface IResume extends IResumeToSave, Document {}

const ResumeSchema = new mongoose.Schema({
  data: {
    name: { type: String, required: true, maxlength: 55 },
    address: { type: String },
    phoneNumber: { type: String },
    email: { type: String, required: true },
    about: { type: String, required: true },
    jobs: [
      {
        jobStartDate: { type: String },
        jobEndDate: { type: String },
        company: { type: String },
        job: { type: String },
        responsibilities: { type: String }
      }
    ],
    schools: [
      {
        schoolStartDate: { type: String },
        schoolEndDate: { type: String },
        degree: { type: String },
        school: { type: String }
      }
    ],
    extra: { type: String }
  },
  meta: {
    templateName: { type: String },
    isAutoSaved: { type: Boolean },
    draftDate: { type: String },
    resumeName: { type: String, required: true },
    user_id: { type: ObjectId, required: true }
  }
});

export default mongoose.model<IResume>('Resume', ResumeSchema);
