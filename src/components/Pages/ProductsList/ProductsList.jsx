/* eslint-disable react/no-unescaped-entities */
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styles from './productsList.module.css'
import { ProductsListItem } from '../../ProductsListItem/ProductsListItem'
import { withQuery } from '../../HOCs/withQuery'
import { getSearchSelector } from '../../../redux/slices/filterSlice'
import { getQueryKey } from './utils'
import { getIniteState } from '../../../redux/initState'
import { dogFoodApi } from '../../../api/DogFoodApi'
import { Filters } from '../../Filters/Filters'
// import { dogFoodApi } from '../../../api/DogFoodApi'

function ProductsListInner({ products }) {
  console.log('Рендерится компонент ProductsListInner')
  if (!products.length) return <p>List is empty ...</p>

  return (
    <div className={styles.productListWr}>
      {' '}
      <Filters />
      <div className={styles.wr}>
        {products.map((el) => (
          <ProductsListItem
            key={el._id}
            id={el._id}
            name={el.name}
            price={el.price}
            wight={el.wight}
            img={el.pictures}
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

  const search = useSelector(getSearchSelector)

  const { user: { token } } = getIniteState()

  useEffect(() => {
    if (!token) {
      navigate('/signin')
    }
  }, [token])

  const {
    data: products, isLoading, isError, error, refetch,
  } = useQuery({
    queryKey: getQueryKey(search),
    queryFn: () => dogFoodApi.getAllProducts(search, token),
    enabled: !!token,
  })

  console.log({
    products, isLoading, isError, error, refetch,
  })

  return (
    <ProductListInnerWithQuery
      products={products}
      isLoading={isLoading}
      isError={isError}
      error={error}
      refetch={refetch}
    />
  )
}
