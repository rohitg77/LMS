import toast from 'react-hot-toast';
import { useDispatch,useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import HomeLayout from '../../Layout/HomeLayout';
import { getUserData } from '../../Redux/Slices/AuthSlice';
import { cancelSubscription } from '../../Redux/Slices/RazorPaySlice';

export default function Profile() {

    const dispatch = useDispatch();
    const navigate=useNavigate()
    const userData = useSelector((state) => state?.auth?.data);

    async function handleCancelSubscription(){
        try {
            toast.loading("Cancelling subscription...")
            await dispatch(cancelSubscription())
            await dispatch(getUserData())
            toast.dismiss()
            toast.success("Subscription cancelled successfully")
            navigate("/")
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
  return (
    <HomeLayout>
        <div className='flex flex-col items-center justify-center min-h-[90vh] bg'>
            <div className='flex flex-col items-center justify-center gap-4 text-white w-80 shadow-2xl p-4 rounded-lg'>
                <img src={userData?.avatar?.secure_url} alt="profile" className='w-20 h-20 rounded-full object-cover border-2 border-black' />
                <h1 className='text-2xl font-bold capitalize'>{userData?.fullName}</h1>
                <div className='flex items-center justify-center gap-2'>
                    <label htmlFor="email" className='text-sm font-medium'>Email:</label>
                    <p id='email' className='text-sm'>{userData?.email}</p>
                </div>
                <div className='flex items-center justify-center gap-2'>
                    <label htmlFor="role" className='text-sm font-medium'>Role:</label>
                    <p id='role' className='text-sm'>{userData?.role==="USER" ? "Student" : "Admin"}</p>
                </div>
                <div className='flex items-center justify-center gap-2'>
                    <label htmlFor="subscription" className='text-sm font-medium'>Subscription:</label>
                    <p id='subscription' className='text-sm'>{userData?.subscription?.status==="active" ? "Active" : "Inactive"}</p>
                </div>
                <div className='flex items-center justify-center w-full gap-4'>
                    <Link to="/user/change-password">
                    <button className='btn btn-primary w-full'>
                        Change Password
                    </button>
                    </Link>
                    <Link to="/user/update-profile">
                    <button className='btn btn-primary w-full'>
                        Update Profile
                    </button>
                    </Link>
                </div>
                {
                    userData?.subscription?.status==="active" && (
                       
                            <button onClick={handleCancelSubscription} className='btn btn-warning w-full'>
                                Cancel Subscription
                            </button>
                       
                    )
                }
            </div>
        </div>
    </HomeLayout>
  )
}
