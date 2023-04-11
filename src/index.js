import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom'
import router from './router';
import { Provider as ReduxStoreProvider } from 'react-redux'
import store from './redux/store.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ReduxStoreProvider store={store}>
      <RouterProvider router={router} />
    </ReduxStoreProvider>
  </React.StrictMode>
);

