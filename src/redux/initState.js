import { TOKEN_LS_KEY_A } from './constants'

export const initState = {
  user: {
    group: '',
    name: '',
    email: '',
    token: '',
  },
  filter: {
    search: '',
  },
  cart: [],
}

export const getIniteState = () => {
  const dataFromLS = window.localStorage.getItem(TOKEN_LS_KEY_A)
  const preparedData = dataFromLS ? JSON.parse(dataFromLS) : initState
  console.log(preparedData)
  return preparedData
}
