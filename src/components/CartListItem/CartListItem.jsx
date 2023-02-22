import classNames from 'classnames'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
// import { deleteItemFromCart } from '../../redux/slices/cartSlice'
import { changeItemIsChecked, deleteItemFromCart }
  from '../../redux/slices/cartSlice'
import { Counter } from '../Counter/Counter'
import { Modal } from '../Modal/Modal'
import styles from './cartListItem.module.css'

export function CartListItem({
  id, name, price, img, stock, description, count, isChecked,
}) {
  const dispatch = useDispatch()

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const closeDeleteModalHandler = () => {
    setIsDeleteModalOpen(false)
  }

  const openDeleteModalHandler = (e) => {
    e.preventDefault()
    setIsDeleteModalOpen(true)
  }

  // eslint-disable-next-line no-shadow
  const deleteItemHandler = (e) => {
    e.preventDefault()
    dispatch(deleteItemFromCart(id))
    closeDeleteModalHandler()
  }

  const changeStatusHandler = () => {
    dispatch(changeItemIsChecked(id))
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
            <Link className={styles.link} onClick={openDeleteModalHandler} to="/#">Удалить</Link>
          </div>
          <p>
            {price}
            {' '}
            ₽
          </p>
        </div>
        <Modal isOpen={isDeleteModalOpen} closeHandler={closeDeleteModalHandler}>
          <p>
            Вы действительно хотите удалить
            {' '}
            <b>{name}</b>
            {' '}
            из корзины?
          </p>
          <div className="d-flex justify-content-center">
            <button
              onClick={closeDeleteModalHandler}
              className={classNames(
                'btn',
                'btn-primary',
                'btn-sm',
                'me-3',
                'mt-3',
              )}
              type="button"
            >
              отмена
            </button>
            <button
              onClick={deleteItemHandler}
              className={classNames(
                'btn',
                'btn-danger',
                'btn-sm',
                'me-3',
                'mt-3',
              )}
              type="button"
            >
              Удалить
            </button>
          </div>
        </Modal>
      </div>
    )

  )
}
