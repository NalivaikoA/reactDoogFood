/* eslint-disable react/no-unescaped-entities */
import Styles from './productsList.module.css'
import logo from './logo1.png'

export function ProductsList() {
  return (
    <div className={Styles.wr}>
      <h1>Здесь будет список товаров "Products"</h1>
      <img src={logo} alt="logo" />
    </div>

  )
}
