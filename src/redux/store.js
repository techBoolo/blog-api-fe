import { configureStore } from '@reduxjs/toolkit'

import postReducer from './reducers/postSlice.js'
import notificationReducer from './reducers/notificationSlice.js'

export default configureStore({
  reducer: {
    post: postReducer,
    notification: notificationReducer,
  }
})
