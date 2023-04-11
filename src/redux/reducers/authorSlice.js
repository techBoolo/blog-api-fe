import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  author: null
}

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    signup: (state, action) => {
      state.author = action.payload
    }
  }
})

export const { signup } = authorSlice.actions

export default authorSlice.reducer

