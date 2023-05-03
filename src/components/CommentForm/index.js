import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import errorMessage from '../../utils/errorMessage.js'
import { notify } from '../../redux/reducers/notificationSlice.js'
import { addComment } from '../../redux/reducers/postSlice.js'
import commentService from '../../services/comment.js'

import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton'

const CommentForm = (props) => {
  const [ content, setContent ] = useState('')
  const [ loading, setLoading ] = useState(false)
  const params = useParams()
  const { id } = params
  const { author } = useSelector(state => state.author)
  const dispatch = useDispatch()

  const handleTextChange = (ev) => {
    if(ev.target.name === 'content') {
      setContent(ev.target.value)
    }
  }
  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const comment = {
      content,
      post_id:  id,
      author_id: author.id ,
    }
    try {
      setLoading(true)
      const response = await commentService.createComment(comment, { token: author.token }) 
      const { data } = response
      setContent('')
      dispatch(addComment(data))
    } catch (err) {
      const { message } = errorMessage(err)
      dispatch(notify({ message, _status: 'error' }))
    } finally {
      setLoading(false)
    }
  }
  return (
    <Stack my={2} sx={{ minWidth: '50%' }}>
      <Typography variant='body1'>Add comment:</Typography> 
      <Stack spacing={1} component='form' onSubmit={handleSubmit}>
        <TextField
          required
          fullWidth
          name='content'
          size='small'
          label='your comment'
          multiline
          minRows={3}
          maxRows={5}
          value={content}
          onChange={handleTextChange}
        />
        <LoadingButton 
          type='submit'
          size='small'
          variant='contained'
          loading={loading}
          loadingIndicator='submitting...'
          sx={{ px: '1rem', alignSelf: 'center' }}
        >add comment</LoadingButton>
      </Stack>
    </Stack>
  );
};

export default CommentForm
