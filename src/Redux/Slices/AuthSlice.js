import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false,
    role: localStorage.getItem("role") || "",
    data: JSON.parse(localStorage.getItem("data")) || {}
};

export const createAccount = createAsyncThunk('/auth/signup', async (data) => {
    try {
        let res = await axiosInstance.post('user/register', data);
        toast.promise(res, {
            loading: "Creating account...",
            success: (data) => data?.data?.message,
            error: "Failed to create account"
        });
        return await res.data
    } catch (error) {
        toast.error(
            error?.response?.data?.message || "An error occurred while creating account"
        );
    }
});

export const login = createAsyncThunk('/auth/login', async (data) => {
    try {
        let res = await axiosInstance.post('user/login', data);
        toast.promise(res, {
            loading: "Authenticating...",
            success: (data) => data?.data?.message,
            error: "Failed to login"
        });
        return res.data;
    } catch (error) {
        toast.error(
            error?.response?.data?.message || "An error occurred during login"
        );
    }
});

export const logout = createAsyncThunk("/auth/logout", async () => {
    try {
        let res = await axiosInstance.get('user/logout');
        toast.promise(res, {
            loading: "Logging out...",
            success: (data) => data?.data?.message,
            error: "Failed to logout"
        });
        return res.data;
    } catch (error) {
        toast.error(
            error?.response?.data?.message || "An error occurred during logout"
        );
    }
});

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        
    },
    extraReducers:(builder)=>{
        builder
        .addCase(login.fulfilled,(state,action)=>{
            localStorage.setItem("data",action?.payload?.user)
            localStorage.setItem("role",action?.payload?.user?.role)
            localStorage.setItem("isLoggedIn",true)
            state.isLoggedIn=true
            state.data=action?.payload?.user
            state.role=action?.payload?.user?.role
        })
        .addCase(logout.fulfilled,(state)=>{
            localStorage.removeItem("data")
            localStorage.removeItem("role")
            localStorage.removeItem("isLoggedIn")
            state.isLoggedIn=false
            state.data={}
            state.role=""
        })
    }
})

// export const {} =authSlice.actions

export default authSlice.reducer