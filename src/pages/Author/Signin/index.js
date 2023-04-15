import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink, useNavigate, Navigate } from 'react-router-dom'
import authorService from '../../../services/author.js'
import errorMessage from '../../../utils/errorMessage.js'
import helpers from '../../../utils/helpers.js'
import { notify } from '../../../redux/reducers/notificationSlice.js'
import { saveUserInfo } from '../../../redux/reducers/authorSlice.js'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton'
import Link from '@mui/material/Link'

const Signin = (props) => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ loading, setLoading ] = useState(false)

  const { author } = useSelector(state => state.author)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSignin = async (ev) => {
    ev.preventDefault()
    const signinInfo = {
      email,
      password
    }
    try {
      setLoading(true)
      const response = await authorService.signin(signinInfo)
      const userInfo = response.data
      const { token } = userInfo
      dispatch(saveUserInfo(userInfo))
      helpers.saveToLocalStorage('author', token)
      navigate('/')
    } catch (err) {
      const { message } = errorMessage(err)
      dispatch(notify({ message, _status: 'error'}))
    } finally {
      setLoading(false)
    }
  }

  const handleTextChange = (ev) => {
    if(ev.target.name === 'email') {
      setEmail(ev.target.value)
    } else if(ev.target.name === 'password') {
      setPassword(ev.target.value)
    }
  }

  if(author) {
    return <Navigate to={-1} replace={true} />
  }
  return (
    <Stack alignItems='center' mt={2} spacing={2}>
      <Typography variant='h6'>Signin</Typography> 
      <Stack component='form' onSubmit={handleSignin} spacing={1}>
        <TextField
          name='email'
          type='email'
          required
          autoFocus
          size='small'
          label='Email'
          onChange={ handleTextChange }
        />
        <TextField
          name='password'
          type='password'
          required
          size='small'
          label='Password'
          onChange={ handleTextChange }
        />
        <LoadingButton 
          variant='contained' 
          type='submit'
          loading={loading}
          loadingIndicator='loading...'
        >Signin</LoadingButton>
        <Link 
          component={RouterLink} 
          to='/authors/signup' 
          sx={{ alignSelf: 'flex-end', fontSize: '12px' }}
        >Signup</Link>
      </Stack>
    </Stack>
  );
};

export default Signin
