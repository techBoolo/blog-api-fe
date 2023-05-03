import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import errorMessage from '../../utils/errorMessage.js'
import { notify } from '../../redux/reducers/notificationSlice.js'
import { updatePostComment } from '../../redux/reducers/postSlice.js'
import commentService from '../../services/comment.js'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'

const CommentEdit = ({ comment, edit, setEdit }) => {
  const [ comm, setComm ] = useState(comment)
  const [ loading, setLoading ] = useState(false)
  const { author } = useSelector(state => state.author)
  const dispatch = useDispatch()

  const handleTextChange = (ev) => {
    if(ev.target.name === 'content') {
      setComm({...comm, content: ev.target.value })
    }
  }

  const updateComment = async (ev) => {
    ev.preventDefault()
    const { id, content } = comm
    try {
      setLoading(true)
      const response = await commentService.updateComment({ id, content }, { token: author.token}) 
      const { data } = response
      dispatch(updatePostComment(data))
      setEdit({})
    } catch (err) {
      const { message } = errorMessage(err)
      dispatch(notify({ message, _status: 'error' }))
    }finally {
      setLoading(false)
    }
  }
  const handleCancel = () => {
    setEdit({})
  }
  return (
    <Box component='form' onSubmit={updateComment} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <TextField
        name='content'
        multiline
        required
        size='small'
        minRows={2}
        maxRows={3}
        value={comm.content}
        onChange={handleTextChange}
      />
    <Box sx={{ }}>
      <LoadingButton 
        sx={{ my: '0.5rem', mr: '0.5rem', px: '1rem', textTransform: 'none' }} 
        size='small' 
        variant='outlined'
        loading={loading} 
        loadingIndicator='updating...'
        type='submit'
      >Update</LoadingButton>
      <Button onClick={handleCancel} sx={{ textTransform: 'none' }}>Cancel</Button>
    </Box>
    </Box>
  );
};

export default CommentEdit
