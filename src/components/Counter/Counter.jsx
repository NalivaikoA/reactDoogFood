import { useDispatch } from 'react-redux'
import {
  itemDecrement, itemIncrement,
} from '../../redux/slices/cartSlice'
import styles from './counter.module.css'

export function Counter({ count, stock, id }) {
  console.log('Counter Render')

  const dispatch = useDispatch()

  const decrementHandler = () => {
    dispatch(itemDecrement(id))
  }

  const incrementHandler = () => {
    dispatch(itemIncrement(id))
  }

  return (
    <div className={styles.counter}>
      <button
        onClick={decrementHandler}
        type="button"
        className="btn mx-2 btn-light"
        disabled={count === 1}
      >
        <i className="bi bi-dash-lg" />
      </button>
      <p>{count}</p>
      <button
        onClick={incrementHandler}
        type="button"
        className="btn mx-2 btn-light"
        disabled={count === stock}
      >
        <i className="bi bi-plus-lg" />
      </button>
    </div>
  )
}
