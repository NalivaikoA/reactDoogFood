import { createContext } from 'react'

export const ContextApp = createContext()

export function ContextAppProvider({ children }) {
  console.log('Рендерится компонент ContextApp')
  const TOKEN_LS_KEY = 'TOKEN_LS_KEY'

  const getTokenFromLS = () => {
    const data = localStorage.getItem(TOKEN_LS_KEY)
    const preparedData = data ? JSON.parse(data) : []
    return preparedData
  }

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ContextApp.Provider value={{ TOKEN_LS_KEY, getTokenFromLS }}>
      {children}
    </ContextApp.Provider>
  )
}
