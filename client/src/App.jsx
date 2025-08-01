import React, { useContext } from 'react'
import Home from './pages/Home'
import Room from './pages/Room'
import NotFound from './pages/NotFound'
import {Routes, Route, Navigate} from 'react-router-dom'
import  { AuthProvider } from '../context/AuthContext'
import LoginPage from './pages/LoginPage'
const App = () => {

  const { user } = useContext(AuthProvider);
  return (
    <Routes>
      <Route path="/" element={user ? <Home /> : <LoginPage />} />
      <Route path="/room/:roomID" element={user ? <Room /> : <LoginPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App