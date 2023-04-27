import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const Comment = ({ comment }) => {

  return (
    <Stack>
      <Typography>{ comment.content }</Typography>
      <Box sx={{ alignSelf: 'flex-end' }}>
        <Typography>{comment.author.name}</Typography>
        <Typography>{new Date(comment.date).toLocaleString('am-ET', { dateStyle: 'short' })}</Typography>
        { comment.date !== comment.updatedAt && 
          <Typography variant='caption'> 
            updated: 
            { new Date(comment.updatedAt).toLocaleString('am-ET', { dateStyle: 'short' }) }
            @ { new Date(comment.updatedAt).toLocaleString('am-ET', { timeStyle: 'short', hour12: false })}
          </Typography>
        }
      </Box>
    </Stack>
  );
};

export default Comment
