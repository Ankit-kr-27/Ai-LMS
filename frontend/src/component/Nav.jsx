import React, { useState } from 'react'
import logo from '../assets/logo.png'
import { IoPersonCircle } from "react-icons/io5";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';
import { setUserData } from '../redux/userSlice';
import { serverUrl } from '../App'
import { GiHamburgerMenu, GiCrossMark } from "react-icons/gi";

export const Nav = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showHam, setShowHam] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
      dispatch(setUserData(null))
      toast.success("Logout successfully")
      navigate("/login")
    } catch (error) {
      toast.error("Logout failed")
    }
  }

  // ✅ reusable avatar
  const Avatar = ({ size = 50 }) => (
    userData?.photoUrl ? (
      <img
        src={`${userData.photoUrl}?t=${Date.now()}`}
        className={`w-[${size}px] h-[${size}px] rounded-full object-cover border-2 border-white cursor-pointer`}
        onClick={() => setShow(prev => !prev)}
        alt="Profile"
      />
    ) : (
      <div
        className={`w-[${size}px] h-[${size}px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer`}
        onClick={() => setShow(prev => !prev)}
      >
        {userData?.name?.slice(0, 1)?.toUpperCase()}
      </div>
    )
  )

  return (
    <div>
      <div className='w-full h-[70px] fixed top-0 px-[20px] py-[20px] flex items-center justify-between bg-[#00000047] z-10'>

        {/* Logo */}
        <div className='lg:w-[20%] w-[40%] lg:pl-[50px]'>
          <img src={logo} alt="" className="w-[60px] rounded-[5px] border-2 border-white" onClick={() => navigate("/")}/>
        </div>

        {/* Desktop */}
        <div className='w-[30%] lg:flex items-center justify-center gap-4 hidden'>
          {!userData && (
            <IoPersonCircle
              className='w-[50px] h-[50px] fill-black cursor-pointer'
              onClick={() => setShow(prev => !prev)}
            />
          )}

          {userData && <Avatar />}

          {userData?.role === "educator" && (
            <div className='px-[20px] py-[10px] border-2 border-white text-white bg-black rounded-[10px] cursor-pointer' onClick={() => navigate("/dashboard")}>
              Dashboard
            </div>
          )}

          {!userData ? (
            <span
              className='px-[20px] py-[10px] border-2 border-white text-white rounded-[10px] cursor-pointer bg-[#000000d5]'
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          ) : (
            <span
              className='px-[20px] py-[10px] bg-white text-black rounded-[10px] cursor-pointer'
              onClick={handleLogout}
            >
              Logout
            </span>
          )}

          {show && (
            <div className='absolute top-[110%] right-[15%] flex flex-col gap-2 rounded-md bg-white px-[15px] py-[10px] border-2 border-black'>
              <span
                className='bg-black text-white px-[30px] py-[10px] rounded-2xl cursor-pointer'
                onClick={() => navigate("/profile")}
              >
                My Profile
              </span>
              <span className='bg-black text-white px-[30px] py-[10px] rounded-2xl cursor-pointer' onClick={() => navigate("/mycourses")}>
                My Courses
              </span>
            </div>
          )}
        </div>

        {/* Mobile */}
        <GiHamburgerMenu
          className='fill-white w-[30px] h-[30px] lg:hidden cursor-pointer'
          onClick={() => setShowHam(prev => !prev)}
        />

        <div className={`fixed top-0 left-0 w-screen h-screen bg-[#000000d6]
          flex flex-col items-center justify-center gap-5 z-10 lg:hidden
          transition-transform duration-500
          ${showHam ? "translate-x-0" : "-translate-x-full"}`}>

          <GiCrossMark
            className='w-[30px] h-[30px] fill-white absolute top-5 right-[4%] cursor-pointer'
            onClick={() => setShowHam(prev => !prev)}
          />

          {!userData && <IoPersonCircle className='w-[50px] h-[50px] fill-white' />}
          {userData && <Avatar size={50} />}

          <div
            className='w-[200px] h-[50px] bg-black text-white flex items-center justify-center rounded-[10px] cursor-pointer'
            onClick={() => navigate("/profile")}
          >
            My Profile
          </div>

          <div className='w-[200px] h-[50px] bg-black text-white flex items-center justify-center rounded-[10px] cursor-pointer' onClick={() => navigate("/mycourses")}>
            My Courses
          </div>

          {userData?.role === "educator" && (
            <div className='w-[200px] h-[50px] bg-black text-white flex items-center justify-center rounded-[10px] cursor-pointer' onClick={() => navigate("/dashboard")}>
              Dashboard
            </div>
          )}

          {!userData ? (
            <div
              className='w-[200px] h-[50px] bg-black text-white flex items-center justify-center rounded-[10px]'
              onClick={() => navigate("/login")}
            >
              Login
            </div>
          ) : (
            <div
              className='w-[200px] h-[50px] bg-black text-white flex items-center justify-center rounded-[10px]'
              onClick={handleLogout}
            >
              Logout
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
