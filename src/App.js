import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'

import postService from './services/post.js'
import authorService from './services/author.js'
import errorMessage from './utils/errorMessage.js'

import CssBaseline from '@mui/material/CssBaseline'
import Header from './components/Header/index.js'
import Footer from './components/Footer/index.js'
import Notification from './components/Notification/index.js'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import { fetchPosts } from './redux/reducers/postSlice.js'
import { notify } from './redux/reducers/notificationSlice.js'
import { loginFromStorage } from './redux/reducers/authorSlice.js'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const verifyToken = async () => {
      const authorToken = window.localStorage.getItem('author')
      if(authorToken) {
        const response = await authorService.verifyToken({ authorToken })
        const { data } = response
        const userInfo = {
          token: authorToken,
          ...data
        }
        dispatch(loginFromStorage(userInfo))
      }
    }

    verifyToken()
  }, [])

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
