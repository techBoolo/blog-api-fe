import { Outlet } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import Header from './components/Header/index.js'
import Footer from './components/Footer/index.js'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

const App = () => {
  return (
    <>
      <CssBaseline />
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Container maxWidth='md' sx={{ overflowY: 'scroll', flex: 1}}>
          <Outlet />
        </Container>
        <Footer />
      </Box>
    </>
  );
}

export default App;
