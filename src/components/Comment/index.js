import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import errorMessage from '../../utils/errorMessage.js'
import { notify } from '../../redux/reducers/notificationSlice.js'
import { removePostComment } from '../../redux/reducers/postSlice.js'
import commentService from '../../services/comment.js'

import CommentEdit from '../CommentEdit/'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

const Comment = ({ comment, edit, setEdit }) => {
  const [ anchorEl, setAnchorEl ] = useState(null)
  const open = Boolean(anchorEl)
  const { author } = useSelector(state => state.author)
  const dispatch = useDispatch()

  const openActionsMenu = (ev) => {
    setAnchorEl(ev.currentTarget)
  }
  const handleEdit = async (comment) => {
    setEdit({ show: true, id: comment.id })
    setAnchorEl(null)
  }
  const handleActionsClose = () => {
    setAnchorEl(null)
  }
  const handleDelete = async (comment) => {
    setAnchorEl(null)
    setEdit({ show: false, id: comment.id })
    try {
      const response = await commentService.deleteComment(
        { id: comment.id }, 
        { token: author.token}
      )      
      const { data } = response
      dispatch(removePostComment(data))
    } catch (err) {
      const { message } = errorMessage(err)
      dispatch(notify({ message, _status: 'error' }))
    } 
  }
  return (
    <>
      <Stack mb={2} py={1}>
        <Typography>{ comment.content }</Typography>
        {(author?.admin || ( author?.id === comment.author.id )) && 
          <IconButton 
            disableRipple
            sx={{ fontSize: '10px', alignSelf: 'start', borderRadius: '5px', padding: '2px',  mt: '1rem' }}
            onClick={openActionsMenu}
          >actions<ArrowDropDownIcon />
          </IconButton>
        }
        { (edit?.show && (edit.id === comment.id)) && 
            <CommentEdit comment={comment} edit={edit} setEdit={setEdit} /> 
        }
        <Box sx={{ alignSelf: 'flex-end', display: 'flex', flexDirection: 'column' }}>
          <Typography variant='caption'>{comment.author.name}</Typography>
          <Typography variant='caption'>
            {new Date(comment.date).toLocaleString('am-ET', { dateStyle: 'short' })}
            {' @'}
            {new Date(comment.date).toLocaleString('am-ET', { timeStyle: 'short', hour12: false })}
          </Typography>
          { comment.date !== comment.updatedAt && 
            <Typography variant='caption'> 
              updated:  
              { new Date(comment.updatedAt).toLocaleString('am-ET', { dateStyle: 'short' }) } 
              {' @'} 
              { new Date(comment.updatedAt).toLocaleString('am-ET', { timeStyle: 'short', hour12: false })}
            </Typography>
          }
        </Box>
        <Divider />
      </Stack>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleActionsClose}
      >
        <MenuItem dense divider onClick={() => handleEdit(comment)}>edit</MenuItem>
        <MenuItem dense sx={{ color: 'red'}} onClick={() => handleDelete(comment)}>delete</MenuItem>
      </Menu>
    </>
  );
};

export default Comment
