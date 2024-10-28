import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import HomeLayout from '../../Layout/HomeLayout'
import { getRazorPayId, purchaseCourseBundle, verifyUserPayment } from '../../Redux/Slices/RazorPaySlice'
export default function Checkout() {

    const {key,subscriptionId}=useSelector((state)=>state.razorpay)

    const paymentDetails={
        razorpay_payment_id:"",
        razorpay_subscription_id:"",
        razorpay_signature:""
    }

    const userData=useSelector((state)=>state.auth.data)

    const dispatch=useDispatch()
    const navigate=useNavigate()

    async function handleSubscription(e){
        e.preventDefault()

        if (!key || !subscriptionId) {
            return toast.error("Something went wrong")
        }
        const options={
            key:key,
            subscription_id:subscriptionId, 
            name:"Coursify",
            description:"Purchase Subscription",
            theme:{
                color:"#121212"
            },
            prefill:{
                name:userData?.fullName,
                email:userData?.email,
            },
            handler:async function(response){
                paymentDetails.razorpay_payment_id=response.razorpay_payment_id
                paymentDetails.razorpay_subscription_id=response.razorpay_subscription_id
                paymentDetails.razorpay_signature=response.razorpay_signature


                toast.success("Payment Successful")

                const res=await dispatch(verifyUserPayment(paymentDetails))

                if (res?.payload?.success) {
                    navigate("/checkout/success")
                }else{
                    navigate("/checkout/failed")
                }
            }
        }

        const paymentObject=new window.Razorpay(options)
        paymentObject.open()
    }

    async function load(){
        await dispatch(getRazorPayId())
        await dispatch(purchaseCourseBundle())
    }

    useEffect(()=>{
       load()
    },[])

  return (
    <HomeLayout>
        <div className='flex flex-col items-center justify-center min-h-[90vh]'>
            <form className='w-full max-w-md' onSubmit={handleSubscription}>
                <div className='flex flex-col items-center justify-center shadow-[0_0_10px_black] p-4 rounded-lg gap-4'>
                    <h1 className='text-2xl font-bold text-center'>
                        Subscription Details
                    </h1>
                    <p className='text-sm text-center '>
                        This purchase will allow you to access all the available courses in our platform {" "}
                        <span className='font-bold text-green-500 text-lg'>
                            <br />
                            1 Year Access
                        </span>
                        <br />
                        All the existing and new launched courses will be available to you.
                    </p>

                    <p className='text-sm text-center flex items-center justify-center gap-1'>
                        <BiRupee /> <span className='text-lg font-bold'>
                            499
                        </span> only
                    </p>

                    <div className='text-sm text-center text-gray-500'>
                        <p>100% refund On Cancellation</p>
                        <p className='text-xs'>*Terms and Conditions Apply*</p>
                    </div>
                    <button className='w-full bg-green-500 hover:bg-green-600 transition-all duration-300 text-white p-2 rounded-md'>
                        Pay Now
                    </button>
                </div>
            </form>
        </div>
    </HomeLayout>
  )
}
