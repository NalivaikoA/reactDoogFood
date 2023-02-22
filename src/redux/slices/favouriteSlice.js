import { createSlice } from '@reduxjs/toolkit'
import { initState } from '../initState'

const favouriteSlice = createSlice({
  name: 'favourite',
  initialState: initState.favourite,
  reducers: {
    deleteItemFromFavourite(state, action) {
      return state.filter((item) => item.id !== action.payload)
    },

    changeFavouriteItemIsChecked(state, action) {
      const currentItem = state.find((item) => item.id === action.payload)

      if (currentItem) {
        currentItem.isChecked = !currentItem.isChecked
      }
    },

    addItemInFavourite: {
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

    clearFavourite() {
      return []
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
  deleteItemFromFavourite,
  changeFavouriteItemIsChecked,
  addItemInFavourite,
  clearFavourite,
  selectAllItems,
  notSelectAllItems,
} = favouriteSlice.actions

export const getFavouriteSelector = (state) => state.favourite

export const favouriteReducer = favouriteSlice.reducer
