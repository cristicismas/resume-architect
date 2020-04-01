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
    template_name: string;
    isAutoSaved: boolean;
    draft_date: string;
  };
}
