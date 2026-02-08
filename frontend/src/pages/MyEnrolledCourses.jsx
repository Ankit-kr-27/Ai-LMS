import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa6";

const MyEnrolledCourses = () => {
  const { userData } = useSelector((state) => state.user)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white px-6 py-20">

      {/* Back */}
      <button
        onClick={() => navigate("/")}
        className="
        fixed top-24 left-6
        flex items-center gap-2
        text-2xl text-black/70
        hover:text-black transition cursor-pointer
        "
      >
        <FaArrowLeft className='cursor-pointer' />
        
      </button>

      {/* Title */}
      <h1 className="text-3xl font-semibold text-center mb-12">
        My Enrolled Courses
      </h1>

      {/* Content */}
      {userData?.enrolledCourses?.length === 0 ? (
        <p className="text-center text-black/60">
          You haven’t enrolled in any courses yet.
        </p>
      ) : (
        <div className="
          max-w-7xl mx-auto
          grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
          gap-8
        ">
          {userData.enrolledCourses.map((course, index) => (
            <div
              key={index}
              className="
              bg-white rounded-2xl
              border border-black/10
              shadow-sm
              hover:shadow-lg hover:-translate-y-1
              transition-all duration-300
              "
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-40 object-cover rounded-t-2xl"
              />

              <div className="p-5 space-y-2">
                <h2 className="text-lg font-semibold line-clamp-2">
                  {course.title}
                </h2>

                <p className="text-sm text-black/60">
                  {course.level}
                </p>

                <p className="text-sm text-black/60 capitalize">
                  {course.category}
                </p>

                <button
                  onClick={() => navigate(`/viewlecture/${course._id}`)}
                  className="
                  mt-4 w-full
                  px-4 py-2 rounded-xl
                  bg-black text-white
                  hover:bg-black/90
                  transition
                  "
                >
                  Watch Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyEnrolledCourses
