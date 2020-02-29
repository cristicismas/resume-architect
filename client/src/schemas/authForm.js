import * as Yup from 'yup';

export const authFormSchema = Yup.object().shape({
  username: Yup.string()
    .required('Please add your username / email.'),
  password: Yup.string()
    .min(5, 'Your password must be at least 5 characters long.')
    .required('Please add your password.')
});
