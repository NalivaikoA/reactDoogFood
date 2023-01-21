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
        <h6>{name}</h6>
        <p>
          {price}
          {' '}
          р
        </p>
        <p>{wight}</p>
      </div>
      <div className={styles.button__body}>
        <button type="button" className="btn btn-warning"><b>В корзину</b></button>
      </div>
    </div>
  )
}

/* <div id={id} className={styles.card}>
<div className={styles.image__body}>
  <img src={img} className={styles.card__image} alt="картинка" />
</div>
<div className={styles.card__body}>
  <h3>{name}</h3>
  <p>{price}</p>
  <p>{wight}</p>
</div>
<div className={styles.card__button}>
  <button type="button" className="btn btn-warning">в корзину</button>
</div>
</div> */
