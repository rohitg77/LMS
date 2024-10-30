import {ArcElement,BarElement,CategoryScale,Chart as ChartJS,Legend,LinearScale,Title,Tooltip} from "chart.js"
import { useEffect } from "react";
import {Bar, Pie} from "react-chartjs-2"
import toast from "react-hot-toast";
import {FaEye, FaTrash, FaUser, FaUserPlus} from "react-icons/fa"
import {FcMoneyTransfer,FcSalesPerformance} from "react-icons/fc"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../Layout/HomeLayout";
import { deleteCourse, getAllCourses } from "../../Redux/Slices/CourseSlice";
import { getPaymentRecord } from "../../Redux/Slices/RazorPaySlice";
import { getStatsData } from "../../Redux/Slices/StatSlice";

ChartJS.register(ArcElement,BarElement,CategoryScale,Legend,LinearScale,Title,Tooltip)


export default function AdminDashboard() {

    const dispatch=useDispatch();

    const navigate=useNavigate();

    const {allUserCount,subscribedCount}=useSelector((state) => state.stat);

    const {allPayments,monthlySalesRecord}=useSelector((state) => state.razorpay);


    const userData={
        labels:["registered Users","enrolled Users"],
        fontColor:"white",  
        datasets:[
            {
                label:"User Details",
                data:[allUserCount,subscribedCount],
                backgroundColor:["#FF5733","#33FF57"],
                borderColor:["#FF5733","#33FF57"],
                borderWidth:1
            }

        ]

    }

    const salesData={
        labels:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
        fontColor:"white",
        datasets:[
            {
                label:"Sales/Month",
                data:monthlySalesRecord,
                backgroundColor:"#33FF57",
                borderColor:"#33FF57",
                borderWidth:2
            }
        ]
    }

    const {courseData}=useSelector((state) => state.courses);

    async function initializeData(){
        await dispatch(getAllCourses())
        await dispatch(getStatsData())
        await dispatch(getPaymentRecord())
    }

    useEffect(()=>{
        initializeData()
        console.log("allPayments",allPayments)
    },[])

    async function handleCourseDelete(courseId){
        if(window.confirm("Are you sure you want to delete this course?")){
            const res=await dispatch(deleteCourse(courseId))
            if(res?.payload?.success){
                await dispatch(getAllCourses())

                toast.success(res?.payload?.message)
                
            }
        }
    }


  return (
    <HomeLayout>
        <div className="min-h-[90vh] pt-5 flex flex-col flex-wrap gap-10 text-white">
            <h1 className="text-2xl font-bold text-center text-yellow-500">
                Welcome to Admin Dashboard
            </h1>
            <div className="grid grid-cols-2 gap-5 m-auto mx-10">
                <div className="flex flex-col gap-5 items-center p-5 bg-slate-800 rounded-lg">
                    <div className="w-80 h-80">
                        <Pie data={userData}/>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                    <div className="flex p-5 gap-2  items-center justify-between">
                            <div className="flex flex-col items-center">
                            <p className="text-xl font-semibold">
                            Registered Users
                            </p>
                            <h3 className="text-2xl font-bold">
                                {allUserCount}
                                </h3>
                            </div>
                            <FaUser className="text-4xl text-yellow-500"/>
                        </div>
                        <div className="flex p-5 gap-2  items-center justify-between">
                            <div className="flex flex-col items-center">
                            <p className="text-xl font-semibold">
                            Enrolled Users
                            </p>
                            <h3 className="text-2xl font-bold">
                                {subscribedCount}
                                </h3>
                            </div>
                            <FaUserPlus className="text-5xl text-green-500"/>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-5 items-center p-5 bg-slate-800 rounded-lg">
                    <div className="w-full h-80">
                        <Bar data={salesData}/>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <div className="flex p-5 gap-2  items-center justify-between">
                        <div className="flex flex-col p-5  items-center justify-between">
                            <p className="text-xl font-semibold">
                                Total Sales
                            </p>
                            <h3 className="text-2xl font-bold">
                                {allPayments?.count}
                            </h3>
                        </div>
                        <FcSalesPerformance className="text-5xl text-green-500"/>
                        </div>
                        <div className="flex p-5 gap-2  items-center justify-between">
                            <div className="flex flex-col p-5  items-center justify-between">
                                <p className="text-xl font-semibold">
                                    Total Revenue
                                </p>
                                <h3 className="text-2xl font-bold">
                                    {allPayments?.count*499}
                                </h3>
                            </div>
                            <FcMoneyTransfer className="text-5xl text-green-500"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" mx-[10%] w-[80%] self-center flex flex-col gap-5 items-center justify-center ">
                <div className="flex items-center justify-between w-full">
                    <h1 className="text-2xl font-bold text-center text-yellow-500">
                        All Courses
                    </h1>
                    <button onClick={()=>navigate("/course/create")} className="btn btn-primary btn-md">
                        Add New Course
                    </button>
                </div>

                <div className="w-full">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-800">
                                <td className="p-2">
                                    S.No
                                </td>
                                <td className="p-2">
                                    Course Name
                                </td>
                                <td className="p-2">
                                    Course Description
                                </td>
                                <td className="p-2">
                                    Category
                                </td>
                                <td className="p-2">
                                    Instructor
                                </td>
                                <td className="p-2">
                                    Total Lectures
                                </td>
                                <td className="p-2">
                                    Actions
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                courseData?.map((course,index)=>(
                                    <tr key={course?._id} className="bg-slate-700 hover:bg-slate-600 cursor-pointer transition-all duration-300 ">
                                        <td className="p-2">
                                            {index+1}
                                        </td>
                                        <td className="p-2">
                                            <textarea readOnly className="w-40 h-auto    bg-slate-600 text-white p-2 rounded-md border-none resize-none overflow-y-auto" value={course?.title}></textarea>
                                        </td>
                                        <td className="p-2">
                                            <textarea readOnly className="w-40 h-auto    bg-slate-600 text-white p-2 rounded-md border-none resize-none overflow-y-auto" value={course?.description}></textarea>
                                        </td>
                                        <td className="p-2">
                                            {course?.category}
                                        </td>
                                        <td className="p-2">
                                            {course?.createdBy}
                                        </td>
                                        <td className="p-2">
                                            {course?.numbersOfLectures}
                                        </td>
                                        <td className="p-2 gap-2 flex items-center justify-center ">
                                            <button onClick={()=>navigate(`/course/lectures`,{state:{...course}})} className="btn btn-primary btn-sm">
                                                <FaEye/>
                                            </button>
                                            <button onClick={()=>handleCourseDelete(course?._id)} className="btn btn-error btn-sm">
                                                <FaTrash/>
                                            </button>
                                        </td>
                                    </tr>
                                    
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </HomeLayout>
  )
}
