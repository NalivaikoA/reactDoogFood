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

export const addProductValidationSchema = Yup.object({
  name: Yup.string()
    .max(80, 'Поле должно содержать не более 80 символов')
    .required('Заполните поле'),
  price: Yup.number()
    .required('Заполните поле'),
  pictures: Yup.string()
    .required('ПЗаполните поле'),
  discount: Yup.number()
    .required('Заполните поле'),
  stock: Yup.number()
    .required('Заполните поле'),
  wight: Yup.string()
    .max(8, 'Поле должно содержать не более 8 символов')
    .required('Заполните поле'),
  description: Yup.string()
    .max(400, 'Поле должно содержать не более 400 символов')
    .required('Заполните поле'),
})

export const addReviewValidationSchema = Yup.object({
  text: Yup.string()
    .max(400, 'Поле должно содержать не более 400 символов')
    .required('Заполните поле'),
  rating: Yup.number()
    .required('Заполните поле')
    .integer()
    .max(5)
    .min(1),
})
