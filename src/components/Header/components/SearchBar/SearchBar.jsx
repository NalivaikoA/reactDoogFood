export function SearchBar() {
  return (
    <nav className="navbar bg-transparent">
      <div className="container-fluid">
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Поиск"
            aria-label="Search"
          />
          <button className="btn btn-secondary" type="submit">
            Найти
          </button>
        </form>
      </div>
    </nav>
  )
}
