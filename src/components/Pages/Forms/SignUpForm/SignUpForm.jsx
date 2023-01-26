/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import classNames from 'classnames'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { signUpFormValidationSchema } from '../helpers/Validator'
import signUpFormStyles from './signUpForm.module.css'
import { dogFoodApi } from '../../../../api/DogFoodApi'

const initialValues = {
  email: '',
  group: '',
  password: '',
}

export function SignUpForm() {
  console.log('Рендерится компонент SignUpForm')
  const navigate = useNavigate()

  const {
    mutateAsync, isLoading,
  } = useMutation({
    mutationFn: (values) => dogFoodApi.signUp(values),
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
        <Field name="email" placeholder="Email" type="email" />
        <ErrorMessage component="p" className="error" name="email" />

        <label htmlFor="group">Номер группы</label>
        <Field name="group" placeholder="sm9" type="text" />
        <ErrorMessage component="p" className="error" name="group" />

        <label htmlFor="password">Пароль</label>
        <Field name="password" placeholder="Пароль" type="password" />
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
