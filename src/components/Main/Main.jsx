import mainStyles from './main.module.css'

export function Main() {
  console.log('Рендерится компонент Main')
  return (
    <main className={mainStyles.wr}>
      <p>Добро пожаловать в наш Интернет-магазин</p>
      <p>Здесь Вы сможете приобрести высококачественные собачьи лакомства</p>
    </main>
  )
}
