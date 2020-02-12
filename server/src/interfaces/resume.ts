interface IJob {
  jobStartDate: string;
  jobEndDate: string;
  company: string;
  job: string;
  responsibilities: string;
}

interface ISchool {
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
