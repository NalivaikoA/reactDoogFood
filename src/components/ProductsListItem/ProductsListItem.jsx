import styles from './productsListItem.module.css'

export function ProductsListItem({
  id, name, price, wight, img,
}) {
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
        <button type="button" className="btn btn-warning">В корзину</button>
      </div>
    </div>
  )
}
