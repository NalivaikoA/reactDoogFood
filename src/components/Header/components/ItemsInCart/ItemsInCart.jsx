import { getIniteState } from '../../../../redux/initState'
import styles from './itemsInCart.module.css'

export function ItemsInCart({
  quantity = 0,
}) {
  const {
    user: { token },
  } = getIniteState()

  return token && quantity > 0 ? (
    <div className={styles.wr}>
      { quantity }
    </div>
  ) : null
}
