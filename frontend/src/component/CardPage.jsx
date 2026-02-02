import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Card from './Card'

const CardPage = () => {
    const {courseData} = useSelector((state) => state.course)
    const [popularCourses, setPopularCourses] = useState([])

    useEffect(() => {
        if(courseData){
            setPopularCourses(courseData?.slice(0,6));
        }
    }, [courseData])
  return (
    <div className='mt-20 relative flex items-center justify-center flex-col'>
        <h1 className='md:text-[45px] text-[30px] font-semibold'>Our Popular Courses</h1>
        <span className='lg:w-[50%] md:[80%] text-[15px] text-center mt-[30px] mb-[30px] px-[20px]'>Explore top-rated courses designed to boost your skills, enchance careers, and unlock oppurtunities in tech, AI , Business and more</span>

        <div className='w-[100%] min-[100vh] flex items-center justify-center flex-wrap gap-[50px] lg:p-[50px] md:p-[30px] p-[10px] mb-[40px]'>
            {popularCourses?.map((course,index) => (
                <Card key={index} thumbnail={course.thumbnail} title={course.title} category={course.category} price={course.price} id={course._id} />
            ))}
        </div>
    </div>
  )
}

export default CardPage