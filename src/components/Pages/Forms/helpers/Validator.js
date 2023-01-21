import * as Yup from 'yup'

export const signUpFormValidationSchema = Yup.object({
  email: Yup.string()
    .email('Некорректный формат почты')
    .required('Заполните почту'),
  group: Yup.string()
    .max(10, 'Поле должно содержать не более 10 символов')
    .required('Заполните поле'),
  password: Yup.string()
    .required('Пароль не указан')
    .min(5, 'Пароль слишком короткий - Поле должно содержать не менее 5 символов')
    .matches(/[a-zA-Z]/, 'Пароль может содержать только латинские буквы'),
})

export const signInFormValidationSchema = Yup.object({
  email: Yup.string()
    .email('Некорректный формат почты')
    .required('Заполните почту'),
  password: Yup.string()
    .required('Пароль не указан')
    .min(5, 'Пароль слишком короткий - Поле должно содержать не менее 5 символов')
    .matches(/[a-zA-Z]/, 'Пароль может содержать только латинские буквы'),
})
