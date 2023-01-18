import { Link } from 'react-router-dom'
import headerSignInStyles from './headerSignIn.module.css'

export function HeaderSignIn() {
  return (
    <div className={headerSignInStyles.wr}>
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
