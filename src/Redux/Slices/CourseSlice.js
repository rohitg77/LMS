import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {toast} from "react-hot-toast"

import axiosInstance from "../../Helpers/axiosInstance"

const initialState={
    courseData:[]
}

export const getAllCourses=createAsyncThunk("/course/get",async () => {
    try {
        
        const response = axiosInstance.get("/courses")
        toast.promise(response,{
            loading:'Fetching Courses',
            success:"Courses Loaded SuccessFully",
            error:'Failed to fetch courses'
        })

        return (await response).data.courses
    } catch (error) {

        toast.error(error?.response?.data?.message)

    }
})

export const createCourse=createAsyncThunk("/course/create",async (data) => {
    try {
        const response=axiosInstance.post("/courses",data)
        toast.promise(response,{
            loading:'Creating Course...',
            success:"Course Created SuccessFully",
            error:'Failed to create course'
        })
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const deleteCourse=createAsyncThunk("/course/delete",async (courseId) => {
    try {
        const response=toast.promise(
            axiosInstance.delete(`/courses/${courseId}`),
            {
                loading:"Deleting Course...",
                success:"Course Deleted Successfully",
                error:"Failed to Delete Course"
            }
        )
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

const courseSlice=createSlice({
    name:'courses',
    initialState,
    reducers:{
    },
    extraReducers:(builder)=>{
        builder.addCase(getAllCourses.fulfilled
            ,(state,action)=>{
                if (action?.payload) {
                    state.courseData=[...action.payload]
                }
            }
        )
    }
})

export default courseSlice.reducer
