import axios from 'axios'
const backend_root_url = process.env.REACT_APP_BACKEND_ROOT_URL
const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}
const createComment = async (newComment, { token }) => {
  config.headers.authentication = `bearer ${token}`
  return await axios.post(
    `${backend_root_url}/comments`,
    newComment,
    config
  )
}

const updateComment = async ({ id, content }, { token }) => {
  config.headers.authentication = `bearer ${token}`
  return await axios.patch(
    `${backend_root_url}/comments/${id}`,
    { content },
    config
  )
}

const deleteComment = async ({ id }, { token }) => {
  config.headers.authentication = `bearer ${token}`
  return await axios.delete(
    `${backend_root_url}/comments/${id}`,
    config
  )
}

export default {
  createComment,
  updateComment,
  deleteComment,
}
