import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Navigate } from 'react-router-dom'
import { notify } from '../../../redux/reducers/notificationSlice.js'
import { addPost } from '../../../redux/reducers/postSlice.js'
import postService from '../../../services/post.js'
import errorMessage from '../../../utils/errorMessage.js'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton'

const NewPost = (props) => {
  const [ loading, setLoading ] = useState(false)
  const [ title, setTitle ] = useState('')
  const [ content, setContent ] = useState('')
  const { author } = useSelector(state => state.author)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handlePost = async (ev) => {
    ev.preventDefault()
    const newPost = {
      title,
      content
    }

    try {
      setLoading(true)
      const response = await postService.createPost(newPost, { token: author.token }) 
      const { data } = response
      dispatch(addPost(data))
      navigate('/posts')
    } catch (err) {
      const { message } = errorMessage(err)
      dispatch(notify({ message, _status: 'error' }))
    } finally {
      setLoading(false)
    }
  }

  const handleTextChange = (ev) => {
    if(ev.target.name === 'title') {
      setTitle(ev.target.value)
    } else if(ev.target.name === 'content') {
      setContent(ev.target.value)
    }
  }

  if(!author) {
    return (
      <Navigate to='/' replace={true} />
    )
  }

  return (
    <Box sx={{ 
      maxWidth: '60ch', 
        border: '1px solid #ccc', 
        padding: '1rem',
        margin: '3rem auto'
      }}
    >
      <Typography variant='h6' sx={{ textAlign: 'center' }}>Compose</Typography>
      <Box sx={{ my: '1rem'}} component='form' onSubmit={handlePost}>
        <TextField
          autoFocus
          required
          fullWidth
          name='title'
          size='small'
          margin='dense'
          label='Title'
          onChange={handleTextChange}
        />
        <TextField
          required
          fullWidth
          name='content'
          size='small'
          margin='dense'
          label='Content'
          multiline
          minRows={5}
          maxRows={8}
          placeholder='more'
          onChange={handleTextChange}
        />
        
        <Box sx={{ mt: '0.5rem', display: 'flex', justifyContent: 'end' }}>
          <LoadingButton 
            type='submit'
            variant='contained' 
            loading={loading}
            loadingIndicator={'Submitting...'}
            sx={{ px: '3rem' }}
          >Post</LoadingButton>
        </Box>
      </Box>
    </Box>
  );
};

export default NewPost
