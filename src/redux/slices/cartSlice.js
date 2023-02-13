import { createSlice } from '@reduxjs/toolkit'
import { initState } from '../initState'

const cartSlice = createSlice({
  name: 'cart',
  initialState: initState.cart,
  reducers: {
    deleteItemFromCart(state, action) {
      return state.filter((cartItem) => cartItem.id !== action.payload)
    },

    changeItemIsChacked(state, action) {
      const currentItem = state.find((item) => item.id === action.payload)

      if (currentItem) {
        currentItem.isChecked = !currentItem.isChecked
      }
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
            isChecked: true,
          },
        }
      },
    },

    clearCart() {
      return []
    },

    itemIncrement(state, action) {
      return state.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            count: item.count + 1,
          }
        }
        return item
      })
    },

    itemDecrement(state, action) {
      return state.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            count: item.count - 1,
          }
        }
        return item
      })
    },

    selectAllItems(state) {
      return state.map((el) => ({
        ...el,
        isChecked: true,
      }))
    },

    notSelectAllItems(state) {
      return state.map((el) => ({
        ...el,
        isChecked: false,
      }))
    },

  },
})

export const {
  deleteItemFromCart,
  addItemInCart,
  clearCart,
  itemIncrement,
  itemDecrement,
  changeItemIsChacked,
  selectAllItems,
  notSelectAllItems,
} = cartSlice.actions

export const getCartSelector = (state) => state.cart

export const cartReducer = cartSlice.reducer
