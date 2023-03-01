const LOW_PRICE = 'LOW_PRICE'
const HIGH_PRICE = 'HIGH_PRICE'
const SALES = 'SALES'
const RATING = 'RATING'
const LOW_DATA = 'LOW_DATA'
const HIGH_DATA = 'HIGH_DATA'
const POPULAR = 'POPULAR'

export const getAvgRating = (reviews) => {
  const ratesArrey = reviews.map((el) => el.rating)

  const avgRating = ratesArrey.reduce((acc, curr) => acc + curr, 0) / reviews.length || 0

  return avgRating
}

export const PRICE_FILTER = {
  type: [LOW_PRICE, HIGH_PRICE],
  name: 'Цена',
}

export const DATA_FILTER = {
  type: [LOW_DATA, HIGH_DATA],
  name: 'По дате',
}

export const SALES_FILTER = {
  type: SALES,
  name: 'Распродажа',
}

export const RATING_FILTER = {
  type: RATING,
  name: 'По рейтингу',
}

export const POPULAR_FILTER = {
  type: POPULAR,
  name: 'Популярные',
}

export const FILTER_QUERY_NAME = 'filterType'

export const getFilteredProducts = ([...products], filterType) => {
  switch (filterType) {
    case LOW_PRICE:
      return products.sort((a, b) => {
        const priceA = a.price * (1 - a.discount / 100)
        const priceB = b.price * (1 - b.discount / 100)
        return priceA - priceB
      })
    case HIGH_PRICE:
      return products.sort((a, b) => {
        const priceA = a.price * (1 - a.discount / 100)
        const priceB = b.price * (1 - b.discount / 100)
        return priceB - priceA
      })
    case LOW_DATA:
      return products.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))
    case HIGH_DATA:
      return products.sort((a, b) => Date.parse(a.created_at) - Date.parse(b.created_at))
    case SALES:
      return products.filter((product) => !!product.discount)
    case POPULAR:
      return products.sort((a, b) => b.likes.length - a.likes.length)
    case RATING:
      return products.sort((a, b) => getAvgRating(b.reviews) - getAvgRating(a.reviews))
    default:
      return products
  }
}

// case RATING:
//   return products.sort(
//     // eslint-disable-next-line array-callback-return, consistent-return
//     (a, b) => {
//       const ratA = a.reviews.length ? a.reviews.reduce((accum, item) => accum + item.rating, 0)
//     / a.reviews.length : 0
//       const ratB = b.reviews.length ? b.reviews.reduce((accum, item) => accum + item.rating, 0)
//     / a.reviews.length : 0
//       if (ratA === ratB) return 0
//       if (ratA < ratB) return -1
//       if (ratA > ratB) return 1
//     },
//   )

// case LOW_PRICE:
//   return products.sort((a, b) => a.price - b.price)
// case HIGH_PRICE:
//   return products.sort((a, b) => b.price - a.price)
