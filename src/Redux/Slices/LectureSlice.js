import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import  toast from "react-hot-toast"

import axiosInstance from "../../Helpers/axiosInstance"
const initialState={
    lectures:[],
}

export const getCourseLecture=createAsyncThunk("/course/lecture/get",async (cid) => {
    try {
        const response = toast.promise(
            axiosInstance.get(`/courses/${cid}`),
            {
                loading: 'Fetching Course Lectures...',
                success: "Course Lectures Fetched Successfully", 
                error: "Failed to Fetch Course Lectures"
            }
        );
        const res = await response;
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const addCourseLecture=createAsyncThunk("/course/lecture/add",async (data) => {
    try {
        const formData = new FormData()
        formData.append("lecture",data.lecture)
        formData.append("title",data.title)
        formData.append("description",data.description)

        const res=await axiosInstance.post(`/courses/${data.id}`,formData)
        toast.promise(res,{
            loading:'Adding Lecture...',
            success:(res)=>{
                return res?.data?.message
            },
            error:(error)=>{
                return error?.res?.data?.message
            }
        })

        return (await res).data
    } catch (error) {
        toast.error(error?.res?.data?.message)
    }
})

export const deleteCourseLecture=createAsyncThunk("/course/lecture/delete",async ({courseId,lectureId}) => {
    try {
        const res=await axiosInstance.delete(`/courses/${courseId}/${lectureId}`)
        toast.promise(res,{
            loading:'Deleting Lecture...',
            success:(res)=>{
                return res?.data?.message
            },
            error:(error)=>{
                return error?.res?.data?.message
            }
        })

        return (await res).data
    } catch (error) {
        toast.error(error?.res?.data?.message)
    }
})

const lectureSlice=createSlice({
    name:'lecture',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getCourseLecture.fulfilled,(state,action)=>{
            console.log(action);
            
            state.lectures=action?.payload?.lectures
        })
        builder.addCase(addCourseLecture.fulfilled,(state,action)=>{
            state.lectures.push(action?.payload?.lecture)
        })
        builder.addCase(deleteCourseLecture.fulfilled,(state,action)=>{
            state.lectures=state.lectures.filter(lecture=>lecture._id!==action?.payload?.lectureId)
        })
    }
})

export default lectureSlice.reducer;