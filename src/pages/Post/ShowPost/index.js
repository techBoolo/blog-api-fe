import { useParams, Link as RouterLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Box  from '@mui/material/Box'
import Typography  from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Link from '@mui/material/Link'

const Show = (props) => {
  const params = useParams()
  const { id } = params
  const { author } = useSelector(state => state.author)
  const post = useSelector(state => state.post.posts.find(p => p.id === id))

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
          { new Date(post.date).toLocaleString(undefined, { dateStyle: 'short' }) }
        </Typography>
        { post.date !== post.updatedAt && 
          <Typography variant='caption'>
            updated: { new Date(post.updatedAt).toLocaleString(undefined, { dateStyle: 'short' }) }
          </Typography> 
        }
        { post.author_id === author?.id && 
            <Link sx={{ alignSelf: 'flex-start', backgroundColor: 'green', borderRadius: '5px', padding: '0.1rem 0.6rem', color: 'white' }} underline='none' variant='caption' component={RouterLink} to={`/posts/${post.id}/edit`}>edit</Link>
        }
      </Stack>
      <Typography variant='h6' sx={{  textAlign: 'center', mb: '1rem' }}>{ post.title }</Typography>
      <Typography variant='body1' >{ post.content }</Typography>
    </Box>
  );
};

export default Show
