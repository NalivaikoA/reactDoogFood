import { configureStore } from '@reduxjs/toolkit'
import { TOKEN_LS_KEY_A } from './constants'
import { getIniteState } from './initState'
// import { TOKEN_LS_KEY } from './constants'
import { filterReducer } from './slices/filterSlice'
import { userReducer } from './slices/userSlice'

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    user: userReducer,
  },
  preloadedState: getIniteState(),
})

console.log(store.getState())

store.subscribe(() => {
  window.localStorage.setItem(TOKEN_LS_KEY_A, JSON.stringify(store.getState()))
})
