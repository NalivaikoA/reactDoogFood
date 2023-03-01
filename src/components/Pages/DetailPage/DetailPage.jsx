import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import { dogFoodApi } from '../../../api/DogFoodApi'
import { getIniteState } from '../../../redux/initState'
import {
  addItemInCart,
  deleteItemFromCart,
} from '../../../redux/slices/cartSlice'
import {
  addItemInFavourite,
  deleteItemFromFavourite,
} from '../../../redux/slices/favouriteSlice'
import { Loader } from '../../Loader/Loader'
import { DetailPageReviews } from './components/DetailPageReviews/DetailPageReviews'
import { Modal } from '../../Modal/Modal'
import styles from './detailPage.module.css'
import { addReviewValidationSchema } from '../Forms/helpers/Validator'
import { ModalDeleteInner } from './components/ModalDeleteInner/ModalDeleteInner'
import { ModalEditInner } from './components/ModalEditInner/ModalEditInner'

const initialValuesReview = {
  text: '', // string, обязательное
  rating: 0, // number, обязательное
}

export function DetailPage() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    user: { token },
  } = getIniteState()

  const {
    user: { userId },
  } = getIniteState()

  const itemsCart = useSelector((state) => state.cart)
  const isItemInCart = itemsCart.some((item) => item.id === productId)

  const itemsFavourite = useSelector((state) => state.favourite)
  const isItemInFavourite = itemsFavourite.some(
    (item) => item.id === productId,
  )

  const [isAddReviewModalOpen, setIsAddReviewModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const { mutateAsync } = useMutation({
    mutationFn: (values) => dogFoodApi.addReview(values, productId, token),
  })

  const closeAddReviewModalHandler = () => {
    setIsAddReviewModalOpen(false)
  }

  const openAddReviewModalHandler = (e) => {
    e.preventDefault()
    setIsAddReviewModalOpen(true)
  }

  const closeDeleteModalHandler = () => {
    setIsDeleteModalOpen(false)
  }

  const openDeleteModalHandler = (e) => {
    e.preventDefault()
    setIsDeleteModalOpen(true)
  }

  const closeEditModalHandler = () => {
    setIsEditModalOpen(false)
  }

  const openEditModalHandler = (e) => {
    e.preventDefault()
    setIsEditModalOpen(true)
  }

  const getQueryDetailPageKey = (id) => ['detailPage', id]

  useEffect(() => {
    if (!token) {
      navigate('/signin')
    }
  }, [token])

  const queryClient = useQueryClient()
  queryClient.invalidateQueries(getQueryDetailPageKey(productId))

  const {
    data, isLoading, isError, error, refetch,
  } = useQuery({
    queryKey: getQueryDetailPageKey(productId),
    queryFn: () => fetch(`https://api.react-learning.ru/products/${productId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json()),
    enabled: !!token,
  })

  console.log(error, refetch)

  if (isLoading) return <Loader />
  if (isError) return <h1>Error happend</h1>

  const clickHandler = (e) => {
    e.stopPropagation()
    if (isItemInCart) {
      dispatch(deleteItemFromCart(productId))
    } else {
      dispatch(addItemInCart(productId))
    }
  }

  const clickFavouriteHandler = (e) => {
    e.stopPropagation()
    e.preventDefault()
    if (isItemInFavourite) {
      dispatch(deleteItemFromFavourite(productId))
    } else {
      dispatch(addItemInFavourite(productId))
    }
  }

  const priceDiscount = Math.round(data.price * (1 - data.discount / 100))

  const rating = data.reviews.length
    ? (
      data.reviews.reduce((accum, item) => accum + item.rating, 0)
        / data.reviews.length
    ).toFixed(1)
    : 0

  const submitHandler = async (values) => {
    console.log({ values })

    await mutateAsync(values)
    closeAddReviewModalHandler()
  }

  return (
    <div className={styles.wr}>
      <div className={styles.card}>
        {data.discount ? (
          <div className={styles.discount}>
            <p>
              -
              {data.discount}
              %
            </p>
          </div>
        ) : null}
        {data.reviews.length ? (
          <div className={styles.rating}>
            <i className={classNames('bi bi-star-fill', styles.gradient)} />
            <p className={styles.gradient}>{rating}</p>
          </div>
        ) : null}
        <div className={styles.card_body}>
          <div className={styles.image__body}>
            <img
              src={data.pictures}
              className={styles.card__image}
              alt="картинка"
            />
          </div>
          <div className={styles.description}>
            <p>{data.name}</p>
            <p>{data.wight}</p>
            <p>{data.description}</p>
          </div>
          <div className={styles.stock}>
            <div>
              <p>
                В наличии:
                {' '}
                {data.stock}
              </p>
              <div className={styles.buttonBuy}>
                <button
                  onClick={clickHandler}
                  type="button"
                  className={
                    isItemInCart
                      ? 'btn btn-danger btn-sm m-0 p-0'
                      : 'btn btn-primary btn-sm'
                  }
                >
                  {isItemInCart ? 'Удалить из корзины' : 'В корзину'}
                </button>
              </div>
            </div>
            {userId === data?.author._id ? (
              <div className={styles.linkWr}>
                {' '}
                <Link
                  className={styles.link}
                  onClick={openDeleteModalHandler}
                  to="/#"
                >
                  <i className="bi bi-trash3" />
                </Link>
                <Link
                  className={styles.link}
                  onClick={openEditModalHandler}
                  to="/#"
                >
                  <i className="bi bi-pencil-square" />
                </Link>
              </div>
            ) : null}
          </div>
          <div className={styles.rightBlock}>
            {!data.discount ? (
              <p>
                {data.price}
                {' '}
                ₽
              </p>
            ) : (
              <div>
                <p
                  style={{
                    color: 'red',
                    fontSize: '14px',
                    margin: 0,
                    fontFamily: 'PT Sans,Helvetica,Arial,sans-serif',
                    fontWeight: 700,
                  }}
                >
                  {priceDiscount}
                  {' '}
                  ₽
                </p>
                <p style={{ fontSize: '12px', textDecoration: 'line-through' }}>
                  {data.price}
                  {' '}
                  ₽
                </p>
              </div>
            )}
            <div className={styles.favouriteLink}>
              <Link onClick={clickFavouriteHandler} to="/#">
                <i
                  className={classNames(
                    {
                      'bi bi-heart-fill': isItemInFavourite,
                      'bi bi-heart': !isItemInFavourite,
                    },
                    styles.icon,
                  )}
                />
              </Link>
            </div>
          </div>
        </div>

        <Modal
          isOpen={isAddReviewModalOpen}
          closeHandler={closeAddReviewModalHandler}
        >
          <div className={styles.titleInModal}>
            <p>Добавить отзыв</p>
          </div>
          <Formik
            initialValues={initialValuesReview}
            validationSchema={addReviewValidationSchema}
            onSubmit={submitHandler}
          >
            <Form className={styles.form}>
              <label htmlFor="text">Текст</label>
              <Field name="text" placeholder="Введите текст" type="text" />
              <ErrorMessage component="p" className="error" name="text" />

              <label htmlFor="rating">Рейтинг</label>
              <Field
                name="rating"
                placeholder="Введите число от 1 до 5"
                type="number"
              />
              <ErrorMessage component="p" className="error" name="rating" />

              <button
                // disabled={isLoadingRev}
                className={classNames('btn', 'btn-primary', styles.submitBtn)}
                type="submit"
              >
                Опубликовать
              </button>
            </Form>
          </Formik>
        </Modal>

        <Modal
          isOpen={isDeleteModalOpen}
          closeHandler={closeDeleteModalHandler}
        >
          <ModalDeleteInner
            data={data}
            closeDeleteModalHandler={closeDeleteModalHandler}
            token={token}
            productId={productId}
          />
        </Modal>

        <Modal isOpen={isEditModalOpen} closeHandler={closeEditModalHandler}>
          <ModalEditInner
            data={data}
            closeEditModalHandler={closeEditModalHandler}
            token={token}
            productId={productId}
          />
        </Modal>
      </div>
      <div className={styles.addReview}>
        <div>
          <button
            onClick={openAddReviewModalHandler}
            type="button"
            className="btn btn-primary btn-sm"
          >
            Добавить отзыв
          </button>
        </div>
      </div>
      {data.reviews.length ? (
        <div className={styles.reviewsTitle}>
          <p>
            Отзывы о
            {' '}
            {data.name}
          </p>
        </div>
      ) : (
        <div className={styles.reviewsTitle}>
          <p>на данный момент отзывов нет</p>
        </div>
      )}
      {data.reviews.length ? (
        <div className={styles.cardReviews}>
          {data.reviews.map((review) => (
            <DetailPageReviews
              key={review._id}
              dataReview={review}
              userId={userId}
              productId={productId}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
