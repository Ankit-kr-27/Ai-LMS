import React from 'react'
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import axios from 'axios'
import { serverUrl } from '../../App'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setLectureData } from '../../redux/lectureSlice'

const EditLecture = () => {
  const {lectureId, courseId} = useParams()
  const {lectureData} = useSelector((state) => state.lecture)
  const selectedLecture = Array.isArray(lectureData)
  ? lectureData.find(lecture => lecture._id === lectureId)
  : null;
  const navigate = useNavigate()
  const [lectureTitle, setLectureTitle] = useState(selectedLecture?.lectureTitle)
  const [vedioUrl, setVedioUrl] = useState("")
  const [isPreviewFree, setIsPreviewFree] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loading1, setLoading1] = useState(false)
  const dispatch = useDispatch()

  const formdata = new FormData()
  formdata.append("lectureTitle", lectureTitle)
  formdata.append("vedioUrl", vedioUrl)
  formdata.append("isPreviewFree", isPreviewFree)

  const handleEditLecture = async () => {
    setLoading(true)
    try {
      const result = await axios.post(serverUrl+ `/api/course/editlecture/${lectureId}`, formdata, {withCredentials: true})
      console.log(result.data)
      dispatch(
  setLectureData(
    lectureData.map(l =>
      l._id === lectureId ? result.data : l
    )
  )
);
      setLoading(false)
      navigate(`/createlecture/${courseId}`)
      toast.success("Lecture updated successfully")
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error(error.response.data.message)
      setLoading(false)
    }
  }

  const removeLecture = async () => {
    setLoading1(true)
    try {
      const result = await axios.delete(serverUrl+ `/api/course/removelecture/${lectureId}`, {withCredentials: true})
      console.log(result.data)
      setLoading1(false)
      navigate(`/createlecture/${courseId}`)
      toast.success("Lecture removed successfully")
    } catch (error) {
      setLoading1(false)
      console.log(error)
      toast.error(error.response.data.message)
 
    }
  }

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
      <div className='w-full max-w-xl bg-white rounded-xl shadow-lg p-6 space-y-6'>

        {/* header  */}
        <div className='flex items-center gap-2 mb-2'>
          <FaArrowLeft className='text-gray-600 cursor-pointer' onClick={() => navigate(`/createlecture/${courseId}`)}/>
          <h2 className='text-xl font-semibold text-gray-800'>Update course lecture</h2>
        </div>

        <button className='mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all text-sm cursor-pointer' onClick={removeLecture} disabled={loading1}>{loading1 ? "Removing..." : "Remove Lecture"}</button>

        <div className='space-y-4'>
          <div >
            <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor="">Lecture Title*</label>
            <input type="text" className='w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[black] focus:outline-none' required onChange={(e) => setLectureTitle(e.target.value)} value={lectureTitle} />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor="">Lecture Video*</label>
            <input type="file" className='w-full p-3 border border-gray-300 rounded-md p-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-gray-700 file:text-white file:cursor-pointer hover:file:bg-gray-500 transition-all' required accept='video/*' onChange={(e) => setVedioUrl(e.target.files[0])} />
          </div>

          <div className='flex items-center gap-3'>
            <input type="checkbox" className='accent-black h-4 w-4' id='isFree' onChange={()=>setIsPreviewFree(prev=>!prev)} checked={isPreviewFree} />
            <label htmlFor='isFree' className='text-sm text-gray-700'>Is this Vedio Free?</label>
          </div>

          {loading ? <p>Uploading video..please wait..</p>: ""}
        </div>

        <div className='pt-4'>
          <button className='w-full bg-black text-white py-3 rounded-md text-sm font-medium hover:bg-gray-700 transition-all cursor-pointer' onClick={handleEditLecture} disabled={loading}>{loading ? "Updating..." : "Update Lecture"}</button>
        </div>
      </div>

    </div>
  )
}

export default EditLecture