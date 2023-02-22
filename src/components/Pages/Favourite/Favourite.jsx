import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import styles from './favourite.module.css'
import {
  notSelectAllItems,
  selectAllItems,
  clearFavourite,
  getFavouriteSelector,
} from '../../../redux/slices/favouriteSlice'
import { Loader } from '../../Loader/Loader'
import { getIniteState } from '../../../redux/initState'
import { dogFoodApi } from '../../../api/DogFoodApi'
import { FavouriteListItem } from '../../FavouriteListItem/FavouriteListItem'
import { addItemInCart } from '../../../redux/slices/cartSlice'

export function Favourite() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const clickHandler = () => {
    navigate('/products')
  }

  const clearFavouriteHandler = () => {
    dispatch(clearFavourite())
  }

  const {
    user: { token },
  } = getIniteState()

  useEffect(() => {
    if (!token) {
      navigate('/signin')
    }
  }, [token])

  const favourite = useSelector(getFavouriteSelector)
  console.log({ favourite })
  const itemsInCart = useSelector((state) => state.cart)
  console.log({ itemsInCart })

  const isAllFavouriteChecked = favourite.every(
    (item) => item.isChecked === true,
  )

  const getQueryCartKey = (item) => ['favourite', item]

  const { data, isLoading, isError } = useQuery({
    queryKey: [getQueryCartKey(favourite.length)],
    queryFn: () => dogFoodApi.getProductsByIds(
      favourite.map((product) => product.id),
      token,
    ),
    enabled: !!token,
    keepPreviousData: true,
  })

  const ids = []
  favourite.forEach((el) => {
    ids.push(el.id)
  })

  const products = data
    && data.filter((productFromServer) => ids.includes(productFromServer._id))

  if (isLoading) return <Loader />
  if (isError) return <h1>Error happend</h1>

  const favouriteIsChecked = []
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < favourite.length; i++) {
    if (favourite[i].isChecked === true) {
      favouriteIsChecked.push(favourite[i])
    }
  }

  console.log({ favouriteIsChecked })

  const idsIsChecked = []
  favouriteIsChecked.forEach((el) => {
    idsIsChecked.push(el.id)
  })

  const quantity = favouriteIsChecked.reduce(
    (previousVal, currentItem) => previousVal + currentItem.count,
    0,
  )

  const getFavouriteItemById = (idFromFetch) => favourite.find((item) => item.id === idFromFetch)

  const selectHandler = () => {
    if (isAllFavouriteChecked) {
      dispatch(notSelectAllItems())
    } else {
      dispatch(selectAllItems())
    }
  }

  const result = favouriteIsChecked.filter((v) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    itemsInCart.some((v2) => v.id === v2.id && v.item === v2.item))
  console.log(result)
  console.log(result.length)

  const addItemsInCartHandler = (e) => {
    e.stopPropagation()
    if (
      favourite.length === favouriteIsChecked.length
      && result.length === favouriteIsChecked.length
    ) {
      navigate('/cart')
    } else {
      idsIsChecked.forEach((el) => {
        const isItemInCart = itemsInCart.find((item) => item.id === el)
        if (!isItemInCart) {
          dispatch(addItemInCart(el))
        }
      })
    }
  }

  return (
    <div className={styles.wr_main}>
      {!favourite.length && (
        <div className={styles.wr_without}>
          <div className={styles.wrInner_without}>
            <i className="bi bi-heart-half" />
            <p>В списке пока нет ни одного избранного товара</p>
            <div className={styles.buttonWr}>
              <button
                onClick={clickHandler}
                type="button"
                className="btn btn-warning"
              >
                Перейти в каталог
              </button>
            </div>
          </div>
        </div>
      )}

      {favourite.length > 0 && (
        <div className={styles.wr}>
          <div className={styles.wr_left}>
            <div className={styles.wr_left_blockA}>
              <div className={styles.wr_left_blockA_selectAll}>
                <input
                  id="select_all"
                  type="checkbox"
                  checked={isAllFavouriteChecked}
                  onChange={selectHandler}
                />
                <label htmlFor="select_all">Выбрать все</label>
              </div>
              <Link
                className={styles.link}
                onClick={clearFavouriteHandler}
                to="/favourite"
              >
                Очистить список
              </Link>
            </div>
            <div className={styles.wr_left_blockB}>
              {products.map((el) => (
                <FavouriteListItem
                  key={el._id}
                  id={el._id}
                  name={el.name}
                  price={el.price}
                  img={el.pictures}
                  stock={el.stock}
                  description={el.description}
                  isChecked={getFavouriteItemById(el._id)?.isChecked}
                  count={getFavouriteItemById(el._id)?.count}
                />
              ))}
            </div>
          </div>
          <div className={styles.wr_right}>
            <div className={styles.wr_right_a}>
              <p>Избранное</p>
            </div>
            <div className={styles.wr_right_totalPriceDiscount}>
              <p>Итого товаров:</p>
            </div>
            <div className={styles.wr_right_totalPrice}>
              <p>
                {quantity}
                {' '}
                шт
              </p>
              <button
                onClick={addItemsInCartHandler}
                type="button"
                className={
                  favourite.length === favouriteIsChecked.length
                  && result.length === favouriteIsChecked.length
                    ? 'btn btn-warning btn-sm'
                    : 'btn btn-primary btn-sm'
                }
              >
                {favourite.length === favouriteIsChecked.length
                && result.length === favouriteIsChecked.length
                  ? 'все в корзине'
                  : 'в корзину'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
