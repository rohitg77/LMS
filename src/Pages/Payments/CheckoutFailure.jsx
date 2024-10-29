import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import HomeLayout from '../../Layout/HomeLayout'
import { getUserData } from '../../Redux/Slices/AuthSlice'

export default function CheckoutFailure() {

  const dispatch=useDispatch()

  useEffect(() => {
    dispatch(getUserData())
  }, [])

  return (
    <HomeLayout>
      <div className='flex flex-col items-center justify-center min-h-[90vh]'>
        <div className='flex flex-col items-center justify-center space-y-3 shadow-[0_0_10px_black] p-10 rounded-lg relative'>
          <h1 className='text-4xl font-bold text-red-500'>Payment Failed</h1>
          <p className='text-lg'>We were unable to process your payment</p>
          <p className='text-sm'>
            Please try again or contact support if the issue persists
          </p>
          <Link to="/checkout">
            <button className='w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all ease-in-out'>
              Try Again
            </button>
          </Link>
        </div>
      </div>
    </HomeLayout>
  )
}
