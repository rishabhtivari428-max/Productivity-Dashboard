import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './features/auth/context/AuthContext.jsx'
import { NotesProvider } from './features/auth/context/NotesContext.jsx'
import { ActivityProvider } from './features/auth/context/ActivityContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <NotesProvider>
          <ActivityProvider>
            <App />
          </ActivityProvider>
        </NotesProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
