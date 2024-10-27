import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BsPersonCircle } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import HomeLayout from '../../Layout/HomeLayout';
import { getUserData, updateProfile } from '../../Redux/Slices/AuthSlice';

export default function EditProfile() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [data,setData] = useState({
        fullName:"",
        email:"",
        avatar:undefined,
        previewAvatar:"",
        id:useSelector((state) => state?.auth?.data?._id)
    });

    const handleChange = (e) => {
        const {name,value} = e.target;
        setData({...data,[name]:value});
    }

    function handleImageUpload(e){
        const file = e.target.files[0];
        if (file) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.addEventListener("load",function(){
                setData({...data,avatar:file,previewAvatar:fileReader.result});
            });
        }
    }

    async function handleSubmit(e){
        e.preventDefault();
        if (!data.fullName || !data.avatar) {
            toast.error("Please fill all the fields");
            return;
        }

        if (data.fullName.length < 3 || data.fullName.length > 20) {
            toast.error("Name must be between 3 and 20 characters");
            return;
        }

        const formData = new FormData();
        formData.append("fullName",data.fullName);
        formData.append("avatar",data.avatar);

        await dispatch(updateProfile({id:data.id,data:formData}));

        await dispatch(getUserData());

        navigate("/user/profile");
    }

  return (
    <HomeLayout>
        <div className='flex flex-col items-center justify-center min-h-[90vh] bg'>
            <div className='flex flex-col items-center justify-center gap-4 text-white w-80 shadow-2xl p-4 rounded-lg'>
                <h1 className='text-2xl font-bold capitalize'>Edit Profile</h1>
                <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-4 w-full'>
                <label htmlFor="avatar" className='w-full p-2 rounded-md cursor-pointer flex justify-center'>
                        {
                            data?.previewAvatar ?(
                                <img src={data?.previewAvatar} alt="avatar" className='w-20 h-20 rounded-full object-cover border-2 border-black' />
                            ) : (
                               <BsPersonCircle className='w-20 h-20 text-white' />
                            )
                        }
                    </label>
                    <input type="file" name="avatar" id="avatar" className='hidden' onChange={handleImageUpload}
                        accept='.jpg,.jpeg,.png .webp'
                     />
                    <input type="text" name="fullName" placeholder='Full Name' className='w-full p-2 rounded-md' onChange={handleChange} />
                    <button type='submit' className='bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600 transition-all duration-300'>Update</button>
                    <Link to="/user/profile" className='bg-red-500 text-white p-2 rounded-md w-full hover:bg-red-600 transition-all duration-300 flex items-center justify-center gap-2'>
                        <AiOutlineArrowLeft /> Go Back to Profile
                    </Link>
                </form>
            </div>
        </div>
    </HomeLayout>
  )
}
