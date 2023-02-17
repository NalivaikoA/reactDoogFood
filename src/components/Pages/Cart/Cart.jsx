import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import styles from './cart.module.css'
import {
  clearCart,
  getCartSelector,
  notSelectAllItems,
  selectAllItems,
} from '../../../redux/slices/cartSlice'
import { CartListItem } from '../../CartListItem/CartListItem'
import { Loader } from '../../Loader/Loader'
import { getIniteState } from '../../../redux/initState'
import { dogFoodApi } from '../../../api/DogFoodApi'

export function Cart() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const clickHandler = () => {
    navigate('/products')
  }

  const clearCartHandler = () => {
    dispatch(clearCart())
  }

  const {
    user: { token },
  } = getIniteState()

  useEffect(() => {
    if (!token) {
      navigate('/signin')
    }
  }, [token])

  const cart = useSelector(getCartSelector)
  const ids = []
  cart.forEach((el) => {
    ids.push(el.id)
  })

  const isAllChecked = cart.every((item) => item.isChecked === true)
  const getQueryCartKey = (item) => ['cart', item]

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [getQueryCartKey(cart.length)],
    queryFn: () => dogFoodApi.getProductsByIds(cart.map((product) => product.id), token),
    enabled: !!token,
    keepPreviousData: true,
  })

  const products = data && data.filter((productFromServer) => ids.includes(productFromServer._id))

  if (isLoading) return <Loader />
  if (isError) return <h1>Error happend</h1>

  const cartIsChecked = []
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].isChecked === true) {
      cartIsChecked.push(cart[i])
    }
  }

  const quantity = cartIsChecked.reduce(
    (previousVal, currentItem) => previousVal + currentItem.count,
    0,
  )

  const getCartItemById = (idFromFetch) => cart.find((item) => item.id === idFromFetch)
  const getCartFetchItemById = (idFromCart) => products.find((item) => item._id === idFromCart)

  const totalSum = cartIsChecked.reduce(
    (previousVal, currentItem) => previousVal
      // eslint-disable-next-line no-unsafe-optional-chaining
      + currentItem.count * getCartFetchItemById(currentItem.id)?.price,
    0,
  )

  const totalSumFormat = new Intl.NumberFormat('ru-RU').format(totalSum)

  const totalSumWithDiscount = cartIsChecked.reduce(
    (previousVal, currentItem) => {
      const cartFetchItemById = getCartFetchItemById(currentItem.id)
      return (
        previousVal
        + currentItem.count
          // eslint-disable-next-line no-unsafe-optional-chaining
          * (cartFetchItemById?.price * ((100 - cartFetchItemById?.discount) * 0.01))
      )
    },
    0,
  )

  const totalSumWithDiscountFormat = new Intl.NumberFormat('ru-RU').format(totalSumWithDiscount)

  const selectHandler = () => {
    if (isAllChecked) {
      dispatch(notSelectAllItems())
    } else {
      dispatch(selectAllItems())
    }
  }

  return (
    <div className={styles.wr_main}>
      {!cart.length && (
        <div className={styles.wr_without}>
          <div className={styles.wrInner_without}>
            <i className="bi bi-cart-x" />
            <h1>Корзина пуста</h1>
            <p>Добавьте товары в корзину, воспользуйтесь каталогом</p>
            <div className={styles.buttonWr}>
              <button
                onClick={clickHandler}
                type="button"
                className="btn btn-warning"
              >
                В каталог
              </button>
            </div>
          </div>
        </div>
      )}

      {cart.length > 0 && (
        <div className={styles.wr}>
          <div className={styles.wr_left}>
            <div className={styles.wr_left_blockA}>
              <div className={styles.wr_left_blockA_selectAll}>
                <input
                  id="select_all"
                  type="checkbox"
                  checked={isAllChecked}
                  onChange={selectHandler}
                />
                <label htmlFor="select_all">Выбрать все</label>
              </div>
              <Link
                className={styles.link}
                onClick={clearCartHandler}
                to="/cart"
              >
                Очистить корзину
              </Link>
            </div>
            <div className={styles.wr_left_blockB}>
              {products.map((el) => (
                <CartListItem
                  key={el._id}
                  id={el._id}
                  name={el.name}
                  price={el.price}
                  img={el.pictures}
                  stock={el.stock}
                  discount={el.discount}
                  description={el.description}
                  isChecked={getCartItemById(el._id)?.isChecked}
                  count={getCartItemById(el._id)?.count}
                />
              ))}
            </div>
          </div>
          <div className={styles.wr_right}>
            <div className={styles.wr_right_a}>
              <p>Условия заказа</p>
            </div>
            <div className={styles.wr_right_totalPriceDiscount}>
              <p>Итого товаров:</p>
              {totalSumFormat !== totalSumWithDiscountFormat && (
              <p>
                {totalSumFormat}
                {' '}
                ₽
              </p>
              )}
            </div>
            <div className={styles.wr_right_totalPrice}>
              <p>
                {quantity}
                {' '}
                шт
              </p>
              <p>
                {totalSumWithDiscountFormat}
                {' '}
                ₽
              </p>
            </div>
            <button type="button" className="btn btn-warning">
              Перейти к оформлению
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
