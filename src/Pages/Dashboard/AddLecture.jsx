import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { AiOutlineArrowLeft, AiOutlineCloudUpload } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import HomeLayout from '../../Layout/HomeLayout'
import { addCourseLecture } from '../../Redux/Slices/LectureSlice'

export default function AddLecture() {

  const {state} = useLocation()

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [userInput, setUserInput] = useState({
    id:state?._id,
    lecture:undefined,
    title:"",
    description:"",
    videoSrc:""
  })

  function handleInputChange(e){
    e.preventDefault()
    const {name, value} = e.target
    setUserInput({...userInput, [name]:value})
  }

  async function handleSubmit(e){
    e.preventDefault()
    if(!userInput.title || !userInput.description || !userInput.videoSrc){
      toast.error("Please fill all the fields")
      return
    }

    const res=await dispatch(addCourseLecture(userInput))

    if(res?.payload?.success){
      setUserInput({
        id:state?._id,
        lecture:undefined,
        title:"",
        description:"",
        videoSrc:""
      })
      navigate(-1)
    }

  }

  useEffect(()=>{
    if (!state) {
      navigate("/")
    }
  },[])

  function handleVideo(e){
    const file = e.target.files[0]
    const source=window.URL.createObjectURL(file)
    setUserInput({...userInput, lecture:file, videoSrc:source})

  }

  return (
    <HomeLayout>
      <div className='flex flex-col items-center justify-center min-h-[90vh]'>
        <div className='flex flex-col items-center justify-center shadow-[0_0_10px_black] p-10 rounded-lg'>
         <header className='flex items-center justify-center relative my-5'>
          <button className='absolute left-[-30px] text-xl' onClick={()=>navigate(-1)}>
            <AiOutlineArrowLeft/>
          </button>
          <h1 className='text-xl font-bold'>Add New Lecture</h1>
         </header>
         <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-5 w-full'>
          <input type='text' name='title' placeholder='Title' className='w-full p-2 rounded-md' onChange={handleInputChange} value={userInput.title}/>
          <textarea name='description' id='description' placeholder='Description' className='w-full p-2 rounded-md ' onChange={handleInputChange} value={userInput.description}></textarea>
          {
            userInput.videoSrc ? (
              <video src={userInput.videoSrc} className='w-[400px] h-[300px] object-cover' controls controlsList='nodownload' disablePictureInPicture></video>
            ):(
              <div className='w-full h-full flex items-center justify-center'>
                <label htmlFor='lecture' className='w-full h-full flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-500 rounded-md p-5 cursor-pointer'>
                  <AiOutlineCloudUpload/>
                  <p>Click to upload or drag and drop</p>
                  <p className='text-sm text-gray-500'>MP4, MOV, WMV, AVI, MPG, MPEG, or RM</p>
                </label>
                <input type='file' name='lecture' id='lecture' className='hidden' onChange={handleVideo} accept='video/*'/>
              </div>
            )
          }
          <button type='submit' className='btn btn-accent w-full'>Add Lecture</button>
         </form>
        </div>
      </div>
    </HomeLayout>
  )
}
