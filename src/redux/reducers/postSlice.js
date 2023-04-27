import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  posts: [],
  post: null
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
    updatePost: (state, action) => {
      state.posts = state.posts.map(post => post.id === action.payload.id ? action.payload : post)
    },
    removePost: (state, action) => {
      state.posts = state.posts.filter(post => post.id !== action.payload.id)
    },
    setPost: (state, action) => {
      state.post = action.payload
    }
  }
})

export const { fetchPosts, addPost, updatePost, removePost ,
  setPost,
} = postSlice.actions

export default postSlice.reducer

