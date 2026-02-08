import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaStar } from "react-icons/fa6";

const Card = ({ thumbnail, title, category, price, id, reviews }) => {

  const calculateAvgReview = (reviews) => {
    if (!reviews || reviews.length === 0) return 0
    const total = reviews.reduce((sum, r) => sum + r.rating, 0)
    return (total / reviews.length).toFixed(1)
  }

  const avgRating = calculateAvgReview(reviews)
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/viewcourse/${id}`)}
      className="group max-w-sm w-full cursor-pointer
      bg-white rounded-2xl overflow-hidden
      border border-black/10 shadow-md
      hover:shadow-xl hover:-translate-y-1
      transition-all duration-300"
    >

      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-48 object-cover
          group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">

        <h2 className="text-lg font-semibold text-black line-clamp-2">
          {title}
        </h2>

        <span className="inline-block text-xs px-3 py-1
          rounded-full bg-black/5 text-black/70 capitalize">
          {category}
        </span>

        <div className="flex justify-between items-center pt-3 text-sm">

          <span className="font-semibold text-black">
            {price}
          </span>

          <span className="flex items-center gap-1 bg-black/5
            px-2 py-1 rounded-lg text-black">
            {avgRating}
            <FaStar className="text-yellow-400" />
          </span>

        </div>
      </div>
    </div>
  )
}

export default Card
