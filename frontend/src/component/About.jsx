import React from 'react'
import about from "../assets/about.jpg"
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { IoMdCheckmarkCircle } from "react-icons/io";



const About = () => {
  return (
    <div className='w-[100vw] lg:h-[70vh] min-h-[50vh] flex flex-wrap items-center justify-center gap-2 mb-[30px]'>

      {/* for image */}
      <div className='lg:w-[40%] md:w-[80%] w-[100%] h-[100%] flex items-center justify-center relative'>
        <img src={about} alt="" className='w-[80%] h-[90%] rounded-lg' />
        
      </div>

      {/* for about info*/}
      <div className='lg:w-[50%] md:w-[70%] w-[100%] flex items-start justify-center flex-col px-[35px] md:px-[80px]'>
        <div className='flex text-[20px] items-center justify-center gap-[20px]'>About Us <TfiLayoutLineSolid className='w-[40px] h-[40px]'/></div>
        <div className='md:text-[45px] text-[35px] font-semibold'>Mazimize your Learning Growth
        </div>

        <div className='text-[15px]'>We provide modern Learning managment system to help you to grow your skill and knowledge and make your future bright with us and enhance your learning experience.</div>

        <div className='w-[100%] lg:w-[60%]'>
          <div className='flex items-center justify-between mt-[40px]'>
            <div className='flex items-center justify-center gap-[10px]'><IoMdCheckmarkCircle className='w-[20px] h-[20px] text-green-500'/>Simplified Learning</div>

            <div className='flex items-center justify-center gap-[10px]'><IoMdCheckmarkCircle className='w-[20px] h-[20px] text-green-500'/>Expert Trainers</div>
            </div>

            <div className='flex items-center justify-between mt-[40px]'>

            <div className='flex items-center justify-center gap-[10px]'><IoMdCheckmarkCircle className='w-[20px] h-[20px] text-green-500'/>Flexible Learning</div>

            <div className='flex items-center justify-center gap-[10px]'><IoMdCheckmarkCircle className='w-[20px] h-[20px] text-green-500'/>24/7 Support</div>
            </div>
            <div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default About