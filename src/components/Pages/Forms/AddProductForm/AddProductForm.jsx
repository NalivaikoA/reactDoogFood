/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import classNames from 'classnames'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { addProductValidationSchema } from '../helpers/Validator'
import styles from './addProductForm.module.css'
import { dogFoodApi } from '../../../../api/DogFoodApi'
import { getIniteState } from '../../../../redux/initState'

const initialValues = {
  available: true, // boolean
  name: '', // string, обязательное
  price: 0, // number, обязательное
  pictures: '', // string
  discount: 0, // number
  stock: 0, // number
  wight: '', // string
  description: '', // string, обязательное
}

export function AddProductForm() {
  console.log('Рендерится компонент AddProductForm')
  const navigate = useNavigate()
  const { user: { token } } = getIniteState()

  const {
    mutateAsync, isLoading,
  } = useMutation({
    mutationFn: (values) => dogFoodApi.addProduct(values, token),
  })

  const submitHandler = async (values) => {
    console.log({ values })

    await mutateAsync(values)

    navigate('/products')
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={addProductValidationSchema}
      onSubmit={submitHandler}
    >
      <Form className={styles.form}>
        <label htmlFor="name">Название товара</label>
        <Field name="name" placeholder="Введите название товара" type="text" />
        <ErrorMessage component="p" className="error" name="name" />

        <label htmlFor="price">Цена, р</label>
        <Field name="price" placeholder="Цена" type="number" />
        <ErrorMessage component="p" className="error" name="price" />

        <label htmlFor="pictures">Фото товара</label>
        <Field name="pictures" placeholder="Ссылка на картинку товара.jpg" type="text" />
        <ErrorMessage component="p" className="error" name="pictures" />

        <label htmlFor="discount">Скидка, %</label>
        <Field name="discount" placeholder="Скидка на товар" type="number" />
        <ErrorMessage component="p" className="error" name="discount" />

        <label htmlFor="stock">Количество товара, шт</label>
        <Field name="stock" placeholder="Количество товара в наличии" type="number" />
        <ErrorMessage component="p" className="error" name="stock" />

        <label htmlFor="wight">Вес товара</label>
        <Field name="wight" placeholder="Введите вес товара: 100 гр" type="text" />
        <ErrorMessage component="p" className="error" name="wight" />

        <label htmlFor="description">Описание товара</label>
        <Field name="description" placeholder="Введите описание товара" type="text" />
        <ErrorMessage component="p" className="error" name="description" />

        <button
          disabled={isLoading}
          className={classNames(
            'btn',
            'btn-primary',
            styles.submitBtn,
          )}
          type="submit"
        >
          Добавить товар
        </button>
      </Form>
    </Formik>
  )
}
