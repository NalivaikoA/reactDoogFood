import { useDispatch } from 'react-redux'
import { deleteItemFromCart } from '../../redux/slices/cartSlice'
import styles from './cartListItem.module.css'

export function CartListItem({
  id, name, price, wight, img,
}) {
  const dispatch = useDispatch()

  const clickHandler = () => {
    dispatch(deleteItemFromCart(id))
  }

  return (
    <div id={id} className={styles.card}>
      <div className={styles.image__body}>
        <img src={img} className={styles.card__image} alt="картинка" />
      </div>
      <div className={styles.card__body}>
        <h6>
          {price}
          {' '}
          ₽
        </h6>
        <p>{wight}</p>
        <p>{name}</p>
      </div>
      <div className={styles.button__body}>
        <button onClick={clickHandler} type="button" className="btn btn-warning">Удалить</button>
      </div>
    </div>
  )
}
