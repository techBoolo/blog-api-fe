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
      state.posts = action.payload    
    },
    addPost: (state, action) => {
      state.posts.push(action.payload)
    },
  }
})

export const { fetchPosts, addPost } = postSlice.actions

export default postSlice.reducer

