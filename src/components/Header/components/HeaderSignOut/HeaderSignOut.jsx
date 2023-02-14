import classNames from 'classnames'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styles from './headerSignOut.module.css'
import { addToken } from '../../../../redux/slices/userSlice'

export function HeaderSignOut() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const outClickHandler = (e) => {
    e.preventDefault()
    dispatch(addToken(''))
    navigate('/')
  }
  return (
    <div>
      <Link onClick={outClickHandler} to="/#">
        <i className={classNames(
          'bi bi-box-arrow-right',
          styles.icon,
        )}
        />
      </Link>
    </div>
  )
}
