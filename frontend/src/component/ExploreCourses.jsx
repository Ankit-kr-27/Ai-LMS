import React from 'react'
import { SiViaplay } from "react-icons/si";
import { TbDeviceDesktopCode } from "react-icons/tb";
import { FaUikit } from "react-icons/fa6";
import { MdAppShortcut } from "react-icons/md";
import { FaHackerrank } from "react-icons/fa";
import { AiFillOpenAI } from "react-icons/ai";
import { SiGoogledataproc } from "react-icons/si";
import { BsClipboardDataFill } from "react-icons/bs";
import { SiOpenaigym } from "react-icons/si";
import { useNavigate } from 'react-router-dom';

const categories = [
  { icon: TbDeviceDesktopCode, label: "Web Dev" },
  { icon: FaUikit, label: "UI/UX Design" },
  { icon: MdAppShortcut, label: "App Dev" },
  { icon: FaHackerrank, label: "Ethical Hacking" },
  { icon: AiFillOpenAI, label: "AI / ML" },
  { icon: SiGoogledataproc, label: "Data Science" },
  { icon: BsClipboardDataFill, label: "Data Analytics" },
  { icon: SiOpenaigym, label: "AI Tools" },
]

const ExploreCourses = () => {
  const navigate = useNavigate()

  return (
    <section className="w-full py-20 px-6 lg:px-20 bg-[#f5f5f5]">

      <div className="max-w-7xl  mx-auto flex flex-col lg:flex-row gap-14">

        {/* LEFT */}
        <div className="lg:w-[35%] flex flex-col gap-4">
          <h2 className="text-4xl font-semibold">
            Explore Our <br /> Courses
          </h2>

          <p className="text-black/70 leading-relaxed">
            Learn from industry-relevant courses designed to upgrade your
            skills and accelerate your career growth with hands-on content and expert instructors with real world experience.
          </p>

          <button
            onClick={() => navigate("/allcourses")}
            className="
            mt-6 inline-flex items-center gap-3
            px-6 py-3 w-fit
            rounded-xl bg-black text-white
            hover:bg-black/90
            transition-all duration-300 cursor-pointer
            "
          >
            Explore Courses
            <SiViaplay className="w-5 h-5" />
          </button>
        </div>

        {/* RIGHT */}
        <div className="lg:w-[65%] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">

          {categories.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="
              flex flex-col items-center justify-center
              gap-3 p-4 rounded-2xl
              border border-black/10
              bg-white
              hover:shadow-lg hover:-translate-y-1
              transition-all duration-300
              "
            >
              <div className="
                w-16 h-16 rounded-xl
                bg-black/5
                flex items-center justify-center
              ">
                <Icon className="w-8 h-8 text-black/70" />
              </div>

              <span className="text-sm font-medium text-black/80 text-center">
                {label}
              </span>
            </div>
          ))}

        </div>

      </div>
    </section>
  )
}

export default ExploreCourses
