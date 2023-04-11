import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  data: null
}

export const notify = createAsyncThunk(
  'notification/notify',
  async (params, thunkAPI) => {
    setTimeout(() => {
      thunkAPI.dispatch(resetNotification())
    }, 5000)
    return params
  }
)

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    resetNotification: (state) => {
      state.data = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(notify.fulfilled, (state, action) => {
        state.data = action.payload
      })
  }
})

export const { resetNotification } = notificationSlice.actions

export default notificationSlice.reducer
