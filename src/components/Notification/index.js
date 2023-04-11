import { useSelector } from 'react-redux'
import Stack from '@mui/material/Stack'

const Notification = (props) => {

  const { data } = useSelector(state => state.notification)
  if(data) {
    return (
      <Stack 
        alignItems='center' 
        sx={{ 
            backgroundColor: data._status == 'error' 
              ? '#fdbcbb' 
              : data._status == 'success' 
              ? '#d6fdbb' 
              : '#bbd7fd',
            padding: '7px' ,
            my: '10px'
        }}
      >
        { data.message }        
      </Stack>
    );
  }
};

export default Notification
