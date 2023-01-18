import { Link } from 'react-router-dom'
import classNames from 'classnames'
import headerSignUpStyles from './headerSignUp.module.css'

export function HeaderSignUp() {
  return (
    <div>
      <nav>
        <ul>
          <li className={classNames(
            'btn',
            'btn-primary',
            headerSignUpStyles.liStyle,
          )}
          >
            <Link to="/signup">Регистрация</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
