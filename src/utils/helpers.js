const saveToLocalStorage = (key, value) => {
  window.localStorage.setItem(key, value)
}

const removeFromLocalStorage = (key) => {
  window.localStorage.removeItem(key)
}

export default {
  saveToLocalStorage,
  removeFromLocalStorage,
}
