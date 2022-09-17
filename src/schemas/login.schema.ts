import * as yup from 'yup';

export const loginFormSchema = yup.object().shape({
  username: yup
    .string()
    .required('Please provide username')
    .min(5),
  password: yup.string().required('Please provide password'),
});
