import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import HomeLayout from '../../Layout/HomeLayout';

export default function CourseDescription() {
    const { state } = useLocation();
    const { role, data } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    return (
        <HomeLayout>
            <div className="min-h-[90vh] pt-12 px-6 md:px-20 flex flex-col items-center justify-center text-white bg-base-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-10 w-full max-w-5xl">
                    <div className="space-y-5">
                        <img
                            className="w-full h-80 object-cover rounded-lg shadow-lg"
                            src={state?.thumbnail?.secure_url}
                            alt="course-thumbnail"
                        />
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-xl">
                                <p className="font-semibold">
                                    <span className="text-yellow-500 font-bold">
                                        Total Lectures:{" "}
                                    </span>
                                    {state?.numberOfLectures}
                                </p>
                                <p className="font-semibold">
                                    <span className="text-yellow-500 font-bold">
                                        Instructor:{" "}
                                    </span>
                                    {state?.createdBy}
                                </p>
                            </div>
                            {role === "ADMIN" || data?.subscription?.status === "active" ? (
                                <button onClick={()=> navigate("/course/lectures",{state:{...state}})} className="btn btn-warning text-xl w-full rounded-md font-bold hover:bg-yellow-500 transition-all ease-in-out duration-300">
                                    Watch Lectures
                                </button>
                            ) : (
                                <button onClick={()=> navigate("/checkout")} className="btn btn-warning text-xl w-full rounded-md font-bold hover:bg-yellow-500 transition-all ease-in-out duration-300">
                                    Subscribe to Course
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-4 text-xl">
                        <h1 className="text-3xl font-bold text-yellow-500 text-center mb-4">
                            {state?.title}
                        </h1>
                        <p className="text-yellow-500 font-bold">Course Description:</p>
                        <p className="text-base-content">{state?.description}</p>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}
