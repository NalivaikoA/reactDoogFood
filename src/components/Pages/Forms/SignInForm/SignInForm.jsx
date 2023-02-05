/* eslint-disable jsx-a11y/label-has-associated-control */
import { useMutation } from '@tanstack/react-query'
import classNames from 'classnames'
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
// import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { dogFoodApi } from '../../../../api/DogFoodApi'
// import { ContextApp } from '../../../../contexts/ContextApp'
import { addToken } from '../../../../redux/slices/userSlice'
import { signInFormValidationSchema } from '../helpers/Validator'
import signInFormStyles from './signInForm.module.css'

const initialValues = {
  email: '',
  password: '',
}

export function SignInForm() {
  console.log('Рендерится компонент SignInForm')
  const dispatch = useDispatch()
  // const { TOKEN_LS_KEY } = useContext(ContextApp)
  const navigate = useNavigate()

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (values) => dogFoodApi.signIn(values)
      .then((result) => {
        dispatch(addToken(result.token))
        /* localStorage.setItem(TOKEN_LS_KEY, JSON.stringify(result.token)) */
      }),
  })

  const submitHandler = async (values) => {
    await mutateAsync(values)
    setTimeout(() => { navigate('/products') }, 0)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signInFormValidationSchema}
      onSubmit={submitHandler}
    >
      <Form className={signInFormStyles.form}>
        <label htmlFor="email">Электронный адрес</label>
        <Field name="email" placeholder="Email" type="email" />
        <ErrorMessage component="p" className="error" name="email" />

        <label htmlFor="password">Пароль</label>
        <Field name="password" placeholder="Пароль" type="password" />
        <ErrorMessage component="p" className="error" name="password" />

        <button
          disabled={isLoading}
          className={classNames(
            'btn',
            'btn-primary',
            signInFormStyles.submitBtn,
          )}
          type="submit"
        >
          Войти
        </button>
      </Form>
    </Formik>
  )
}

// export function SignInForm() {
//   console.log('Рендерится компонент SignInForm')
//   const { TOKEN_LS_KEY } = useContext(ContextApp)
//   const navigate = useNavigate()

//   const { mutateAsync, isLoading } = useMutation({
//     mutationFn: (values) => dogFoodApi.signIn(values)
//       .then((result) => {
//         localStorage.setItem(TOKEN_LS_KEY, JSON.stringify(result.token))
//       }),
//   })

//   const submitHandler = async (values) => {
//     await mutateAsync(values)
//     setTimeout(() => { navigate('/products') }, 0)
//   }

//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={signInFormValidationSchema}
//       onSubmit={submitHandler}
//     >
//       <Form className={signInFormStyles.form}>
//         <label htmlFor="email">Электронный адрес</label>
//         <Field name="email" placeholder="Email" type="email" />
//         <ErrorMessage component="p" className="error" name="email" />

//         <label htmlFor="password">Пароль</label>
//         <Field name="password" placeholder="Пароль" type="password" />
//         <ErrorMessage component="p" className="error" name="password" />

//         <button
//           disabled={isLoading}
//           className={classNames(
//             'btn',
//             'btn-primary',
//             signInFormStyles.submitBtn,
//           )}
//           type="submit"
//         >
//           Войти
//         </button>
//       </Form>
//     </Formik>
//   )
// }

// export function SignInForm() {
//   console.log('Рендерится компонент SignInForm')
//   // const { TOKEN_LS_KEY } = useContext(ContextApp)
//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   const { mutateAsync, isLoading } = useMutation({
//     mutationFn: (values) => dogFoodApi.signIn(values)
//       .then((result) => {
//         dispatch(addToken(result.token))
//       }),
//   })

//   const submitHandler = async (values) => {
//     await mutateAsync(values)
//     setTimeout(() => { navigate('/products') }, 0)
//   }

//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={signInFormValidationSchema}
//       onSubmit={submitHandler}
//     >
//       <Form className={signInFormStyles.form}>
//         <label htmlFor="email">Электронный адрес</label>
//         <Field name="email" placeholder="Email" type="email" />
//         <ErrorMessage component="p" className="error" name="email" />

//         <label htmlFor="password">Пароль</label>
//         <Field name="password" placeholder="Пароль" type="password" />
//         <ErrorMessage component="p" className="error" name="password" />

//         <button
//           disabled={isLoading}
//           className={classNames(
//             'btn',
//             'btn-primary',
//             signInFormStyles.submitBtn,
//           )}
//           type="submit"
//         >
//           Войти
//         </button>
//       </Form>
//     </Formik>
//   )
// }
