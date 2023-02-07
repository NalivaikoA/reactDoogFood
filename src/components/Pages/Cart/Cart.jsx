// import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import styles from './cart.module.css'
import { getCartSelector } from '../../../redux/slices/cartSlice'
import { CartListItem } from '../../CartListItem/CartListItem'
import { Loader } from '../../Loader/Loader'
import { getIniteState, initState } from '../../../redux/initState'

export function Cart() {
  // const navigate = useNavigate()
  // const clickHandler = () => {
  //   navigate('/products')
  // }

  const { user: { token } } = getIniteState()

  const cart = useSelector(getCartSelector)
  const { data: products, isLoading, isError } = useQuery({
    queryKey: ['cart'],
    queryFn: () => Promise.all(
      cart
        .map((product) => product.id)
        .map((id) => fetch(`https://api.react-learning.ru/products/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())),
    ),
  })

  if (isLoading) return <Loader />
  if (isError) return <h1>Error happend</h1>

  console.log(products)
  console.log(initState.cart)

  // if (cart[0].id === '') return <p>List is empty ...</p>

  return (
    <div className={styles.wr}>
      {products.map((el) => (
        <CartListItem
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

// return (
//   <div className={styles.wr}>
//     <div className={styles.wrInner}>
//       <i className="bi bi-cart-x" />
//       <h1>Корзина пуста</h1>
//       <p>Добавьте товары в корзину, воспользуйтесь каталогом</p>
//       <div className={styles.buttonWr}>
//         <button
//           onClick={clickHandler}
//           type="button"
//           className="btn btn-warning"
//         >
//           В каталог
//         </button>
//       </div>
//     </div>
//   </div>
// )
