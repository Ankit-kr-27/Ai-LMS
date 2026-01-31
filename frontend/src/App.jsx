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
import EditProfile from './pages/EditProfile'
import Dashboard from './pages/Educator/Dashboard'
import Courses from './pages/Educator/Courses'
import CreateCourses from './pages/Educator/CreateCourses'
import getCreatorCourse from './customHooks/getCreatorCourse'
import EditCourse from './pages/Educator/EditCourse'
import getPublishedCourse from './customHooks/getPublishedCourse'
import AllCourses from './pages/AllCourses'

const App = () => {
  getCurrentUser()
  getCreatorCourse()
  getPublishedCourse()
  const { userData } = useSelector((state) => state.user);
  return (
    <>
    <ToastContainer />
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/signup" element={!userData ? <Signup/> : <Navigate to= {"/"}/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/profile" element={userData ? <Profile/> : <Navigate to= {"/signup"}/>} />
      <Route path="/forget" element={userData ? <ForgetPassword/> : <Navigate to= {"/"}/>} />
      <Route path="/editprofile" element={userData ? <EditProfile/> : <Navigate to= {"/"}/>} />
      <Route path="/dashboard" element={userData ?.role === "educator" ? <Dashboard/> : <Navigate to= {"/signup"}/>} />
      <Route path="/courses" element={userData ?.role === "educator" ? <Courses/> : <Navigate to= {"/signup"}/>} />
      <Route path="/createcourse" element={userData ?.role === "educator" ? <CreateCourses/> : <Navigate to= {"/signup"}/>} />
      <Route path="/editcourse/:courseId" element={userData ?.role === "educator" ? <EditCourse/> : <Navigate to= {"/signup"}/>} />
      <Route path="/allcourses" element={userData ? <AllCourses/> : <Navigate to= {"/"}/>} />
    </Routes>
    </>
  )
}

export default App