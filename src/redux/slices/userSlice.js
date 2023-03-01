import { createSlice } from '@reduxjs/toolkit'
import { initState } from '../initState'

const userSlice = createSlice({
  name: 'user',
  initialState: initState.user,
  reducers: {
    addToken(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.token = action.payload
    },
    addUserId(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.userId = action.payload
    },
  },
})

export const { addToken, addUserId } = userSlice.actions

export const userReducer = userSlice.reducer
