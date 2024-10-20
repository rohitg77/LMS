import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import HomeLayout from '../../Layout/HomeLayout'
import { createCourse } from '../../Redux/Slices/CourseSlice'

export default function CreateCourse() {

    const dispatch=useDispatch()

    const navigate=useNavigate()

    const [userInput,setUserInput]=useState({
        title:"",
        description:"",
        category:"",
        createdBy:"",
        thumbnail:null,
        previewImage:""
    })

    const handleChange=(e)=>{
        e.preventDefault()
        const {name,value}=e.target
        setUserInput({
            ...userInput,
            [name]:value
        })
    }


    const handleFileChange=(e)=>{
        e.preventDefault()
        const uploadedImage=e.target.files[0]
        if (uploadedImage) {
            const fileReader=new FileReader()
            fileReader.readAsDataURL(uploadedImage)
            fileReader.addEventListener('load',function(){
                setUserInput({
                    ...userInput,
                    thumbnail:uploadedImage,
                    previewImage:this.result
                })
            })
        }
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()

        if (!userInput.title || !userInput.description || !userInput.category || !userInput.createdBy || !userInput.thumbnail) {
            toast.error("Please fill all the fields")
            return
        }



        const formData=new FormData()
        formData.append('title',userInput.title)
        formData.append('description',userInput.description)
        formData.append('category',userInput.category)
        formData.append('createdBy',userInput.createdBy)
        formData.append('thumbnail',userInput.thumbnail)

        const res= await dispatch(createCourse(formData))

        if (res.payload?.success) {
            navigate('/courses')
            setUserInput({
                title:"",
                description:"",
                category:"",
                createdBy:"",
                thumbnail:null,
                previewImage:""
            })
        }


    }

  return (
    <HomeLayout>
        <div className='flex justify-center items-center h-screen'>
            <form className='w-[500px] p-4 bg-white rounded-lg shadow-md' noValidate onSubmit={handleSubmit}>
                <h1 className='text-2xl font-bold text-center mb-4'>Create Course</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-1 md:col-span-2">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Course Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={userInput.title}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div className="col-span-1 md:col-span-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Course Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={userInput.description}
                            onChange={handleChange}
                            rows="3"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                            Category
                        </label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={userInput.category}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="createdBy" className="block text-sm font-medium text-gray-700">
                            Created By
                        </label>
                        <input
                            type="text"
                            id="createdBy"
                            name="createdBy"
                            value={userInput.createdBy}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div className="col-span-1 md:col-span-2">
                        <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">
                            Course Thumbnail
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                {userInput.previewImage ? (
                                    <img
                                        src={userInput.previewImage}
                                        alt="thumbnail preview"
                                        className="mx-auto h-32 w-32 object-cover"
                                    />
                                ) : (
                                    <svg
                                        className="mx-auto h-12 w-12 text-gray-400"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                )}
                                <div className="flex text-sm text-gray-600">
                                    <label
                                        htmlFor="thumbnail"
                                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                    >
                                        <span>Upload a file</span>
                                        <input
                                            id="thumbnail"
                                            name="thumbnail"
                                            type="file"
                                            accept="image/*"
                                            className="sr-only"
                                            onChange={handleFileChange}
                                            required
                                        />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={handleSubmit}
                    >
                        Create Course
                    </button>
                </div>
            </form>
        </div>
    </HomeLayout>
  )
}
