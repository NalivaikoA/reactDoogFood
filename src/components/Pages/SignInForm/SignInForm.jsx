/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames'
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import { signUpFormValidationSchema } from '../SignUpForm/ValidatorSignUp'
import signInFormStyles from './signInForm.module.css'

const initialValues = {
  email: '',
  password: '',
}

const submitHandler = (values) => {
  console.log({ values })
}

export function SignInForm() {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signUpFormValidationSchema}
      onSubmit={submitHandler}
    >
      <Form className={signInFormStyles.form}>
        <label htmlFor="email">Электронный адрес</label>
        <Field name="email" placeholder="email here" type="email" />
        <ErrorMessage component="p" className="error" name="email" />

        <label htmlFor="password">Пароль</label>
        <Field name="password" placeholder="password here" type="password" />
        <ErrorMessage component="p" className="error" name="password" />

        <button
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
