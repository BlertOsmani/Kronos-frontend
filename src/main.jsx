import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TaskProvider from './contexts/TaskProvider.jsx'
import DialogProvider from './contexts/DialogProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DialogProvider>
      <TaskProvider>
          <App />
      </TaskProvider>
    </DialogProvider>
  </StrictMode>,
)
