import { createSlice } from '@reduxjs/toolkit'
// import { TOKEN_LS_KEY_A } from '../constants'
import { initState } from '../initState'

const userSlice = createSlice({
  name: 'user',
  initialState: initState.user,
  reducers: {
    addToken(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.token = action.payload
    },
  },
})

export const { addToken } = userSlice.actions

export const userReducer = userSlice.reducer
