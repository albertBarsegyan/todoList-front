import * as yup from 'yup'

export const loginFormSchema = yup.object().shape({
  email: yup
    .string()
    .required('Please provide email')
    .email('Email is not valid'),
  password: yup
    .string()
    .required('Please provide password')
    .min(8, 'Password is too short - should be 8 chars minimum.')
})
