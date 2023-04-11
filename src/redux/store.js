import { configureStore } from '@reduxjs/toolkit'

import postReducer from './reducers/postSlice.js'

export default configureStore({
  reducer: {
    post: postReducer
  }
})
