import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authorService from '../../../services/author.js'
import errorMessage from '../../../utils/errorMessage.js'
import { notify } from '../../../redux/reducers/notificationSlice.js'
import { signup } from '../../../redux/reducers/authorSlice.js'

import LoadingButton from '@mui/lab/LoadingButton'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

const Signup = (props) => {
  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ loading, setLoading ] = useState(false)

  const dispatch = useDispatch()
  const handleSignup = async (ev) => {
    ev.preventDefault()
    const signupInfo = { name, email, password }
    try {
      setLoading(true)
      const response = await authorService.signup(signupInfo) 
      const { data } = response
      dispatch(notify({ message: data.message, _status: 'success' }))
      dispatch(signup(data.author))
      window.localStorage.setItem('author', data.author.token)
    } catch (err) {
      const { message } = errorMessage(err)
      dispatch(notify({ message, _status: 'error' }))
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (ev) => {
    if(ev.target.name == 'name') {
      setName(ev.target.value)
    } else if(ev.target.name == 'email') {
      setEmail(ev.target.value)
    } else if(ev.target.name === 'password') {
      setPassword(ev.target.value)
    }
  }
  return (
    <form onSubmit={handleSignup}>
      <Stack alignItems='center' spacing={1}>
        <Typography>S</Typography>
        <TextField size='small' name='name' autoFocus value={name} onChange={handleChange} />
        <TextField size='small' name='email' value={email}  onChange={handleChange} />
        <TextField type='password' name='password' size='small' value={password} onChange={handleChange} />
        <LoadingButton 
          type='submit' 
          variant='contained'
          loading={loading}
          loadingIndicator={'loading...'}
        >Signup</LoadingButton>
      </Stack>
    </form>
  );
};

export default Signup
