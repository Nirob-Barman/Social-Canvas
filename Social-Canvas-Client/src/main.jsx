import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import AuthProvider from './Providers/AuthProvider'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { router } from './Routes/Routes'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <HelmetProvider>
        <RouterProvider router={router}/>
      </HelmetProvider>
    </AuthProvider>
  </React.StrictMode>,
)
