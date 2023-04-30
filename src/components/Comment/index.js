import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import CommentEdit from '../CommentEdit/'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Divider from '@mui/material/Divider'

const Comment = ({ comment, edit, setEdit }) => {
  const { author } = useSelector(state => state.author)

  const handleEdit = async (comment) => {
    setEdit({ show: true, id: comment.id })
  }
  return (
    <Stack mb={2} py={1}>
      <Typography>{ comment.content }</Typography>
      {  (author?.admin || ( author?.id === comment.author.id )) && 
        <Link component={Button} onClick={() => handleEdit(comment)} underline='none' variant='caption'
          sx={{ '&:hover': { backgroundColor: 'green' }, backgroundColor: 'green',  textTransform: 'none', padding: '0.1rem 0.0rem', color: 'white', alignSelf: 'start', mt: '1em' }}
        >edit</Link>
      }
      { (edit?.show && (edit.id === comment.id)) && 
          <CommentEdit comment={comment} edit={edit} setEdit={setEdit} /> 
      }
      <Box sx={{ alignSelf: 'flex-end', display: 'flex', flexDirection: 'column' }}>
        <Typography variant='caption'>{comment.author.name}</Typography>
        <Typography variant='caption'>
          {new Date(comment.date).toLocaleString('am-ET', { dateStyle: 'short' })} @ 
          {new Date(comment.date).toLocaleString('am-ET', { timeStyle: 'short', hour12: false })}
        </Typography>
        { comment.date !== comment.updatedAt && 
          <Typography variant='caption'> 
            updated:  { new Date(comment.updatedAt).toLocaleString('am-ET', { dateStyle: 'short' }) } @ { new Date(comment.updatedAt).toLocaleString('am-ET', { timeStyle: 'short', hour12: false })}
          </Typography>
        }
      </Box>
      <Divider />
    </Stack>
  );
};

export default Comment
