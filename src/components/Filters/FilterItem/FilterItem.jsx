import classNames from 'classnames'
import { Link, useSearchParams } from 'react-router-dom'
import { FILTER_QUERY_NAME } from '../constants'
import styles from '../filters.module.css'

export function FilterItem({ type, clickFilterHandler, name }) {
  const [searchParams] = useSearchParams()

  const isComplexFilter = Array.isArray(type)

  const currentFilterNameFromQuery = searchParams.get(FILTER_QUERY_NAME)

  const isActive = !isComplexFilter
    ? currentFilterNameFromQuery === type
    : type.includes(currentFilterNameFromQuery)

  const clickHandler = (e) => {
    e.preventDefault()
    if (isComplexFilter) {
      const currentIndex = type.indexOf(currentFilterNameFromQuery)
      const nextIndex = (currentIndex + 1) % type.length
      return clickFilterHandler(type[nextIndex], true, e)
    }
    return clickFilterHandler(type, !isActive, e)
  }

  const renderArrow = () => {
    if (!isComplexFilter || !isActive) return null

    const currentIndex = type.indexOf(currentFilterNameFromQuery)

    return !currentIndex ? <i className="bi bi-sort-up" /> : <i className="bi bi-sort-down" />
  }

  return (
    <div
      onClick={(e) => clickHandler(e)}
      className={classNames(
        { [styles.filtersItem]: !isActive },
        { [styles.active]: isActive },
      )}
    >
      <Link to="/#">
        {name}
        {' '}
        {renderArrow()}
      </Link>
    </div>
  )
}
