import React, { useState } from 'react'
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSelectedCourse } from '../redux/courseSlice'
import { useEffect } from 'react'
import img from "../assets/empty.jpg"
import { IoIosPlayCircle } from "react-icons/io";
import { CiLock } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import axios from "axios"
import { serverUrl } from '../App'
import Card from '../component/Card';
import { toast } from 'react-toastify';

const ViewCourse = () => {
    const navigate = useNavigate()
    const {courseId} = useParams()
    const {courseData} = useSelector((state) => state.course)
    const {selectedCourse} = useSelector((state) => state.course)
    const {userData} = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [selectedLecture,setSelectedLecture] = useState(null)
    const [creatorData, setCreatorData] = useState(null)
    const [creatorCourses, setCreatorCourses] = useState([])
    const [isEnrolled, setIsEnrolled] = useState(false)

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

        const handleCreator = async () => {
          if(selectedCourse?.creator){
            try {
              const result = await axios.post(serverUrl + "/api/course/creator", {userId: selectedCourse?.creator}, {withCredentials: true})
              console.log(result.data)
              setCreatorData(result.data)
            } catch (error) {
              console.log(error)
            }
          }
        }
        handleCreator()
    }, [selectedCourse])


    const checkEnrollment = ()=>{
      const verify = userData?.enrolledCourses?.some (c => (typeof c === "string" ? c : c._id).toString() === courseId?.toString())
      if(verify){
        setIsEnrolled(true)
      }
    }

    useEffect(() => {
        fetchCourseData()
        checkEnrollment()
    }, [courseData,courseId,userData])


    useEffect(() => {
      if(creatorData?._id && courseData.length > 0){
        const creatorCourse = courseData.filter((course) => course.creator === creatorData._id && course._id !== courseId)
        setCreatorCourses(creatorCourse)
      }
    }, [creatorData, courseData])

    const handleEnroll = async (userId, courseId) => {
  try {
    const orderData = await axios.post(
      serverUrl + "/api/order/razorpay-order",
      { courseId },
      { withCredentials: true }
    );

    console.log("BACKEND RESPONSE:", orderData.data);

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: orderData.data.amount,          
      currency: "INR",
      name: "ClassSync",
      description: "Payment for course",
      order_id: orderData.data.orderId,       
      handler: async function (response) {
        console.log("PAYMENT RESPONSE:", response);

      try {
        const verifyPayment = await axios.post(serverUrl + "/api/order/verifypayment", {...response, courseId, userId}, {withCredentials: true})
        setIsEnrolled(true)
        toast.success(verifyPayment.data.message)
        console.log(verifyPayment.data)
        
      } catch (error) {
        toast.error(error.response.data.message)
      }
      }
      
    };

    console.log("RAZORPAY ORDER ID:", options.order_id); 

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (error) {
    console.log(error);
    toast.error("something went wrong while enrolling")
  }
};


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

                    {!isEnrolled ? <button className='bg-black text-white px-6 py-2 rounded hover:bg-gray-700 mt-3 cursor-pointer' onClick={() => handleEnroll(userData?._id , courseId)}>Enroll Now</button> : <button className='bg-green-100 text-green-500 px-6 py-2 rounded hover:bg-gray-700 mt-3 cursor-pointer'>Watch Now</button> }

                  </div>

                </div>

            </div>

            <div>
              <h2 className='text-xl font-semibold mb-2'>What you will learn</h2>
              <ul className='list-disc pl-6 text-gray-700 space-y-1'>
                <li>Learn {selectedCourse?.category} from Beginning</li>
              </ul>
            </div>

            <div>
              <h2 className='text-xl font-semibold mb-2'>Who this course is for</h2>
              <p className='text-gray-700'>Beginners, aspiring developers and professionals looking to upskill in {selectedCourse?.category}</p>
            </div>

            <div className='flex flex-col md:flex-row gap-6'>

              <div className='bg-white w-full md:w-2/5 p-6 rounded-2xl shadow-lg border border-gray-200'>
              <h2 className='text-xl font-bold mb-1 text-gray-800'>Course Curriculum</h2>
              <p className='text-sm text-gray-500 mb-4'>
                {selectedCourse?.lectures?.length} lectures
              </p>

              <div className='flex flex-col gap-3'>
                {selectedCourse?.lectures?.map((lecture,index) => (
                  <button key={index} disabled={!lecture.isPreviewFree} onClick={() => {
                    if(lecture.isPreviewFree){
                      setSelectedLecture(lecture)
                  }}} className={`flex flex-center gap-3 px-4 py-3 rounded-lg border transition-all duration-200 text-left  ${lecture.isPreviewFree ? "hover:bg-gray-100 cursor-pointer" : "opacity-50 cursor-not-allowed"} ${selectedLecture?.lectureTitle === lecture?.lectureTitle ? "bg-gray-100 border-gray-400" : ""}`}  >
                    <span className='text-lg text-gray-700'>{lecture.isPreviewFree ? <IoIosPlayCircle /> : <CiLock />}</span>
                    <span className='text-sm font-medium text-gray-800'>{lecture.lectureTitle}</span>
                  </button>
                ))}

              </div>
              </div>

              <div className='bg-white w-full md:w-3/5 p-6 rounded-2xl shadow-lg border border-gray-200'>

              <div className='aspect-video w-full rounded-lg overflow-hidden mb-4 bg-black flex items-center justify-center'>

                {selectedLecture?.vedioUrl ? <video src={selectedLecture?.vedioUrl} controls className='w-full h-full object-cover' /> : <span className='text-white text-sm'>Select a preview lecture to watch</span>}
              </div>

              </div>
            </div>

            <div className='mt-8 border-t pt-6'>
              <h2 className='text-xl font-semibold mb-2'>Write a Review</h2>
              <div className='mb-4'>
                <div className='flex gap-1 mb-2'>
                  {
                    Array.from({length: 5}, (_, index) => (
                      <span key={index} className='text-gray-300'>
                        <FaStar />
                      </span>
                    ))
                  }
                </div>
                <textarea  className="w-full border border-gray-200 rounded-lg p-2" placeholder="Write your review..." rows={4} />
                <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-700 mt-3 cursor-pointer">Submit Review</button>
              </div>

            </div>

            {/* for creator info */}
            <div className='flex items-center gap-4 pt-4 border-t'>

              {creatorData?.photoUrl? <img src={creatorData?.photoUrl} className='w-16 h-16 border-1 border-gray-200 rounded-full object-cover' alt="" /> : <img src={img} className='w-16 h-16 border-1 border-gray-200 rounded-full object-cover' alt="" /> }

              <div>
                <h2 className='text-lg font-semibold'>{creatorData?.name}</h2>
                <p className='md:text-sm text-gray-600 text-[10px]'>{creatorData?.description}</p>
                <p className='md:text-sm text-gray-600 text-[10px]'>{creatorData?.email}</p>

              </div>
            </div>

            <div>
              <p className='text-xl font-semibold mb-2'>Other Published courses by the educator</p>

            </div>

            <div className='w-full transition-all duration-300 py-[20px] flex items-start justify-center lg:justify-start flex-wrap gap-6 lg:px-[80px]'>
              {
                creatorCourses?.map((course,index) => (
                  <Card key={index} thumbnail={course.thumbnail} id={course._id} title={course.title} price={course.price} category={course.category} rating={course.rating} />
                ))
              }

            </div>


        </div>
    </div>
  )
}

export default ViewCourse