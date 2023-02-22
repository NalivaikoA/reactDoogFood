import classNames from 'classnames'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ItemsInCart } from '../ItemsInCart/ItemsInCart'
import styles from './favouriteIcon.module.css'

export function FavouriteIcon() {
  const navigate = useNavigate()

  const items = useSelector((state) => state.favourite)

  const clickHandler = (e) => {
    e.preventDefault()
    navigate('/favourite')
  }
  return (
    <div className={styles.cart}>
      <ItemsInCart quantity={items.length} />
      <Link onClick={clickHandler} to="/#">
        <i className={classNames(
          'bi bi-heart',
          styles.icon,
        )}
        />
      </Link>
    </div>
  )
}
