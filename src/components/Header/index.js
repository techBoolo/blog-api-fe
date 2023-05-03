import { Link as RouterLink, useMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'

const Header = (props) => {
  const { author } = useSelector(state => state.author)
  const isHome = useMatch('/')
  const isNewPost = useMatch('/posts/new')
  const isSigninPage = useMatch('/authors/signin')

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
      <Box>
        <Link component={RouterLink} to='/'>Lo</Link>
      </Box>
      <Box sx={{ display: 'flex', gap: '5px' }}>
      { !isHome && <Link component={RouterLink} to='/'>home /</Link> }
      { !author && !isSigninPage && <Link component={RouterLink} to='/authors/signin'>login /</Link> }
      { author && !isNewPost && <Link component={RouterLink} to='/posts/new'>add</Link> }
      </Box>
    </Box>
  );
};

export default Header
