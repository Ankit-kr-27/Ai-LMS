import React from 'react'
import about from "../assets/about.jpg"
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { IoMdCheckmarkCircle } from "react-icons/io";

const About = () => {
  return (
    <section className="w-full min-h-[60vh] flex flex-col lg:flex-row items-center justify-center gap-10 px-6 lg:px-20 mb-16 ">

      {/* Image */}
      <div className="lg:w-[40%] w-full flex justify-center relative">
        <img
          src={about}
          alt="About"
          className="w-[85%] max-h-[420px] object-cover rounded-2xl
          shadow-xl border border-black/10"
        />
      </div>

      {/* Content */}
      <div className="lg:w-[50%] w-full flex flex-col gap-5">

        <div className="flex items-center gap-4 text-lg tracking-wide text-black/80">
          About Us
          <TfiLayoutLineSolid className="w-10 h-10 opacity-70" />
        </div>

        <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
          Maximize your <br /> Learning Growth
        </h2>

        <p className="text-black/70 text-sm md:text-base leading-relaxed max-w-xl">
          We provide a modern learning management system to help you grow your
          skills, expand knowledge, and build a strong future with an enhanced
          learning experience.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 max-w-lg">
          {[
            "Simplified Learning",
            "Expert Trainers",
            "Flexible Learning",
            "24/7 Support"
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 text-black/80"
            >
              <IoMdCheckmarkCircle className="text-green-500 w-5 h-5" />
              {item}
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}

export default About
