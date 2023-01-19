/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import classNames from 'classnames'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { signUpFormValidationSchema } from './ValidatorSignUp'
import signUpFormStyles from './signUpForm.module.css'

const initialValues = {
  email: '',
  group: '',
  password: '',
}

export function SignUpForm() {
  const navigate = useNavigate()

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (data) => fetch('https://api.react-learning.ru/signup', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => res.json()).then((res) => console.log(res)),
  })

  const submitHandler = async (values) => {
    console.log({ values })

    await mutateAsync(values)

    navigate('/signin')
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signUpFormValidationSchema}
      onSubmit={submitHandler}
    >
      <Form className={signUpFormStyles.form}>
        <label htmlFor="email">Электронный адрес</label>
        <Field name="email" placeholder="email here" type="email" />
        <ErrorMessage component="p" className="error" name="email" />

        <label htmlFor="group">Номер группы</label>
        <Field name="group" placeholder="sm9" type="text" />
        <ErrorMessage component="p" className="error" name="group" />

        <label htmlFor="password">Пароль</label>
        <Field name="password" placeholder="password here" type="password" />
        <ErrorMessage component="p" className="error" name="password" />

        <button
          disabled={isLoading}
          className={classNames(
            'btn',
            'btn-primary',
            signUpFormStyles.submitBtn,
          )}
          type="submit"
        >
          Регистрация
        </button>
      </Form>
    </Formik>
  )
}
