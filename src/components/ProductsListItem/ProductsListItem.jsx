import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {
  addItemInCart,
  deleteItemFromCart,
} from '../../redux/slices/cartSlice'
import {
  addItemInFavourite,
  deleteItemFromFavourite,
} from '../../redux/slices/favouriteSlice'
import styles from './productsListItem.module.css'

export function ProductsListItem({
  id,
  name,
  price,
  wight,
  img,
  discount,
  reviews,
}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const items = useSelector((state) => state.cart)
  const isItemInCart = items.some((item) => item.id === id)

  const itemsFavourite = useSelector((state) => state.favourite)
  const isItemInFavourite = itemsFavourite.some((item) => item.id === id)

  const clickHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (isItemInCart) {
      dispatch(deleteItemFromCart(id))
    } else {
      dispatch(addItemInCart(id))
    }
  }

  const clickFavouriteHandler = (e) => {
    e.stopPropagation()
    e.preventDefault()
    if (isItemInFavourite) {
      dispatch(deleteItemFromFavourite(id))
    } else {
      dispatch(addItemInFavourite(id))
    }
  }

  const clickDetailPage = () => {
    navigate(`/products/${id}`)
  }

  const rating = reviews.length
    ? (reviews.reduce((accum, item) => accum + item.rating, 0) / reviews.length).toFixed(1)
    : 0

  const priceDiscount = Math.round(price * (1 - (discount / 100)))

  return (
    <div onClick={clickDetailPage} id={id} className={styles.card}>
      {discount ? (
        <div className={styles.discount}>
          <p>
            -
            {discount}
            %
          </p>
        </div>
      ) : null}
      <div className={styles.image__body}>
        <img src={img} className={styles.card__image} alt="картинка" />
      </div>
      <div className={styles.card__body}>
        {reviews.length ? (
          <div className={styles.rating}>
            <i className={classNames('bi bi-star-fill', styles.gradient)} />
            <p className={styles.gradient}>{rating}</p>
          </div>
        ) : null}
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

        {!discount ? (
          <div className={styles.priceWr}>
            {' '}
            <h6>
              {price}
              {' '}
              ₽
            </h6>
          </div>
        ) : (
          <div className={styles.priceDiscountWr}>
            <h6>
              {priceDiscount}
              {' '}
              ₽
            </h6>
            <div>
              <p>
                {price}
                {' '}
                ₽
              </p>
            </div>
          </div>
        )}

        <div className={styles.wightWr}><p>{wight}</p></div>
        <p>{name}</p>
      </div>
      <div className={styles.button__body}>

        <button
          onClick={clickHandler}
          type="button"
          className={isItemInCart ? 'btn btn-danger' : 'btn btn-warning'}
        >
          {isItemInCart ? 'Удалить из корзины' : 'В корзину'}
        </button>
      </div>
    </div>
  )
}
