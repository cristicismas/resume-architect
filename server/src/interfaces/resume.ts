export interface IJob {
  jobStartDate: string;
  jobEndDate: string;
  company: string;
  job: string;
  responsibilities: string;
}

export interface ISchool {
  schoolStartDate: string;
  schoolEndDate: string;
  degree: string;
  school: string;
}

export interface IResumeData {
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  about: string;
  jobs?: IJob[];
  schools?: ISchool[];
  extra: string;
}

export interface IResumeToSave {
  data: IResumeData;
  meta: {
    templateName: string;
    isAutoSaved: boolean;
    draftDate: string;
    resumeName: string;
    user_id: string;
  };
}
