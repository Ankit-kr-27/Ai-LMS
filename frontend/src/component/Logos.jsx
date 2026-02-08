import React from 'react'
import { MdCastForEducation } from "react-icons/md";
import { SiOpenaccess } from "react-icons/si";
import { FaSackDollar } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";

const Logos = () => {
  const items = [
    { icon: MdCastForEducation, text: "20k+ Online Courses" },
    { icon: SiOpenaccess, text: "Lifetime Access" },
    { icon: FaSackDollar, text: "Value for Money" },
    { icon: BiSupport, text: "Lifetime Support" },
    { icon: FaUsers, text: "Community Support" },
  ]

  return (
    <section className="w-full py-10 flex justify-center">
      <div className="flex flex-wrap items-center justify-center gap-4 max-w-6xl px-6">

        {items.map(({ icon: Icon, text }) => (
          <div
            key={text}
            className="
            flex items-center gap-3
            px-5 py-3 rounded-full
            bg-black/5 backdrop-blur
            border border-black/10
            text-black/80
            cursor-default
            hover:bg-black hover:text-white
            transition-all duration-300
            "
          >
            <Icon className="w-6 h-6" />
            <span className="text-sm font-medium">{text}</span>
          </div>
        ))}

      </div>
    </section>
  )
}

export default Logos
