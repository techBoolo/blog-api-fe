import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import App from './App.js'
import Home from './pages/Home/index.js'

export default createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Home />} />
    </Route>
  )
)
