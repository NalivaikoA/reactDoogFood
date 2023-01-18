import * as Yup from 'yup'

export const signUpFormValidationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  group: Yup.string()
    .max(10, 'Must be 10 characters or less')
    .required('Required'),
  password: Yup.string()
    .required('No password provided.')
    .min(5, 'Password is too short - should be 5 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
})
