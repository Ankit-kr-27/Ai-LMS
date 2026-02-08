import React from 'react'
import logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()

  return (
    <footer className="bg-black text-white/70">

      {/* Top */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div className="space-y-4">
            <img
              src={logo}
              alt="Class Sync"
              className="h-10 w-auto rounded-md border border-white/10"
            />
            <h2 className="text-xl font-semibold text-white">
              Class Sync
            </h2>
            <p className="text-sm leading-relaxed text-white/60 max-w-sm">
              Class Sync is a modern learning management system designed
              to help you grow your skills, expand knowledge, and build
              a brighter future with a seamless learning experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li
                onClick={() => navigate("/")}
                className="cursor-pointer hover:text-white transition"
              >
                Home
              </li>
              <li
                onClick={() => navigate("/allcourses")}
                className="cursor-pointer hover:text-white transition"
              >
                All Courses
              </li>
              <li
                onClick={() => navigate("/login")}
                className="cursor-pointer hover:text-white transition"
              >
                Login
              </li>
              <li
                onClick={() => navigate("/profile")}
                className="cursor-pointer hover:text-white transition"
              >
                My Profile
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
              Categories
            </h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li className="hover:text-white transition">Web Development</li>
              <li className="hover:text-white transition">App Development</li>
              <li className="hover:text-white transition">Data Science</li>
              <li className="hover:text-white transition">Machine Learning</li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 text-center text-xs text-white/50">
          © {new Date().getFullYear()} Class Sync. All rights reserved.
        </div>
      </div>

    </footer>
  )
}

export default Footer
