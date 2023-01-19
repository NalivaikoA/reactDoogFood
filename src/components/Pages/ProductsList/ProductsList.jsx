/* eslint-disable react/no-unescaped-entities */
// import { useQuery } from '@tanstack/react-query'
import Styles from './productsList.module.css'
import logo from './logo1.png'
// import { Loader } from '../../Loader/Loader'

export function ProductsList() {
//   const {
//     data: products, isLoading, isError, error, refetch,
//   } = useQuery({
//     queryKey: ['productsListFetch'],
//     queryFn: () => fetch('https://api.react-learning.ru/products').then((res) => {
//       if (res.status >= 400 && res.status < 500) {
//         throw new Error(`Произошла ошибка при получении списка продуктов.
//         Проверьте отправляемые данные. Status: ${res.status}`)
//       }

  //       if (res.status >= 500) {
  //         throw new Error(`Произошла ошибка при получении списка продуктов.
  //         Попробуйте сделать запрос позже. Status: ${res.status}`)
  //       }

  //       return res.json()
  //     }),
  //   })

  //   console.log({
  //     data, isLoading, isError, error, refetch,
  //   })

  // if (isError) return <p>Error happend: {error.message}</p>

  // if (isLoading) return <Loader />

  // if (!products.length) return <p>List is empty ...</p>

  return (
    <div className={Styles.wr}>
      <h1>Здесь будет список товаров "Products"</h1>
      <img src={logo} alt="logo" />
    </div>

  )
}
