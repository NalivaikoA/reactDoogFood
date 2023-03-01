/* eslint-disable react/no-unescaped-entities */
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styles from './productsList.module.css'
import { ProductsListItem } from '../../ProductsListItem/ProductsListItem'
import { withQuery } from '../../HOCs/withQuery'
import { getSearchSelector } from '../../../redux/slices/filterSlice'
import { getQueryKey } from './utils'
import { getIniteState } from '../../../redux/initState'
import { dogFoodApi } from '../../../api/DogFoodApi'
import { Filters } from '../../Filters/Filters'
import {
  FILTER_QUERY_NAME,
  getFilteredProducts,
} from '../../Filters/constants'
// import { dogFoodApi } from '../../../api/DogFoodApi'

function ProductsListInner({ products, addProductHandler }) {
  console.log('Рендерится компонент ProductsListInner')
  if (!products.length) {
    return (
      <div className={styles.emptyList}>
        <p>Товары не найдены</p>
        <i className="bi bi-emoji-frown" />
      </div>
    )
  }

  return (
    <div className={styles.productListWr}>
      <div className={styles.topWr}>
        <Filters />
        <button
          onClick={addProductHandler}
          type="button"
          className="btn btn-primary btn-sm"
        >
          Добавить товар
        </button>
      </div>
      <div className={styles.wr}>
        {products.map((el) => (
          <ProductsListItem
            key={el._id}
            id={el._id}
            name={el.name}
            price={el.price}
            wight={el.wight}
            img={el.pictures}
            reviews={el.reviews}
            discount={el.discount}
          />
        ))}
      </div>
    </div>
  )
}

const ProductListInnerWithQuery = withQuery(ProductsListInner)

export function ProductsList() {
  console.log('Рендерится компонент ProductsList')
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const currentFilterNameFromQuery = searchParams.get(FILTER_QUERY_NAME)

  const search = useSelector(getSearchSelector)

  const {
    user: { token },
  } = getIniteState()

  useEffect(() => {
    if (!token) {
      navigate('/signin')
    }
  }, [token])

  const {
    data = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: getQueryKey(search),
    queryFn: () => dogFoodApi.getAllProducts(search, token),
    enabled: !!token,
  })

  let products = data

  if (currentFilterNameFromQuery) {
    products = getFilteredProducts(data, currentFilterNameFromQuery)
  }

  const addProductHandler = () => {
    navigate('/addNewProduct')
  }

  return (
    <ProductListInnerWithQuery
      products={products}
      isLoading={isLoading}
      isError={isError}
      error={error}
      refetch={refetch}
      addProductHandler={addProductHandler}
    />
  )
}
