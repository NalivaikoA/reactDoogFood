import styles from './itemsInCart.module.css'

export function ItemsInCart({
  quantity = 0,
}) {
  return quantity > 0 ? (
    <div className={styles.wr}>
      { quantity }
    </div>
  ) : null
}
