/* eslint-disable jsx-a11y/label-has-associated-control */
import { useMutation } from '@tanstack/react-query'
import classNames from 'classnames'
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ContextApp } from '../../../../contexts/ContextApp'
import { signInFormValidationSchema } from '../helpers/Validator'
import signInFormStyles from './signInForm.module.css'

const initialValues = {
  email: '',
  password: '',
}

export function SignInForm() {
  const { SIGNUP_DATA_LS_KEY } = useContext(ContextApp)
  const navigate = useNavigate()

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (data) => fetch('https://api.react-learning.ru/signin', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => res.json()).then((result) => {
      localStorage.setItem(SIGNUP_DATA_LS_KEY, JSON.stringify(result.token))
      console.log(result)
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
