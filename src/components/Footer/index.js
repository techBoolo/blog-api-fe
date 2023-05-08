import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const year = new Date().getFullYear()
const Footer = (props) => {

  return (
    <Box sx={{ color: '#ccc', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'center', padding: '10px', alignItems: 'center' }}> 
      <Typography>
        &copy; boo.et
      </Typography> 
      <Typography sx={{ pl: '5px' }}>
        { year }
      </Typography>
    </Box>
  );
};

export default Footer
