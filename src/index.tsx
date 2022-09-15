import { PopupProvider } from './hooks/usePopup'

import App from './App'
import { AuthProvider } from './hooks/useAuth'
import React from 'react'

import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import './styles/index.css'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <PopupProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </PopupProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
