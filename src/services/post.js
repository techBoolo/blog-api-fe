import axios from 'axios'
const backend_root_url = process.env.REACT_APP_BACKEND_ROOT_URL

const fetchPosts = async () => {
  return await axios.get(`${backend_root_url}/posts`)
}

export default {
  fetchPosts,
}
