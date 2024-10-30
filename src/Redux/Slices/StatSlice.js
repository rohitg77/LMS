import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    allUserCount: 0,
    subscribedCount: 0,
}

export const getStatsData=createAsyncThunk("stats/get",async () => {
    try {
        const res=toast.promise(
            axiosInstance.get("/admin/stats/users"),
            {
                loading:"Fetching Stats...",
                success:"Stats Fetched Successfully",
                error:"Failed to Fetch Stats"
            }
        )
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

const statSlice = createSlice({
    name: "stat",
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder.addCase(getStatsData.fulfilled,(state,action)=>{
            console.log(action?.payload)
            state.allUserCount=action?.payload?.allUserCount
            state.subscribedCount=action?.payload?.subscribedUserCount
        })
    }
})

export default statSlice.reducer;

