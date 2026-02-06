import React, { useEffect } from 'react'
import axios from 'axios'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'   
import { setReviewData } from '../redux/reviewSlice'

const getAllReviews = () => {
    const dispatch = useDispatch()
  
    useEffect(() => {
        const allReviews = async () => {
            try {
                const result = await axios.get(serverUrl + "/api/review/getreview", {withCredentials: true})
                console.log(result.data)
                dispatch(setReviewData(result.data))
            } catch (error) {
                console.log(error)
            }
        }
        allReviews()
    }, [])
}

export default getAllReviews