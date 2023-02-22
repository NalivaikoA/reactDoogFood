import classNames from 'classnames'
import { Link, useNavigate } from 'react-router-dom'
import styles from './headerProfile.module.css'

export function HeaderProfile() {
  const navigate = useNavigate()

  const profileClickHandler = (e) => {
    e.preventDefault()
    navigate('/profile')
  }
  return (
    <div>
      <Link onClick={profileClickHandler} to="/#">
        <i className={classNames(
          'bi bi-person-circle',
          styles.icon,
        )}
        />
      </Link>
    </div>
  )
}
