import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import HomeLayout from '../../Layout/HomeLayout'
import { getUserData } from '../../Redux/Slices/AuthSlice'

export default function CheckoutSuccess() {

    const dispatch=useDispatch()

    useEffect(() => {
        dispatch(getUserData())
    }, [])

  return (
    <HomeLayout>
        <div className='flex flex-col items-center justify-center min-h-[90vh]'>
            <div className='flex flex-col items-center justify-center space-y-3 shadow-[0_0_10px_black] p-10 rounded-lg'>
                <h1 className='text-4xl font-bold text-green-500'>Payment Successful</h1>
                <p className='text-lg '>Thank you for your purchase</p>
                <p className='text-sm'>
                    Now you can access your course
                </p>
                <Link to="/">
                    <button className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all ease-in-out'>
                    Go to Dashboard
                </button>
                </Link>
            </div>
        </div>
    </HomeLayout>
  )
}
