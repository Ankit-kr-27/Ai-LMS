import React from 'react'
import logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()
  return (
    <div className='bg-black text-gray-300 py-10 px-6'>

      <div className='max-w-7xl mx-auto flex lg:items-center items-start justify-center gap-[40px] lg:gap-[150px] flex-col lg:flex-row'>

        <div className='lg:w-[50%] w-[100%]'>
          <img src={logo} alt="" className='h-10 mb-3 border-1 rounded-[5px]' />
          <h2 className='text-xl font-bold text-white mb-3'>Class Sync</h2>
          <p className='text-sm'>Class Sync is a modern Learning management system to help you to grow your skill and knowledge and make your future bright with us and enhance your learning experience.</p>
        </div>

        <div className='lg:w-[30%] md:w-[100%]'>
          <div className=' font-semibold text-white mb-2'>Quick Links</div>
          <ul className='text-sm space-y-1'>
            <li className='hover:text-white cursor-pointer' onClick={() => navigate("/")}>Home</li>
            <li className='hover:text-white cursor-pointer' onClick={() => navigate("/allcourses")}>All Courses</li>
            <li className='hover:text-white cursor-pointer' onClick={() => navigate("/login")}>Login</li>
            <li className='hover:text-white cursor-pointer' onClick={() => navigate("/profile")}>My profile</li>
          </ul>
        </div>

        <div className='lg:w-[30%] md:w-[100%]'>
          <div className=' font-semibold text-white mb-2'>Categories</div>
          <ul className='text-sm space-y-1'>
            <li className='hover:text-white'>web development</li>
            <li className='hover:text-white'>app development</li>
            <li className='hover:text-white'>data science</li>
            <li className='hover:text-white'>machine learning</li>
          </ul>
        </div>
      </div>

      <div className='border-t border-gray-700 mt-10 pt-5 text-sm text-center text-gray-500'>© {new Date().getFullYear()} Class Sync. All rights reserved.</div>

    </div>
  )
}

export default Footer