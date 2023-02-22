import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  addItemInCart,
  deleteItemFromCart,
} from '../../redux/slices/cartSlice'
import { addItemInFavourite, deleteItemFromFavourite } from '../../redux/slices/favouriteSlice'
import styles from './productsListItem.module.css'

export function ProductsListItem({
  id, name, price, wight, img,
}) {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.cart)
  const isItemInCart = items.some((item) => item.id === id)

  const itemsFavourite = useSelector((state) => state.favourite)
  const isItemInFavourite = itemsFavourite.some((item) => item.id === id)

  const clickHandler = (e) => {
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

  return (
    <div id={id} className={styles.card}>
      <div className={styles.image__body}>
        <img src={img} className={styles.card__image} alt="картинка" />
      </div>
      <div className={styles.card__body}>
        <Link onClick={clickFavouriteHandler} to="/#">
          <i
            className={classNames(
              { 'bi bi-heart-fill': isItemInFavourite, 'bi bi-heart': !isItemInFavourite },
              styles.icon,
            )}
          />
        </Link>
        <h6>
          {price}
          {' '}
          ₽
        </h6>
        <p>{wight}</p>
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
