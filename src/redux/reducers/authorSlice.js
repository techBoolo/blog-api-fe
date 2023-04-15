import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  author: null
}

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    saveUserInfo: (state, action) => {
      state.author = action.payload
    },
    loginFromStorage: (state, action) => {
      state.author = action.payload 
    }
  }
})

export const { saveUserInfo, loginFromStorage } = authorSlice.actions

export default authorSlice.reducer

