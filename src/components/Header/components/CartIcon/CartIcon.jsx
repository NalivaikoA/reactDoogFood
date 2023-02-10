import classNames from 'classnames'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ItemsInCart } from '../ItemsInCart/ItemsInCart'
import styles from './cartIcon.module.css'

export function Cart() {
  const navigate = useNavigate()

  const items = useSelector((state) => state.cart)

  const clickHandler = (e) => {
    e.preventDefault()
    navigate('/cart')
  }
  return (
    <div className={styles.cart}>
      <ItemsInCart quantity={items.length} />
      <Link onClick={clickHandler} to="/#">
        <i className={classNames(
          'bi bi-cart3',
          styles.icon,
        )}
        />
      </Link>
    </div>
  )
}
