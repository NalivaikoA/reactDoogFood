import classNames from 'classnames'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './headerSignOut.module.css'
import { ContextApp } from '../../../../contexts/ContextApp'

export function HeaderSignOut() {
  const navigate = useNavigate()
  const { TOKEN_LS_KEY } = useContext(ContextApp)
  const clickHandler = (e) => {
    e.preventDefault()
    localStorage.removeItem(TOKEN_LS_KEY)
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
