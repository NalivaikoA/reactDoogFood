import classNames from 'classnames'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import styles from './cartIcon.module.css'

export function Cart() {
  const navigate = useNavigate()

  const items = useSelector((state) => state.cart)
  const total = items.reduce(
    (previousValue, currentItem) => previousValue + currentItem.count,
    0,
  )

  const clickHandler = (e) => {
    e.preventDefault()
    navigate('/cart')
  }
  return (
    <div className={styles.cart}>
      <Link onClick={clickHandler} to="/#">
        <i className={classNames(
          'bi bi-cart3',
          styles.icon,
        )}
        />
      </Link>
      <span className={styles.total_price}>{total}</span>
    </div>
  )
}
