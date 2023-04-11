import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'

import postService from './services/post.js'
import errorMessage from './utils/errorMessage.js'

import CssBaseline from '@mui/material/CssBaseline'
import Header from './components/Header/index.js'
import Footer from './components/Footer/index.js'
import Notification from './components/Notification/index.js'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import { fetchPosts } from './redux/reducers/postSlice.js'
import { notify } from './redux/reducers/notificationSlice.js'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const getPosts = async () => {
      try {
        const posts = await postService.fetchPosts()
        dispatch(fetchPosts(posts.data))
      } catch (err) {
        const { message } = errorMessage(err)
        dispatch(notify({message, _status: 'error' }))
      }
    }

    getPosts()
  }, [])
  return (
    <>
      <CssBaseline />
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Notification />
        <Container maxWidth='md' sx={{ overflowY: 'scroll', flex: 1}}>
          <Outlet />
        </Container>
        <Footer />
      </Box>
    </>
  );
}

export default App;
