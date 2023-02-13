import { useDispatch, useSelector } from 'react-redux'
// import { deleteItemFromCart } from '../../redux/slices/cartSlice'
import { changeItemIsChacked, deleteItemFromCart, getCartSelector }
  from '../../redux/slices/cartSlice'
import { Counter } from '../Counter/Counter'
import styles from './cartListItem.module.css'

export function CartListItem({
  id, name, price, img, stock, description,
}) {
  console.log(id)
  const dispatch = useDispatch()

  const cart = useSelector(getCartSelector)

  // eslint-disable-next-line no-shadow
  const getCartItemById = (id) => cart.find((item) => item.id === id)

  const deleteItemHandler = () => {
    dispatch(deleteItemFromCart(id))
  }

  const changeStatusHandler = () => {
    dispatch(changeItemIsChacked(id))
  }

  return (
    (
      <div id={id} className={styles.card}>
        <div className={styles.card_name}>
          <input
            type="checkbox"
            checked={getCartItemById(id).isChecked}
            onChange={changeStatusHandler}
          />
          <p>{name}</p>
        </div>
        <div className={styles.card_body}>
          <div className={styles.image__body}>
            <img src={img} className={styles.card__image} alt="картинка" />
          </div>
          <div className={styles.description}>
            <p>{description}</p>
          </div>
          <div className={styles.stock}>
            <p>
              В наличии:
              {' '}
              {stock}
            </p>
            <Counter id={id} stock={stock} count={getCartItemById(id).count} />
            <button onClick={deleteItemHandler} type="button">Удалить</button>
          </div>
          <p>
            {price}
            {' '}
            ₽
          </p>
        </div>
      </div>
    )

  )
}
