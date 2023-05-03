import { Outlet, Link as RouterLink, useMatch } from 'react-router-dom'
import Link from '@mui/material/Link'

const Author = (props) => {
  const match = useMatch('/authors')
  console.log(match);
  return (
    <>
      { match && <Link component={RouterLink} to='/authors/signin'>signin</Link> }
      <Outlet />
    </>
  );
};

export default Author
