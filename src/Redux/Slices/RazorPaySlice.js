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
        return (await res).data;
    } catch (error) {
        toast.error("Failed to fetch Razorpay Key");
    }
})

export const purchaseCourseBundle=createAsyncThunk("/razorpay/purchase", async () => {
    try {
        const res = await axiosInstance.post("/payments/subscribe");
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const verifyUserPayment=createAsyncThunk("/razorpay/verify", async (data) => {
    try {
        const res = await axiosInstance.post("/payments/verify",{
            razorpay_payment_id: data.paymentId,
            razorpay_subscription_id: data.subscriptionId,
            razorpay_signature: data.signature,
        });

        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const getPaymentRecord=createAsyncThunk("/razorpay/record", async () => {
    try {
        const res = await axiosInstance.get("/payments?count=100");
        toast.promise(res, {
            loading: "Loading Payment Records...",
            success: "Payment Records Fetched Successfully",
            error: "Failed to Fetch Payment Records",
        })
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const cancelSubscription=createAsyncThunk("/razorpay/unsubscribe", async () => {
    try {
        const res = await axiosInstance.post("/payments/unsubscribe");
        toast.promise(res, {
            loading: "Cancelling Subscription...",
            success: "Subscription Cancelled Successfully",
            error: "Failed to Cancel Subscription",
        })
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

const razorPaySlice = createSlice({
    name: "razorpay",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getRazorPayId.fulfilled, (state, action) => {
            state.key = action?.payload?.key;
        })
        .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
            state.subscriptionId = action?.payload?.subscriptionId;
        })
        .addCase(verifyUserPayment.fulfilled, (state, action) => {
            state.isPaymentVerified = action?.payload?.success;
        })
        .addCase(getPaymentRecord.fulfilled, (state, action) => {
            state.allPayments = action?.payload?.payments;
            state.finalMonth = action?.payload?.finalMonth;
            state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
        })
        .addCase(cancelSubscription.fulfilled, (state) => {
            state.isPaymentVerified = false;
        })
    }
})

export default razorPaySlice.reducer;
