import { useMutation } from '@tanstack/react-query'
import classNames from 'classnames'
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import { useNavigate } from 'react-router-dom'
import { dogFoodApi } from '../../../../../api/DogFoodApi'
import { Loader } from '../../../../Loader/Loader'
import { addProductValidationSchema } from '../../../Forms/helpers/Validator'
import styles from './modalEditInner.module.css'

export function ModalEditInner({
  data, productId, token, closeEditModalHandler,
}) {
  const navigate = useNavigate()

  const initialValues = {
    available: true, // boolean
    name: data.name, // string, обязательное
    price: data.price, // number, обязательное
    pictures: data.pictures, // string
    discount: data.discount, // number
    stock: data.stock, // number
    wight: data.wight, // string
    description: data.description, // string, обязательное
  }

  const {
    mutateAsync, isLoading, isError, error,
  } = useMutation({
    mutationFn: (values) => dogFoodApi.editProduct(productId, values, token),
  })

  if (isLoading) return <Loader />
  if (isError) return <p>{`${error} `}</p>

  const editItemHandler = async (values) => {
    await mutateAsync(values)
    closeEditModalHandler()
    navigate(`/products/${productId}`)
  }

  return (
    <>
      <div className={styles.titleInModal}>
        <p>Редактировать данные о товаре</p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={addProductValidationSchema}
        onSubmit={editItemHandler}
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
                // disabled={isLoadingRev}
            className={classNames('btn', 'btn-primary', styles.submitBtn)}
            type="submit"
          >
            Редактировать
          </button>
        </Form>
      </Formik>
    </>
  )
}
