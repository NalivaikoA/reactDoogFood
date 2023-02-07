import { createSlice } from '@reduxjs/toolkit'
import { initState } from '../initState'

const cartSlice = createSlice({
  name: 'cart',
  initialState: initState.cart,
  reducers: {

    deleteItemFromCart(state, action) {
      return state.filter((cartItem) => cartItem.id !== action.payload)
    },

    addItemInCart: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(id) {
        return {
          payload: {
            id,
            count: 1,
            isChecked: false,
          },
        }
      },
    },
  },
})

export const { deleteItemFromCart, addItemInCart } = cartSlice.actions

export const getCartSelector = (state) => state.cart

export const cartReducer = cartSlice.reducer
