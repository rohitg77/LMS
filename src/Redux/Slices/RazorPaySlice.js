import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    key: "",
    subscriptionId: "",
    isPaymentVerified: false,
    allPayments: [],
    finalMonth:{},
    monthlySalesRecord: {},
}

export const getRazorPayId=createAsyncThunk("/razorpay/getId", async () => {
    try {
        const res = await axiosInstance.get("/payments/razorpay-key");
        return res.data;
    } catch (err) {
        toast.error("Failed to fetch Razorpay Key");
        throw err;
    }
})

export const purchaseCourseBundle=createAsyncThunk("/purchase", async () => {
    try {
        const res = await axiosInstance.post("/payments/subscribe");
        return res.data;
    } catch (err) {
        toast.error(err?.response?.data?.message);
        throw err;
    }
})

export const verifyUserPayment=createAsyncThunk("/payments/verify", async (data) => {
    try {
        const res = await axiosInstance.post("/payments/verify",{
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_subscription_id: data.razorpay_subscription_id,
            razorpay_signature: data.razorpay_signature,
        });

        return res.data;
    } catch (err) {
        toast.error(err?.response?.data?.message);
        throw err;
    }
})

export const getPaymentRecord=createAsyncThunk("/payments/record", async () => {
    try {
        const res = await axiosInstance.get("/payments?count=100");
        toast.promise(res, {
            loading: "Fetching Payment Records...",
            success: "Payment Records Fetched Successfully",
            error: "Failed to Fetch Payment Records"
        })
        return (await res).data;
    } catch (err) {
        toast.error(err?.response?.data?.message);
        throw err;
    }
})

export const cancelSubscription=createAsyncThunk("/payments/unsubscribe", async () => {
    try {
        const res = await axiosInstance.post("/payments/unsubscribe");
        toast.promise(res, {
            loading: "Cancelling subscription...",
            success: (data)=>data?.data?.message,
            error: "Failed to cancel subscription"
        })
        return (await res).data;    
    } catch (err) {
        toast.error(err?.response?.data?.message);
        throw err;
    }
})

const razorPaySlice = createSlice({
    name: "razorpay",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRazorPayId.fulfilled, (state, action) => {
                state.key = action.payload.key;
            })
            .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
                state.subscriptionId = action.payload.subscription_id;
            })
            .addCase(verifyUserPayment.fulfilled, (state, action) => {
                toast.success(action.payload.message);
                state.isPaymentVerified = action.payload.success;
            })
            .addCase(verifyUserPayment.rejected, (state, action) => {
                toast.error(action.error.message);
                state.isPaymentVerified = action?.payload?.success;
            })
            .addCase(getPaymentRecord.fulfilled, (state, action) => {
                state.allPayments = action.payload.allPayments;
                state.finalMonth = action.payload.finalMonth;
                state.monthlySalesRecord = action.payload.monthlySalesRecord;
            })
           
    }
})

export default razorPaySlice.reducer;
