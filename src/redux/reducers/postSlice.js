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
    },
    addComment: (state, action) => {
      state.post.comments.push(action.payload)
    },
    updatePostComment: (state, action) => {
      state.post.comments = state.post.comments.map(comment => {
        if(comment.id == action.payload.id) {
          return action.payload
        } else {
          return comment
        }
      })
    },
    removePostComment: (state, action) => {
      state.post.comments = state.post.comments.filter(comment => {
        return comment.id !== action.payload.id
      })
    },
  }
})

export const { fetchPosts, addPost, updatePost, removePost ,
  setPost,
  addComment,
  updatePostComment,
  removePostComment,
} = postSlice.actions

export default postSlice.reducer

