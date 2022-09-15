import * as yup from 'yup'

const kbToMb = 1_048_576
const fileSizeInMb = (value: string) => Number((+value / kbToMb).toFixed(2))

export const registerFormSchema = yup.object().shape({
  firstName: yup.string().required('Please provide first name'),
  lastName: yup.string().required('Please provide last name'),
  email: yup
    .string()
    .required('Please provide email')
    .email('Email is not valid'),
  password: yup
    .string()
    .required('Please provide password')
    .min(8, 'Password should be 8 chars minimum.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  profilePicture: yup
    .mixed()
    .test(
      'fileSize',
      'File too large',
      (value: any) => value && fileSizeInMb(value[0]?.size) <= 1
    )
})
