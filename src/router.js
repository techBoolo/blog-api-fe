import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import App from './App.js'
import Home from './pages/Home/index.js'
import Author from './pages/Author/index.js'
import Signup from './pages/Author/Signup/index.js'
import Signin from './pages/Author/Signin/index.js'

import Post from './pages/Post/index.js'
import New from './pages/Post/New/index.js'
import ShowPost from './pages/Post/ShowPost/index.js'
import EditPost from './pages/Post/EditPost/index.js'

export default createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Home />} />
      <Route path='authors' element={<Author />}>
        <Route path='signup' element={<Signup />} />
        <Route path='signin' element={<Signin />} />
      </Route>
      <Route path='posts' element={<Post />}>
        <Route index element={<Home />} />
        <Route path='new' element={<New />} />
        <Route path=':id' element={<ShowPost />} />
        <Route path=':id/edit' element={<EditPost />} />
      </Route>
    </Route>
  )
)
