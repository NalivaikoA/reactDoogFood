import { Link, useSearchParams } from 'react-router-dom'
import classNames from 'classnames'
import styles from './filters.module.css'

const FILTERS = [
  'Популярные',
  'Новинки',
  'Сначала дешевыe',
  'Сначала дорогие',
  'По рейтингу',
  'По скидке',
]

export function Filters() {
  const [searchParams, setSearchParams] = useSearchParams()

  console.log({ searchParams, setSearchParams })

  const clickFilterHandler = (filterName, e) => {
    e.preventDefault()
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      filterName,
    })
  }

  return (
    <div className={styles.wr}>
      {FILTERS.map((filterName) => (
        <FilterItem
          key={filterName}
          clickFilterHandler={clickFilterHandler}
          filterName={filterName}
        />
      ))}
    </div>
  )
}

export function FilterItem({ filterName, clickFilterHandler }) {
  const [searchParams] = useSearchParams()

  const currentFilterName = searchParams.get('filterName')

  return (
    <div className={classNames(
      styles.filtersItem,
      { [styles.active]: currentFilterName === filterName },
    )}
    >
      <Link onClick={(e) => clickFilterHandler(filterName, e)} to="/#">
        {filterName}
      </Link>
    </div>
  )
}
