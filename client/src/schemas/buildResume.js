import * as Yup from 'yup';

export const buildResumeSchema = Yup.object().shape({
  name: Yup.string().required('Please add your name.'),
  address: Yup.string(),
  phoneNumber: Yup.string(),
  email: Yup.string()
    .email('The email format is not valid. Are you sure you entered your email correctly?')
    .required('Please add your email.'),
  about: Yup.string().required('Please complete this field.'),
  company: Yup.string(),
  job: Yup.string(),
  jobStartDate: Yup.date(),
  jobEndDate: Yup.date(),
  responsibilities: Yup.string(),
  school: Yup.string(),
  degree: Yup.string(),
  schoolStartDate: Yup.date(),
  shoolEndDate: Yup.date(),
  extra: Yup.string()
});
