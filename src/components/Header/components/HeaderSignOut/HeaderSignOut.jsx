import classNames from 'classnames'
import { Link, useNavigate } from 'react-router-dom'
import styles from './headerSignOut.module.css'
import { TOKEN_LS_KEY_A } from '../../../../redux/constants'

export function HeaderSignOut() {
  const navigate = useNavigate()

  const clickHandler = (e) => {
    e.preventDefault()
    localStorage.removeItem(TOKEN_LS_KEY_A)
    navigate('/')
  }
  return (
    <div>
      <Link onClick={clickHandler} to="/#">
        <i className={classNames(
          'bi bi-box-arrow-right',
          styles.icon,
        )}
        />
      </Link>
    </div>
  )
}
