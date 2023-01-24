/* eslint-disable max-len */
import { Link } from 'react-router-dom'
import logoStyles from './logo.module.css'
import logo from './logo.png'

export function Logo() {
  return (
    <Link to="/">
      <div className={logoStyles.wr}>
        <img className={logoStyles.logo} src={logo} alt="Logo" />
        <h1>DogFood</h1>
      </div>
    </Link>
  )
}
