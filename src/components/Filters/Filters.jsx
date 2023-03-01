import { useSearchParams } from 'react-router-dom'
import styles from './filters.module.css'
import {
  DATA_FILTER,
  FILTER_QUERY_NAME, POPULAR_FILTER, PRICE_FILTER, RATING_FILTER, SALES_FILTER,
} from './constants'
import { FilterItem } from './FilterItem/FilterItem'

const FILTERS = [PRICE_FILTER, SALES_FILTER, RATING_FILTER, DATA_FILTER, POPULAR_FILTER]

export function Filters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const clickFilterHandler = (filterType, isActive, e) => {
    console.log(e)
    e.preventDefault()
    if (!isActive) searchParams.delete(FILTER_QUERY_NAME)
    else searchParams.set(FILTER_QUERY_NAME, filterType)
    setSearchParams(searchParams)
  }

  return (
    <div className={styles.wr}>
      {FILTERS.map((filter) => (
        <FilterItem
          key={filter.name}
          {...filter}
          clickFilterHandler={clickFilterHandler}
        />
      ))}
    </div>
  )
}
