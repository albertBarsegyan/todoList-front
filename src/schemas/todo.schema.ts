import * as yup from 'yup';

export const todoSchema = yup.object().shape({
  text: yup.string().required('Please provide todo'),
  username: yup.string().required('Please provide username'),
  email: yup
    .string()
    .required('Please provide email')
    .email('Email is not valid'),
});
