import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'


import postService from './services/post.js'
import CssBaseline from '@mui/material/CssBaseline'
import Header from './components/Header/index.js'
import Footer from './components/Footer/index.js'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import { fetchPosts } from './redux/reducers/postSlice.js'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const getPosts = async () => {
      try {
        const posts = await postService.fetchPosts()
        dispatch(fetchPosts(posts.data))
      } catch (err) {
        /* handle error */
      }
    }

    getPosts()
  }, [])
  return (
    <>
      <CssBaseline />
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Container maxWidth='md' sx={{ overflowY: 'scroll', flex: 1}}>
          <Outlet />
        </Container>
        <Footer />
      </Box>
    </>
  );
}

export default App;
