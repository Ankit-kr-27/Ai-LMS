import React from 'react'
import logo from '../assets/logo.png'
import { IoPersonCircle } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { serverUrl } from '../App'
import { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { GiCrossMark } from "react-icons/gi";



export const Nav = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showHam, setShowHam] = useState(false);

  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
      dispatch(setUserData(null))
      toast.success("Logout successfully")
      navigate("/login")
    } catch (error) {
      toast.error("Logout failed")
      toast.error(error.response.data.message)
    }
  }
  return (
    <div>
      <div className='w-[100%] h-[70px] fixed top-0 px-[20px] py-[20px] flex items-center justify-between bg-[#00000047] z-10'>
        <div className='lg:w-[20%] w-[40%] lg:pl-[50px]'>
          <img src={logo} alt="" className="w-[60px] rounded-[5px] border-2 border-white " />
        </div>
        <div className='w-[30%] lg:flex items-center justify-center justify-center gap-4 hidden'>
          {!userData && <IoPersonCircle className='w-[50px] h-[50px] fill-black cursor-pointer' onClick={() => setShow(prev => !prev)} />}

          {userData && <div className='w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer' onClick={() => setShow(prev => !prev)}>
            {userData?.name?.slice(0, 1)?.toUpperCase()}
          </div>}

          {userData?.role === "educator" && <div className='px-[20px] py-[10px] border-2 lg:border-white border-black lg:text-white bg-[black] rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer'>Dashboard</div>}

          {!userData ? <span className='px-[20px] py-[10px] border-2 border-white text-white rounded-[10px] text-[18px] font-light cursor-pointer bg-[#000000d5]' onClick={() => navigate("/login")}>Login</span> : <span className='px-[20px] py-[10px] bg-white text-black rounded-[10px] shadow-sm shadow-black text-[18px] cursor-pointer' onClick={handleLogout}>Logout</span>}
          {show && <div className='absolute top-[110%] right-[15%] flex items-center flex-col justify-center gap-2 text-[16px] rounded-md bg-[white] px-[15px] py-[10px] border-[2px] border-black hover:border-white hover:text-white cursor-pointer hover:bg-black'>
            <span className='bg-[black] text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600' onClick={() => navigate("/profile")}>My Profile</span>
            <span className='bg-[black] text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600'>My Courses</span>
          </div>}

        </div>
        <GiHamburgerMenu className='w-[30px] h-[30px] lg:hidden fill-black cursor-pointer' onClick={() => setShowHam(prev => !prev)} />

        <div className={`fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#000000d6]
  flex items-center justify-center flex-col gap-5 z-10 lg:hidden
  transition-transform duration-500 ease-in-out
  ${showHam ? "translate-x-0" : "-translate-x-full"}`}>
          <GiCrossMark className='w-[30px] h-[30px] fill-white absolute top-5 right-[4%] cursor-pointer' onClick={() => setShowHam(prev => !prev)} />
            {!userData && <IoPersonCircle className='w-[50px] h-[50px] fill-black cursor-pointer' />}

          {userData && <div className='w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer' >
            {userData?.name?.slice(0, 1)?.toUpperCase()}
          </div>}
          <div className='w-[200px] h-[50px] border-2 border-white border-black text-white bg-[black] flex items-center justify-center rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer' onClick={() => navigate("/profile")}>My profile</div>

          <div className='w-[200px] h-[50px] border-2 border-white border-black text-white bg-[black] flex items-center justify-center rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer'>My Courses</div>

          {userData?.role === "educator" && <div className='w-[200px] h-[50px] border-2 border-white border-black text-white bg-[black] flex items-center justify-center rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer'>Dashboard</div>}

          {!userData ? <span className='w-[200px] h-[50px] border-2 border-white border-black text-white bg-[black] flex items-center justify-center rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer' onClick={() => navigate("/login")}>Login</span> : <span className='w-[200px] h-[50px] border-2 border-white border-black text-white bg-[black] flex items-center justify-center rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer' onClick={handleLogout}>Logout</span>}

        </div>
      </div>
    </div>
  )
}
