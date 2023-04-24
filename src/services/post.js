import axios from 'axios'
const backend_root_url = process.env.REACT_APP_BACKEND_ROOT_URL

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
} 

const fetchPosts = async () => {
  return await axios.get(`${backend_root_url}/posts`)
}
const fetchPost = async ({ id }) => {
  return await axios.get(`${backend_root_url}/posts/${id}`)
}

const createPost = async (newPost, { token }) => {
  config.headers.authentication = `bearer ${token}`
  return await axios.post(
    `${backend_root_url}/posts`, 
    newPost, 
    config
  )
}

const updatePost = async (updateData, { token }) => {
  config.headers.authentication = `bearer ${token}`
  return await axios.patch(
    `${backend_root_url}/posts/${updateData.id}`, 
    updateData, 
    config
  )
}

export default {
  fetchPosts,
  fetchPost,
  createPost,
  updatePost,
}
