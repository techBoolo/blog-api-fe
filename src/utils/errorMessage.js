export default (error) => {
  if(error && error.response && error.response.data) {
    return error.response.data.error
  } else if(error.request && error.request.statusText) {
    return error.request.statusText
  } else {
    return error
  }
}
