import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import DialogProvider from './contexts/DialogProvider.jsx'
import UserProvider from './contexts/UserProvider.jsx'
import ToastProvider from './contexts/ToastProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <DialogProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </DialogProvider>
    </UserProvider>
  </StrictMode>,
)
