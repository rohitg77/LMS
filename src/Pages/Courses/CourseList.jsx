import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import CourseCard from '../../Components/CourseCard'
import HomeLayout from '../../Layout/HomeLayout'
import { getAllCourses } from '../../Redux/Slices/CourseSlice'

export default function CourseList() {

    const dispatch=useDispatch()

    const navigate=useNavigate()

    const { courseData }=useSelector((state)=>state.courses)

    async function loadCourses() {
        console.log('====================================');
        console.log(courseData);
        console.log('====================================');
        await dispatch(getAllCourses())
    }

    useEffect(()=>{
        loadCourses()
    },[])

  return (
    <HomeLayout>
        <div className='min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-center'>
            <h1 className='text-xl space-x-4'>
                Explore the courses{' '}
                <span className='font-bold text-yellow-500'>
                    Made By Experts
                </span>
            </h1>
            <div className='mb-10 flex flex-wrap gap-14 '>
                    {
                        courseData?.map((course)=>{
                            return <CourseCard  key={course._id} data={course} />

                        })
                    }
                </div>
        </div>
    </HomeLayout>
  )
}
