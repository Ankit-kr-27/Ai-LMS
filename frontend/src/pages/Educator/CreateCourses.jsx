import React from 'react'
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import {serverUrl} from '../../App'
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

const CreateCourses = () => {
  const navigate = useNavigate()
  const [title , setTitle] = useState('')
  const [category , setCategory] = useState('')
  const [loading , setLoading] = useState(false)

  const handleCreateCourse = async()=>{
    setLoading(true)
    try {
      const result = await axios.post(serverUrl + '/api/course/create', {title , category},
        {withCredentials: true}
      )
      console.log(result.data)
      navigate("/courses")
      setLoading(false)
      toast.success("Course created successfully")

    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error(error.response.data.message)
    }
  }
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10'>
      <div className='max-w-xl w-[600px] mx-auto p-6 bg-white shadow-md rounded-md mt-10 relative'>
        < FaArrowLeft className='top-[8%] absolute left-[5%] w-[22px] h-[22px] h-[22px] cursor-pointer' onClick={()=>navigate("/courses")}/>
        <h2 className='text-2xl font-semibold text-center mb-6 text-center'>Create course</h2>

        <form className='space-y-5 'onSubmit = {(e)=>e.preventDefault()} >
          <div>
            <label htmlFor="title" className='block text-sm font-medium mb-1 text-gray-700'>Course Title</label>
            <input type="text" id='title' placeholder='enter course title' className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[black]' value={title} onChange={(e)=>setTitle(e.target.value)}/>
          </div>
          <div>
            <label htmlFor="cat" className='block text-sm font-medium mb-1 text-gray-700'>Course Category</label>
            <select id="cat" className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[black]' value={category} onChange={(e)=>setCategory(e.target.value)}>
              <option value="">Select Category</option>
              <option value="App dev">App dev</option>
              <option value="AI/ML"> AI/ML</option>
              <option value="Data Science">Data Science</option>
              <option value="AI Tools">AI Tools</option>
              <option value="Data Analytics">Data Analytics</option>
              <option value="Ethical Hacking">Ethical Hacking</option>
              <option value="Ui ux design">Ui ux design</option>
              <option value="Web Development">Web Development</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <button className='w-full bg-[black] text-white px-4 py-2 rounded hover:bg-gray-500 cursor-pointer'disabled={loading} onClick={handleCreateCourse}>{loading ? <ClipLoader size = {30} color = 'white'/> : "Create"}</button>
        </form>
      </div>
    </div>
  )
}

export default CreateCourses