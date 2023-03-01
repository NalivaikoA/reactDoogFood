import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { useDebounce } from '../../../../hooks/useDebounce'
import { changeSearchFilter } from '../../../../redux/slices/filterSlice'

export function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(() => {
    const searchValueFromQuery = searchParams.get('q')

    return searchValueFromQuery ?? ''
  })

  const dispatch = useDispatch()

  const debouncedSearchValue = useDebounce(search, 300)

  const changeSearchHandler = (e) => {
    const newSearchValue = e.target.value
    setSearch(newSearchValue)
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      q: newSearchValue,
    })
  }

  useEffect(() => {
    dispatch(changeSearchFilter(debouncedSearchValue))
  }, [debouncedSearchValue, dispatch])

  return (
    <nav className="navbar bg-transparent">
      <div className="container-fluid">
        <form className="d-flex justify-content-center" role="search">
          <input
            value={search}
            onChange={changeSearchHandler}
            className="form-control me-2"
            style={{ width: '350px' }}
            type="search"
            placeholder="Поиск"
            aria-label="Search"
          />
        </form>
      </div>
    </nav>
  )
}
