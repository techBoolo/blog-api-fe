import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate, Link as RouterLink } from 'react-router-dom'
import authorService from '../../../services/author.js'
import errorMessage from '../../../utils/errorMessage.js'
import helpers from '../../../utils/helpers.js'
import { notify } from '../../../redux/reducers/notificationSlice.js'
import { saveUserInfo } from '../../../redux/reducers/authorSlice.js'

import LoadingButton from '@mui/lab/LoadingButton'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

const Signup = (props) => {
  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ loading, setLoading ] = useState(false)
  const { author } = useSelector(state => state.author)
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const handleSignup = async (ev) => {
    ev.preventDefault()
    const signupInfo = { name, email, password }
    try {
      setLoading(true)
      const response = await authorService.signup(signupInfo) 
      const { data } = response
      dispatch(notify({ message: data.message, _status: 'success' }))
      dispatch(saveUserInfo(data.author))
      helpers.saveToLocalStorage('author', data.author.token)
      navigate('/')
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

  if(author) {
    return <Navigate to={-1} replace={true} />
  }
  return (
    <Stack alignItems='center' mt={4} spacing={2}>
      <Typography variant='h6'>Signup</Typography>
      <Stack  onSubmit={handleSignup} component='form' alignItems='center' spacing={1}>
        <TextField 
          size='small' 
          name='name' 
          label='Name'
          autoFocus 
          value={name} 
          onChange={handleChange} 
        />
        <TextField 
          size='small' 
          name='email' 
          type='email'
          label='Email'
          required
          value={email}  
          onChange={handleChange} 
        />
        <TextField 
          type='password' 
          name='password' 
          label='Password'
          required
          size='small' 
          value={password} 
          onChange={handleChange} 
        />
        <LoadingButton 
          type='submit' 
          variant='contained'
          loading={loading}
          loadingIndicator={'loading...'}
          fullWidth
        >Signup</LoadingButton>
        <Link to='/authors/signin' component={RouterLink} sx={{ alignSelf: 'flex-end', fontSize: '12px'}}>
          Signin
        </Link>
      </Stack>
      </Stack>
  );
};

export default Signup
