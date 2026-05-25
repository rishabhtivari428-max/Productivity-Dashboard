import React from 'react'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import Welcome from './features/auth/pages/Welcome'
import { Route, Routes } from 'react-router'
import Navbar from './features/auth/components/Navbar'
import Features from './features/auth/components/Features'
import Footer from './features/auth/components/Footer'
import Dashboard from './features/auth/pages/Dashboard'
import NotesPage from './features/auth/pages/NotesPage'
import ProtectedRoutes from './features/auth/routes/ProtectedRoutes'
import PomoTimer from './features/auth/pages/PomoTimer'
import ActivityPage from './features/auth/pages/ActivityPage'

const App = () => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-500/30 font-sans flex flex-col relative overflow-x-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/40 via-black to-black -z-10 pointer-events-none"></div>
      <Navbar />
      <Routes>
        <Route path='/' element={<> <Welcome /> <Features /> </>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/notes' element={<NotesPage />} />
        <Route path='/pomodoro' element={<PomoTimer />} />
        <Route path='/activity' element={<ActivityPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App