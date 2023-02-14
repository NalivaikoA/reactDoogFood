import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
// import { deleteItemFromCart } from '../../redux/slices/cartSlice'
import { changeItemIsChacked, deleteItemFromCart }
  from '../../redux/slices/cartSlice'
import { Counter } from '../Counter/Counter'
import styles from './cartListItem.module.css'

export function CartListItem({
  id, name, price, img, stock, description, count, isChecked,
}) {
  const dispatch = useDispatch()

  // eslint-disable-next-line no-shadow
  const deleteItemHandler = (e) => {
    e.preventDefault()
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
            checked={isChecked}
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
            <div>
              <p>
                В наличии:
                {' '}
                {stock}
              </p>
              <Counter id={id} stock={stock} count={count} />
            </div>
            <Link className={styles.link} onClick={deleteItemHandler} to="/#">Удалить</Link>
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
