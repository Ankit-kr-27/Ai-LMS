import React, { useState } from 'react'
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSelectedCourse } from '../redux/courseSlice'
import { useEffect } from 'react'
import img from "../assets/empty.jpg"

const ViewCourse = () => {
    const navigate = useNavigate()
    const {courseId} = useParams()
    const {courseData} = useSelector((state) => state.course)
    const {selectedCourse} = useSelector((state) => state.course)
    const dispatch = useDispatch()

    const fetchCourseData = async () => {
       courseData.map((course) => {
           if (course._id === courseId) {
               dispatch(setSelectedCourse(course))
               console.log(selectedCourse)

               return null
           }
       })
    }

    useEffect(() => {
        fetchCourseData()
    }, [courseData,courseId])

  return (
    <div className='min-h-screen bg-gray-50 p-6'>

        <div className='max-w-6xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6 relative'>
            
            {/* top section  */}
            <div className='flex flex-col md:flex-row gap-6'>

                {/* thumbnail */}
                <div className='w-full md:w-1/2'>
                <FaArrowLeft className='text-[black] w-[22px] h-[22px] cursor-pointer' onClick={() => navigate("/")}/>
                  {selectedCourse?.thumbnail ? <img src={selectedCourse?.thumbnail} alt=""  className='rounded-xl w-full object-cover'/> : <img src={img} alt="" className='rounded-xl w-full object-cover' />}
                </div>

                {/* course info */}
                <div className='flex-1 space-y-2 mt-[20px]'>
                  <h2 className='text-2xl font-bold'>{selectedCourse?.title}</h2>
                  <p className='text-gray-600'>{selectedCourse?.subtitle}</p>

                  <div className='flex items-start flex-col justify-between'>

                    <div className='text-yellow-500 font-medium flex gap-2'>
                      <span className='flex items-center justify-start gap-1'>{" "}5⭐</span>
                      <span className='text-gray-400 '>(1,200 reviews)</span>
                    </div>

                    <div >
                      <span className='text-lg font-semibold text-black'>₹ {selectedCourse?.price}</span>
                      <span className='text-gray-400 line-through text-sm'>₹ 599</span>
                    </div>

                    <ul className='text-sm text-gray-700 space-y-1 pt-2'>
                      <li>✅ 10+ Hours of video content</li>
                      <li>✅ Lifetime access to course materials</li>
                    </ul>

                    <button className='bg-black text-white px-6 py-2 rounded hover:bg-gray-700 mt-3 cursor-pointer'>Enroll Now</button>

                  </div>

                </div>

            </div>

            <div>
              <h2 className='text-xl font-semibold mb-2'>What you will learn</h2>
              <ul className='list-disc pl-6 text-gray-700 space-y-1'>
                <li>Learn {selectedCourse?.category} from Beginning</li>
              </ul>
            </div>


        </div>
    </div>
  )
}

export default ViewCourse