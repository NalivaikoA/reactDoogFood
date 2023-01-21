import { Link } from 'react-router-dom'
import Styles from './headerSignIn.module.css'

export function HeaderSignIn() {
  return (
    <div className={Styles.wr}>
      <nav>
        <ul>
          <li>
            <Link to="/signin">ВОЙТИ</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
