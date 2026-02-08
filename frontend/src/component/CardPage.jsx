import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Card from './Card'

const CardPage = () => {
  const { courseData } = useSelector((state) => state.course)
  const [popularCourses, setPopularCourses] = useState([])

  useEffect(() => {
    if (courseData) {
      setPopularCourses(courseData.slice(0, 6))
    }
  }, [courseData])

  return (
    <section className="relative mt-28 w-full bg-white">
      
      {/* SECTION HEADER */}
      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-gray-900 md:text-[48px] text-[32px] font-semibold tracking-tight">
          Our Popular Courses
        </h1>

        {/* Divider */}
        <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto my-6" />

        <p className="text-gray-600 text-[15px] md:text-[16px] leading-relaxed">
          Explore top-rated courses designed to boost your skills, enhance careers,
          and unlock opportunities in tech, AI, business, and more.
        </p>
      </div>

      {/* CARDS GRID */}
      <div
        className="
          max-w-7xl mx-auto
          grid
          lg:grid-cols-3
          md:grid-cols-2
          grid-cols-1
          gap-10
          px-6
          mt-16
          pb-24
        "
      >
        {popularCourses.map((course, index) => (
          <div
            key={index}
            className="
              transition-all duration-300
              hover:-translate-y-2
              hover:shadow-xl
            "
          >
            <Card
              thumbnail={course.thumbnail}
              title={course.title}
              category={course.category}
              price={course.price}
              id={course._id}
              reviews={course.reviews}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default CardPage
