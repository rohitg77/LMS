import { useNavigate } from 'react-router-dom'


export default function NoLecture() {
  const navigate = useNavigate()

  return (
        <div className='h-screen   w-full flex flex-col items-center justify-center text-white'>
      <h1 className='text-4xl font-bold mb-4 text-yellow-500'>
        No Lectures Available
      </h1>
      <p className='text-lg mb-8'>
        Please contact the administrator or check back later.
      </p>
      <button 
        onClick={() => navigate(-1)}
        className='bg-yellow-500 px-6 py-3 rounded-md font-semibold hover:bg-yellow-600 transition-all duration-300'
      >
        Go Back
      </button>
    </div>
  )
}
