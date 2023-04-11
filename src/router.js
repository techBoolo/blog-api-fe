import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import App from './App.js'
import Home from './pages/Home/index.js'
import Author from './pages/Author/index.js'
import Signup from './pages/Author/Signup/index.js'

export default createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Home />} />
      <Route path='authors' element={<Author />}>
        <Route path='signup' element={<Signup />} />
      </Route>
    </Route>
  )
)
