import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, Navigate } from 'react-router-dom'
import { notify } from '../../../redux/reducers/notificationSlice.js'
import { updatePost } from '../../../redux/reducers/postSlice.js'
import postService from '../../../services/post.js'
import errorMessage from '../../../utils/errorMessage.js'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'

const Edit = (props) => {
  const [ loading, setLoading ] = useState(false)
  const [ title, setTitle ] = useState('')
  const [ content, setContent ] = useState('')
  const location = useLocation()
  const post = location.state
  const { author } = useSelector(state => state.author)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    setTitle(post?.title)
    setContent(post?.content)
  }, [post])

  const handleChange = (ev) => {
    if(ev.target.name === 'title') {
      setTitle(ev.target.value)
    } else if(ev.target.name === 'content') {
      setContent(ev.target.value)
    }
  }
  const handleCancel = () => {
    navigate(-1)
  }
  const handleUpdate = async (ev) => {
    ev.preventDefault()
    const postData = {
      id: post.id,
      title, 
      content
    }
    try {
      setLoading(true) 
      const response = await postService.updatePost(postData, { token: author.token })
      dispatch(updatePost(response.data))
      navigate(-1)
    } catch (err) {
      const message = errorMessage(err)
      dispatch(notify({ ...message, _status: 'error' }))
    } finally {
      setLoading(false)
    }
  }
  if(!author) {
    return (
      <Navigate to={`/posts`} replace={true} />
    )
  }
  return (
    <Box sx={{ margin: '3rem auto', maxWidth: '60ch', border: '1px solid #ccc', padding: '1rem' }}>
      <Typography variant='h6' sx={{ textAlign: 'center' }}>Edit</Typography> 
      <Stack spacing={2} my={2} alignItems='center' component='form' onSubmit={handleUpdate}>
        <TextField
          required
          fullWidth
          name='title'
          size='small'
          label='Title'
          value={title}
          onChange={handleChange}
        />
        <TextField
          required
          fullWidth
          name='content'
          label='Content'
          multiline
          minRows={5}
          maxRows={8}
          placeholder='more'
          value={content}
          onChange={handleChange}
        />
        <LoadingButton 
          fullWidth
          type='submit' 
          variant='contained'
          loading={loading} 
          loadingIndicator={'Updating...'}
          sx={{ px: '3rem' }}
        >Update</LoadingButton>
        <Button onClick={handleCancel}>
          Cancel
        </Button>
      </Stack>
    </Box>
  );
};

export default Edit
