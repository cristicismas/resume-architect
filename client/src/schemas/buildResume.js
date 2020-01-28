import * as Yup from 'yup';

const jobsSchema = Yup.object().shape({
  company: Yup.string(),
  job: Yup.string(),
  jobStartDate: Yup.date().nullable(),
  jobEndDate: Yup.date().nullable(),
  responsibilities: Yup.string()
});

const schoolsSchema = Yup.object().shape({
  school: Yup.string(),
  degree: Yup.string(),
  schoolStartDate: Yup.date().nullable(),
  schoolEndDate: Yup.date().nullable()
});

export const buildResumeSchema = Yup.object().shape({
  name: Yup.string().required('Please add your name.'),
  address: Yup.string(),
  phoneNumber: Yup.string(),
  email: Yup.string()
    .email('The email format is not valid. Are you sure you entered your email correctly?')
    .required('Please add your email.'),
  about: Yup.string().required('Please complete this field.'),
  jobs: Yup.array().of(jobsSchema),
  schools: Yup.array().of(schoolsSchema),
  extra: Yup.string()
});
