import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa6";
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import axios from 'axios'
import { serverUrl } from '../App'
import { setUserData } from '../redux/userSlice';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

const EditProfile = () => {
    const navigate = useNavigate()
    const { userData } = useSelector((state) => state.user)

    const [name, setName] = useState(userData?.name || "")
    const [description, setDescription] = useState(userData?.description || "")
    const [photoURL, setPhotoURL] = useState(null)
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    const handleEditProfile = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const formData = new FormData()
            formData.append("name", name)
            formData.append("description", description)

            if (photoURL) {
                formData.append("photoUrl", photoURL)
            }

            const result = await axios.post(
                serverUrl + "/api/user/profile",
                formData,
                { withCredentials: true }
            )

            dispatch(setUserData(result.data))
            toast.success("Profile updated successfully")
            navigate("/")
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || "Profile update failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen bg-gray-100 px-4 py-10 flex items-center justify-center'>
            <div className='bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full relative'>

                <FaArrowLeft
                    className='absolute top-[8%] left-[5%] w-[22px] h-[22px] cursor-pointer'
                    onClick={() => navigate("/profile")}
                />

                <h2 className='text-2xl font-bold text-center text-gray-800 mb-6'>
                    Edit Profile
                </h2>

                <form className='space-y-5' onSubmit={handleEditProfile}>

                    <div className='flex flex-col items-center text-center'>
                        {userData?.photoUrl ? (
                            <img
                                src={userData.photoUrl}
                                className='w-24 h-24 rounded-full object-cover border-4 border-black'
                                alt="Profile"
                            />
                        ) : (
                            <div className='w-24 h-24 rounded-full text-white flex items-center justify-center text-[30px] border-2 bg-black border-white'>
                                {userData?.name?.slice(0, 1).toUpperCase()}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className='text-sm font-semibold text-gray-700'>
                            Select Avatar
                        </label>
                        <input
                            type="file"
                            name="photoUrl"
                            accept="image/*"
                            className='w-full px-4 py-2 border rounded-md text-sm'
                            onChange={(e) => setPhotoURL(e.target.files[0])}
                        />
                    </div>

                    <div>
                        <label className='text-sm font-semibold text-gray-700'>
                            Username
                        </label>
                        <input
                            type="text"
                            className='w-full px-4 py-2 border rounded-md text-sm'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className='text-sm font-semibold text-gray-700'>
                            Email
                        </label>
                        <input
                            type="email"
                            readOnly
                            value={userData?.email || ""}
                            className='w-full px-4 py-2 border rounded-md text-sm'
                        />
                    </div>

                    <div>
                        <label className='text-sm font-semibold text-gray-700'>
                            Bio
                        </label>
                        <textarea
                            rows={3}
                            className='w-full mt-1 px-4 py-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-black'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className='w-full bg-black active:bg-[#454545] text-white py-2 rounded-md font-medium transition cursor-pointer'
                        disabled={loading}
                    >
                        {loading ? <ClipLoader color='white' size={30} /> : "Update Profile"}
                    </button>

                </form>
            </div>
        </div>
    )
}

export default EditProfile
