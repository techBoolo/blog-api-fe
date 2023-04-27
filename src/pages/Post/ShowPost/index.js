import { useState, useEffect } from 'react'
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import errorMessage from '../../../utils/errorMessage.js'
import postService from '../../../services/post.js'
import { notify } from '../../../redux/reducers/notificationSlice.js'
import { removePost, setPost } from '../../../redux/reducers/postSlice.js'

import DialogComp from '../../../components/DialogComp/index.js'
import Comment from '../../../components/Comment/'
import Box  from '@mui/material/Box'
import Button  from '@mui/material/Button'
import Typography  from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Link from '@mui/material/Link'

const Show = (props) => {
  const [ showDialog, setShowDialog ] = useState(false)
  const params = useParams()
  const { id } = params
  const { author } = useSelector(state => state.author)
  const { post } = useSelector(state => state.post)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await postService.fetchPost({ id })
        const { data } = response
        dispatch(setPost(data)) 
      } catch (err) {
        const { message } = errorMessage(err)
        dispatch(notify({ message, _status: 'error' }))
      }
    }
    getPost()
  }, [])
  const handleDelete = () => {
    setShowDialog(true)
  }
  const handleConfirm = async () => {
     try {
       const response = await postService.deletePost({ id, token: author.token }) 
       dispatch(removePost({ id: response.data.id }))
       navigate('/posts')
     } catch (err) {
       const { message } = errorMessage(err)
       dispatch(notify({ message, _status: 'error' }))
     }finally {
      setShowDialog(false)
     }
  }
  const handleCancel = () => {
    setShowDialog(false)
  }

  if(!post) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: '2rem'}}>
        <Typography variant='h6'>Nothing found.</Typography>
      </Box>
    )
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Stack mb={2}>
        <Typography variant='caption'>{ post.author.name }</Typography>
        <Typography variant='caption'>
          { new Date(post.date).toLocaleString('am-ET', { dateStyle: 'short' }) }
        </Typography>
        { post.date !== post.updatedAt && 
          <Typography variant='caption'>
            updated: { new Date(post.updatedAt).toLocaleString('am-ET', { dateStyle: 'short', timeStyle: 'short', hour12: false }) }
          </Typography> 
        }
        <Box sx={{ display: 'flex', gap: '5px'}}>
        { (post.author_id === author?.id || author?.admin ) && 
            <Link sx={{ backgroundColor: 'green', borderRadius: '5px', padding: '0.1rem 0.6rem', color: 'white' }} underline='none' variant='caption' state={ post } component={RouterLink} to={`/posts/${post.id}/edit`}>edit</Link>
        }
        { author?.admin && 
            <Link sx={{ '&:hover': { backgroundColor: 'red' }, textTransform: 'none', backgroundColor: 'red', borderRadius: '5px', padding: '0.1rem 0rem', color: 'white' }} underline='none' variant='caption' component={Button} onClick={handleDelete}>delete</Link>
        }
        </Box>
      </Stack>
      <Typography variant='h6' sx={{  textAlign: 'center', mb: '1rem' }}>{ post.title }</Typography>
      <Typography variant='body1' >{ post.content }</Typography>
      { /* add new comment form */ }

      {/* comment */}
        <Box sx={{ my: '1rem', borderTop: '1px solid #ccc', pt: '1rem'  }}>
          {
            post.comments.length > 0 
            ?  <Typography sx={{ mb: '1rem' }}>comments:</Typography>
            : <Typography>no comment yet, </Typography>
          }
          {
            post.comments.map(comment => (
              <Comment comment={comment} />
            ))
          }
        </Box>

      { /* delete confirmation dialog */ }
      <DialogComp 
        show={showDialog} 
        setShow={setShowDialog} 
        title={'Delete confirmation'}
        content={'Confirm delete operation'}
        text1={'Delete'}
        text2={'Cancel'}
        handleText1={handleConfirm}
        handleText2={handleCancel}
      />
    </Box>
  );
};

export default Show
