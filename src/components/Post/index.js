import { Link as RouterLink } from 'react-router-dom'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

const Post = ({ post }) => {

  return (
    <Box>
    <Paper sx={{ p: 3, my: 3, pb: 1 }}>
      <Link component={RouterLink} to={`/posts/${post.id}`} color='inherit' underline='none' variant='h6'>
        { post.title }
      </Link>
      <Typography>{ post.content.substr(0, 150) } ...</Typography>
      <Stack alignItems='flex-end' mt={2}>
        <Link underline='hover' variant='body2' component={RouterLink} to={`/posts/${post.id}`}>more ...</Link>
        <Typography variant='caption'>{ post.author.name }</Typography>
        <Typography variant='caption'>
          { new Date(post.date).toLocaleString(undefined, { dateStyle: 'short' }) }
        </Typography>
        { post.date !== post.updatedAt && 
          <Typography variant='caption'>
            updated: { new Date(post.updatedAt).toLocaleString(undefined, { dateStyle: 'short' }) }
          </Typography> 
        }
      </Stack>
    </Paper>
    </Box>
  );
};

export default Post
