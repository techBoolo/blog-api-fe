import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  posts: []
}

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    fetchPosts: (state, action) => {

    }
  }
})

export const { fetchPosts } = postSlice.actions

export default postSlice.reducer

