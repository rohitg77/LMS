import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import HomeLayout from '../../Layout/HomeLayout'
import { deleteCourseLecture, getCourseLecture } from '../../Redux/Slices/LectureSlice'

export default function DisplayLectures() {
  const {state} = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {lectures} = useSelector((state)=>state.lecture)
  const {role} = useSelector((state)=>state.auth)
  const [currentVideo, setCurrentVideo] = useState(0)

  async function deleteLecture(lectureId, courseId){
    toast.loading("Deleting Lecture...")
    await dispatch(deleteCourseLecture({lectureId, courseId}))
    toast.dismiss()
    toast.success("Lecture Deleted Successfully")
    await dispatch(getCourseLecture(courseId))
  }

  useEffect(()=>{
    if(!state){
      navigate("/courses")
    }
    dispatch(getCourseLecture(state?._id))
  },[])

  return (
    <HomeLayout>
      <div className='flex flex-col gap-4 items-center justify-start min-h-screen py-10 text-white'>
        <div className='text-3xl font-semibold text-yellow-500 capitalize text-center'>
          Course Name: {state?.title}
        </div>
        
        {(lectures && lectures.length > 0) ? (
          <div className='flex flex-col md:flex-row justify-center gap-10 w-full min-h-[80vh] px-4'>
            {/* Left section - Video Player */}
            <div className='space-y-3 w-full md:w-[60%] p-2'>
              <video 
                src={lectures && lectures[currentVideo]?.lecture?.secure_url}
                className='object-fill rounded-tl-lg rounded-tr-lg w-full'
                controls
                disablePictureInPicture
                controlsList="nodownload"
                muted
              ></video>
              <div className='bg-gray-800 p-4 rounded-bl-lg rounded-br-lg'>
                <h1 className='text-xl font-semibold text-yellow-500'>
                  {lectures && lectures[currentVideo]?.title}
                </h1>
                <p className='text-gray-200'>
                  {lectures && lectures[currentVideo]?.description}
                </p>
              </div>
            </div>

            {/* Right section - Playlist */}
            <div className='w-full md:w-[40%] p-4 space-y-5 bg-gray-800 rounded-lg'>
              <div className='flex items-center justify-between p-2'>
                <h1 className='text-xl font-semibold text-yellow-500'>Lectures List</h1>
                {role === "ADMIN" && (
                  <button onClick={()=> navigate("/course/addLecture",{state:{...state}})} className='btn btn-accent px-4 py-2 rounded-md font-semibold hover:scale-95 transition-all ease-in-out duration-300'>
                    Add Lecture
                  </button>
                )}
              </div>
              <ul className='space-y-4'>
                {lectures && lectures.map((lecture, index) => (
                  <li 
                    key={lecture?._id} 
                    className='flex items-center justify-between p-2 hover:bg-gray-700 rounded-lg cursor-pointer'
                  >
                    <div 
                      className='flex items-center gap-3 w-full'
                      onClick={() => setCurrentVideo(index)}
                    >
                      <span className='text-yellow-500 font-semibold'>
                        {index + 1}.
                      </span>
                      <span className='text-gray-100 line-clamp-1'>
                        {lecture?.title}
                      </span>
                    </div>
                    {role === "ADMIN" && (
                      <button onClick={()=>deleteLecture(lecture?._id,state?._id)} className='btn btn-error px-4 py-1 rounded-md font-semibold hover:scale-95 transition-all ease-in-out duration-300'>
                        Delete
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          role === "ADMIN" && (
            <button onClick={()=>navigate("/course/addLecture",{state:{...state}})} className='btn btn-accent px-4 py-2 rounded-md font-semibold hover:scale-95 transition-all ease-in-out duration-300'>
              Add Lecture
            </button>
          )
        )}
      </div>
    </HomeLayout>
  )
}
