import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa6";

const Profile = () => {
  const { userData } = useSelector((state) => state.user)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#f5f5f5] px-6 py-20 flex justify-center ">

      <div
        className="
        relative w-full max-w-xl
        bg-white border border-black/10
        rounded-2xl p-10
        shadow-sm 
        "
      >
        {/* Back */}
        <button
          onClick={() => navigate("/")}
          className="
          absolute top-6 left-6
          flex items-center gap-2
          text-2xl text-black/70
          hover:text-black transition cursor-pointer
          "
        >
          <FaArrowLeft />
         
        </button>

        {/* Avatar */}
        <div className="flex flex-col items-center text-center mt-6 ">
          {userData?.photoUrl ? (
            <img
              src={`${userData.photoUrl}?t=${Date.now()}`}
              alt="Profile"
              className="
              w-28 h-28 rounded-full object-cover
              border border-black/20
              "
            />
          ) : (
            <div
              className="
              w-28 h-28 rounded-full
              bg-black text-white
              flex items-center justify-center
              text-3xl font-semibold
              "
            >
              {userData?.name?.slice(0, 1).toUpperCase()}
            </div>
          )}

          <h2 className="text-2xl font-semibold mt-4">
            {userData?.name}
          </h2>

          <p className="text-sm text-black/60 capitalize">
            {userData?.role}
          </p>
        </div>

        {/* Info */}
        <div className="mt-10 space-y-5 text-sm">

          <div className="flex justify-between gap-4 border-b border-black/10 pb-2">
            <span className="font-medium text-black/70">Email</span>
            <span className="text-black/80 text-right">
              {userData?.email}
            </span>
          </div>

          <div className="flex justify-between gap-4 border-b border-black/10 pb-2">
            <span className="font-medium text-black/70">Bio</span>
            <span className="text-black/80 text-right">
              {userData?.description || "—"}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="font-medium text-black/70">
              Enrolled Courses
            </span>
            <span className="text-black/80">
              {userData?.enrolledCourses?.length || 0}
            </span>
          </div>

        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => navigate("/editprofile")}
            className="
            px-6 py-2 rounded-xl
            bg-black text-white
            hover:bg-black/90
            transition cursor-pointer
            "
          >
            Edit Profile
          </button>
        </div>

      </div>
    </div>
  )
}

export default Profile
