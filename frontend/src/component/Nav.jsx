import React, { useState } from 'react'
import logo from '../assets/logo.png'
import { IoPersonCircle } from "react-icons/io5"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { setUserData } from '../redux/userSlice'
import { serverUrl } from '../App'
import { GiHamburgerMenu, GiCrossMark } from "react-icons/gi"

export const Nav = () => {
  const { userData } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [show, setShow] = useState(false)
  const [showHam, setShowHam] = useState(false)

  const handleLogout = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
      dispatch(setUserData(null))
      toast.success("Logout successful")
      navigate("/login")
    } catch {
      toast.error("Logout failed")
    }
  }

  const Avatar = ({ size = 38 }) => (
    userData?.photoUrl ? (
      <img
        src={`${userData.photoUrl}?t=${Date.now()}`}
        style={{ width: size, height: size }}
        className="rounded-full object-cover border border-white/30 cursor-pointer"
        onClick={() => setShow(p => !p)}
        alt="Profile"
      />
    ) : (
      <div
        style={{ width: size, height: size }}
        className="rounded-full bg-black text-white flex items-center justify-center border border-white/30 cursor-pointer"
        onClick={() => setShow(p => !p)}
      >
        {userData?.name?.slice(0, 1)?.toUpperCase()}
      </div>
    )
  )

  return (
    <>
      {/* FLOATING NAVBAR */}
      {/* FULL WIDTH DESKTOP NAV */}
<nav
  className="
    fixed top-0 left-0 w-full h-[72px]
    bg-black/80 backdrop-blur-xl
    border-b border-white/10
    z-50
    flex items-center
  "
>
  <div className="w-full max-w-7xl mx-auto px-6 flex items-center justify-between">
    
    {/* LEFT : Logo */}
    <div
      className="flex items-center gap-3 cursor-pointer"
      onClick={() => navigate("/")}
    >
      <img
        src={logo}
        alt="logo"
        className="w-11 h-11 object-contain"
      />
      <span className="text-white font-semibold tracking-wide">
        ClassSync
      </span>
    </div>

    {/* RIGHT : Actions */}
    <div className="hidden lg:flex items-center gap-6 relative">
      
      {userData?.role === "educator" && (
        <button
          onClick={() => navigate("/dashboard")}
          className="
            text-md text-white/80 hover:text-white
            transition cursor-pointer
          "
        >
          Dashboard
        </button>
      )}

      {!userData && (
        <IoPersonCircle
          className="w-8 h-8 text-white/70 hover:text-white cursor-pointer"
          onClick={() => setShow(p => !p)}
        />
      )}

      {userData && <Avatar />}

      {!userData ? (
        <button
          onClick={() => navigate("/login")}
          className="
            px-4 py-2
            bg-white text-black text-md
            hover:bg-gray-200
            transition cursor-pointer
          "
        >
          Login
        </button>
      ) : (
        <button
          onClick={handleLogout}
          className="
            px-4 py-2
            text-md text-white/70 hover:text-red-500
            border border-white/20
            transition cursor-pointer
          "
        >
          Logout
        </button>
      )}

      {/* DROPDOWN */}
      {show && (
        <div
          className="
            absolute top-[120%] right-0
            w-52
            bg-black/95
            border border-white/10
            shadow-xl
          "
        >
          <div
            onClick={() => navigate("/profile")}
            className="px-4 py-3 text-md text-white/80 hover:bg-white hover:text-black cursor-pointer"
          >
            My Profile
          </div>
          <div
            onClick={() => navigate("/mycourses")}
            className="px-4 py-3 text-md text-white/80 hover:bg-white hover:text-black cursor-pointer"
          >
            My Courses
          </div>
        </div>
      )}
    </div>

    {/* MOBILE HAMBURGER (UNCHANGED) */}
    <GiHamburgerMenu
      className="lg:hidden w-6 h-6 text-white cursor-pointer"
      onClick={() => setShowHam(true)}
    />
  </div>
</nav>


      {/* MOBILE MENU */}
      <div
        className={`
          fixed inset-0 z-[999]
          bg-black/95 backdrop-blur-xl
          flex flex-col items-center justify-center gap-6
          transition-transform duration-500
          lg:hidden
          ${showHam ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* ❌ CLOSE BUTTON — FIXED */}
        <button
          onClick={() => setShowHam(false)}
          className="
            absolute top-6 right-6
            w-12 h-12
            flex items-center justify-center
            rounded-full
            border border-white/30
            text-white
            bg-black/60
            shadow-lg
            z-[1000]
          "
        >
          <GiCrossMark className="w-6 h-6" />
        </button>

        {!userData && <IoPersonCircle className="w-14 h-14 text-white" />}
        {userData && <Avatar size={52} />}

        {[
          ["My Profile", "/profile"],
          ["My Courses", "/mycourses"],
          ...(userData?.role === "educator" ? [["Dashboard", "/dashboard"]] : [])
        ].map(([label, path]) => (
          <button
            key={label}
            onClick={() => {
              navigate(path)
              setShowHam(false)
            }}
            className="w-[220px] py-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition"
          >
            {label}
          </button>
        ))}

        {!userData ? (
          <button
            onClick={() => {
              navigate("/login")
              setShowHam(false)
            }}
            className="w-[220px] py-3 rounded-full bg-white text-black"
          >
            Login
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className="w-[220px] py-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition"
          >
            Logout
          </button>
        )}
      </div>
    </>
  )
}
