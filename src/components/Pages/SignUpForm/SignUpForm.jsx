/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import classNames from 'classnames'
import { signUpFormValidationSchema } from './ValidatorSignUp'
import signUpFormStyles from './signUpForm.module.css'

const initialValues = {
  email: '',
  group: '',
  password: '',
}

const submitHandler = (values) => {
  console.log({ values })
}

export function SignUpForm() {
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
