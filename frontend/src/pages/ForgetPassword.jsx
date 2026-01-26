import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import {serverUrl} from '../App'
import { ClipLoader } from 'react-spinners'

const ForgetPassword = () => {
  const [step, setStep] = useState(1)
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [conPassword, setConPassword] = useState('')
  const [loading, setLoading] = useState(false)

//for step 1
  const sendOtp = async () => {
    setLoading(true)
    try {
      const result = await axios.post(serverUrl + '/api/auth/sendotp', { email }, {withCredentials: true})
      console.log(result.data)
      setLoading(false)
      setStep(2)
      toast.success(result.data.message)

    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }


  //for step 2
  const verifyOtp = async () => {
    setLoading(true)
    try {
      const result = await axios.post(serverUrl + '/api/auth/verifyotp', { email, otp }, {withCredentials: true})
      console.log(result.data)
      setLoading(false)
      setStep(3)
      toast.success(result.data.message)

    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  //for step 3
  const resetPassword = async () => {
    setLoading(true)
    try {
      if(newPassword !== conPassword){
        toast.error('Passwords do not match')
        return
      }
      const result = await axios.post(serverUrl + '/api/auth/resetpassword', { email, newPassword }, {withCredentials: true})
      console.log(result.data)
      setLoading(false)
      navigate('/login')
      toast.success(result.data.message)

    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
      {/* step1 forgot passowrd page */}
       {step == 1 &&<div className='bg-white shadow-md rounded-xl p-8 max-w-md w-full'> 
        <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Forget your Password?</h2>
        <form className='space-y-4' onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="" className='block test-sm font-medium text-gray-700'>Enter your email address</label>
            <input id='email' type="text" className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[black]' placeholder='you@example.com' required onChange={(e) => setEmail(e.target.value)} value={email}/>
          </div>
          <button className = 'w-full bg-[black] hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer'disabled={loading} onClick={sendOtp}>{loading ? <ClipLoader size = {30} color = 'white'/> : "Send OTP"}</button>
        </form>
        <div className='text-sm text-center mt-4 cursor-pointer' onClick={() => navigate('/login')}>Back to Login</div>
        </div>}

       {/* step2  enter otp page*/}
       {step == 2 &&<div className='bg-white shadow-md rounded-xl p-8 max-w-md w-full'> 
        <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Enter OTP</h2>
        <form className='space-y-4' onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="otp" className='block test-sm font-medium text-gray-700'>Please enter the 4 digit code sent to your email</label>
            <input id='otp' type="text" className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[black]' placeholder='* * * *' required onChange={(e) => setOtp(e.target.value)} value={otp}/>
          </div>
          <button className = 'w-full bg-[black] hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer'disabled={loading} onClick={verifyOtp}>{loading ? <ClipLoader size = {30} color = 'white'/> : "Verify OTP"}</button>
        </form>
        <div className='text-sm text-center mt-4 cursor-pointer' onClick={() => navigate('/login')}>Back to Login</div>
        </div>}

       {/* step3 reset password page */}
       {step == 3 &&<div className='bg-white shadow-md rounded-xl p-8 max-w-md w-full'> 
        <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Reset Password</h2>
        <p className='text-sm text-gray-500 text-center mb-6'>Enter your new password</p>
        <form className='space-y-4' onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="password" className='block test-sm font-medium text-gray-700'>New Password</label>
            <input id='password' type="text" className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[black]' placeholder='********' required onChange={(e) => setNewPassword(e.target.value)} value={newPassword}/>
          </div>
          <div>
            <label htmlFor="password" className='block test-sm font-medium text-gray-700'>Confirm Password</label>
            <input id='password' type="text" className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[black]' placeholder='********' required onChange={(e) => setConPassword(e.target.value)} value={conPassword}/>
          </div>
          <button className = 'w-full bg-[black] hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer' onClick={resetPassword} disabled={loading}>{loading ? <ClipLoader size = {30} color = 'white'/> : "Reset Password"}</button>
        </form>
        <div className='text-sm text-center mt-4 cursor-pointer' onClick={() => navigate('/login')}>Back to Login</div>
        </div>}
    </div>
  )
}

export default ForgetPassword