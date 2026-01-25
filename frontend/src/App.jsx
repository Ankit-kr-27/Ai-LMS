import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import getCurrentUser from './customHooks/getCurrentUser'
export const serverUrl = "http://localhost:8000"
import Profile from './pages/Profile'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import ForgetPassword from './pages/ForgetPassword'

const App = () => {
  getCurrentUser()
  const { userData } = useSelector((state) => state.user);
  return (
    <>
    <ToastContainer />
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/signup" element={!userData ? <Signup/> : <Navigate to= {"/"}/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/profile" element={userData ? <Profile/> : <Navigate to= {"/signup"}/>} />
      <Route path="/forget" element={!userData ? <ForgetPassword/> : <Navigate to= {"/"}/>} />
    </Routes>
    </>
  )
}

export default App