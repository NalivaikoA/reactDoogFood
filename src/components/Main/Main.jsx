import styles from './main.module.css'
import logo from '../Pages/ProductsList/logo1.png'

export function Main() {
  console.log('Рендерится компонент Main')
  return (
    <main className={styles.wr}>
      <p>Добро пожаловать в наш Интернет-магазин</p>
      <p>Здесь Вы сможете приобрести высококачественные собачьи лакомства</p>
      <img src={logo} alt="logo" />
    </main>
  )
}
