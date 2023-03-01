import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getIniteState } from '../../../../redux/initState'
import { addToken } from '../../../../redux/slices/userSlice'
import styles from './headerSignInAndOut.module.css'

export function HeaderSignInAndOut() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const outClickHandler = (e) => {
    e.preventDefault()
    dispatch(addToken(''))
    navigate('/')
  }

  const {
    user: { token },
  } = getIniteState()

  return (
    <div className={styles.wr}>
      {!token ? (
        <nav>
          <ul>
            <li>
              <Link to="/signin">ВОЙТИ</Link>
            </li>
          </ul>
        </nav>
      ) : (
        <Link onClick={outClickHandler} to="/#">
          <i className={classNames(
            'bi bi-box-arrow-right',
            styles.icon,
          )}
          />
        </Link>
      )}
    </div>
  )
}
