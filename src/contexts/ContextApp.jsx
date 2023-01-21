import { createContext } from 'react'

export const ContextApp = createContext()

export function ContextAppProvider({ children }) {
  const SIGNUP_DATA_LS_KEY = 'SIGNUP_DATA_LS_KEY'

  const getTokenFromLS = () => {
    const data = localStorage.getItem(SIGNUP_DATA_LS_KEY)
    const preparedData = data ? JSON.parse(data) : []
    return preparedData
  }

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ContextApp.Provider value={{ SIGNUP_DATA_LS_KEY, getTokenFromLS }}>
      {children}
    </ContextApp.Provider>
  )
}
