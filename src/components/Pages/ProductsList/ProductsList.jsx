/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import styles from './productsList.module.css'
import { Loader } from '../../Loader/Loader'
import { ContextApp } from '../../../contexts/ContextApp'
import { ProductsListItem } from '../../ProductsListItem/ProductsListItem'

export function ProductsList() {
  const navigate = useNavigate()

  const { getTokenFromLS } = useContext(ContextApp)

  const dataSignUpFromLS = getTokenFromLS()

  useEffect(() => {
    if (!dataSignUpFromLS.length) {
      navigate('/signin')
    }
  }, [])

  const {
    data: products, isLoading, isError, error, refetch,
  } = useQuery({
    queryKey: ['productsListFetch'],
    queryFn: () => fetch('https://api.react-learning.ru/products', {
      headers: {
        authorization: `Bearer ${dataSignUpFromLS}`,
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

  if (isError) {
    return (
      <p>
        Error happend:
        {' '}
        {error.message}
      </p>
    )
  }

  if (isLoading) return <Loader />

  if (!products.products.length) return <p>List is empty ...</p>

  console.log(products)
  console.log(products.products)
  console.log(products.products[0])
  console.log(products.products[0]._id)

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
