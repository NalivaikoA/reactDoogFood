/* eslint-disable max-len */
import { Link } from 'react-router-dom'
import styles from './logo.module.css'
import logo from './logo.png'

export function Logo() {
  return (
    <Link to="/">
      <div className={styles.wr}>
        <img className={styles.logo} src={logo} alt="Logo" />
        <h1>DogFood</h1>
      </div>
    </Link>
  )
}
