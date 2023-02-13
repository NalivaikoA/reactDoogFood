import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
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

  const cart = useSelector(getCartSelector)

  const isAllChecked = cart.every((item) => item.isChecked === true)

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['cart'],
    queryFn: () => Promise.all(
      cart
        .map((product) => product.id)
        .map((id) => fetch(`https://api.react-learning.ru/products/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }).then((res) => res.json())),
    ),
    enabled: !!token,
  })

  if (isLoading) return <Loader />
  if (isError) return <h1>Error happend</h1>

  // const cartIsChecked = []
  // // eslint-disable-next-line no-plusplus
  // for (let i = 0; i < cart.length; i++) {
  //   if (cart[i].isChecked === true) {
  //     cartIsChecked.push(cart[i])
  //   }
  // }
  // console.log(cartIsChecked)
  // console.log(cartIsChecked[0].id)

  // const getCartItemById = (id) => cartIsChecked.find((item) => item.id === id)
  // console.log(getCartItemById(cartIsChecked[0].id))

  // console.log(products)
  // console.log(cart)
  // const getCartItemFetchById = (id) => products.find((item) => item.id === id)

  // // eslint-disable-next-line no-undef
  // console.log(products[0]._id)
  // console.log(cart[0].id)
  // console.log(getCartItemFetchById(cart[0].id))
  // console.log(getCartItemFetchById(products[0]._id))

  // const totalSum = cartIsChecked.reduce((previousVal, currentItem) => {
  //   const updatedSum =
  // previousVal + currentItem.count * getCartItemFetchById(currentItem.id).price
  //   return updatedSum
  // }, 0)
  // console.log(totalSum)

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
                />
              ))}
            </div>
          </div>
          <div className={styles.wr_right}>
            <div className={styles.wr_right_a}>
              <p>Условия заказа</p>
            </div>
            <div className={styles.wr_right_totalPriceDiscount}>
              <p>Итого:</p>
              <p>105 000 ₽</p>
            </div>
            <div className={styles.wr_right_totalPrice}>
              <p>3 товара</p>
              <p>100 000 ₽</p>
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
