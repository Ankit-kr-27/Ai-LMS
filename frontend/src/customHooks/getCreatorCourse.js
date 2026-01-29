import React, { useEffect } from 'react'
import { serverUrl } from './getCurrentUser'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useSelector } from "react-redux";
import { setCreatorCourseData } from '../redux/courseSlice'

const getCreatorCourse = () => {
    const dispatch = useDispatch()
    const {userData} = useSelector((state)=>state.user)
  return (
    useEffect(()=>{
      const creatorCourses = async () => {
        try {
            const result = await axios.get(serverUrl + '/api/course/getcreator',{withCredentials: true})
            console.log(result.data)
            dispatch(setCreatorCourseData(result.data))

        } catch (error) {
            console.log(error)
        }
      }
      creatorCourses()
    },[userData])
  )
}

export default getCreatorCourse