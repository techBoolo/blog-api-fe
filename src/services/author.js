import axios from 'axios'
const backend_root_url = process.env.REACT_APP_BACKEND_ROOT_URL

const url = `${backend_root_url}/authors`
const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}
const signup = async (signupInfo) => {
  return await axios.post(`${url}/signup`, signupInfo, config)
}

export default {
  signup
}
