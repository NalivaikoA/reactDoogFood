/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import styles from './productsList.module.css'
import { ContextApp } from '../../../contexts/ContextApp'
import { ProductsListItem } from '../../ProductsListItem/ProductsListItem'
import { withQuery } from '../../HOCs/withQuery'

function ProductsListInner({ products }) {
  console.log('Рендерится компонент ProductsListInner')
  if (!products.products.length) return <p>List is empty ...</p>

  return (
    <div className={styles.wr}>
      {products.products.map((el) => (
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
  )
}

const ProductListInnerWithQuery = withQuery(ProductsListInner)

export function ProductsList() {
  console.log('Рендерится компонент ProductsList')
  const navigate = useNavigate()

  const { getTokenFromLS } = useContext(ContextApp)

  const dataSignInFromLS = getTokenFromLS()

  // useEffect(() => {
  //   if (!dataSignUpFromLS.length) {
  //     navigate('/signin')
  //   }
  // }, [])

  if (!dataSignInFromLS.length) {
    useEffect(() => navigate('/signin'))
    return null
  }

  const {
    data: products, isLoading, isError, error, refetch,
  } = useQuery({
    queryKey: ['productsListFetch'],
    queryFn: () => fetch('https://api.react-learning.ru/products', {
      headers: {
        authorization: `Bearer ${dataSignInFromLS}`,
      },
    }).then((res) => {
      if (res.status >= 400 && res.status < 500) {
        throw new Error(`Произошла ошибка при получении списка продуктов.
        Проверьте отправляемые данные. Status: ${res.status}`)
      }

      if (res.status >= 500) {
        throw new Error(`Произошла ошибка при получении списка продуктов.
          Попробуйте сделать запрос позже. Status: ${res.status}`)
      }

      return res.json()
    }),
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

// const {
//   data: products, isLoading, isError, error, refetch,
// } = useQuery({
//   queryKey: ['productsListFetch'],
//   queryFn: () => fetch('https://api.react-learning.ru/products', {
//     headers: {
//       authorization: `Bearer ${dataSignInFromLS}`,
//     },
//   }).then((res) => {
//     if (res.status >= 400 && res.status < 500) {
//       throw new Error(`Произошла ошибка при получении списка продуктов.
//       Проверьте отправляемые данные. Status: ${res.status}`)
//     }

//     if (res.status >= 500) {
//       throw new Error(`Произошла ошибка при получении списка продуктов.
//         Попробуйте сделать запрос позже. Status: ${res.status}`)
//     }

//     return res.json()
//   }),
// })
