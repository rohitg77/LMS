import React from "react";

import aboutMainImage from "../Assets/Images/aboutMainImage.png";
import apj from "../Assets/Images/QuotesPersonalityImage/apj.png";
import billGates from "../Assets/Images/QuotesPersonalityImage/billGates.png";
import einstein from "../Assets/Images/QuotesPersonalityImage/einstein.png";
import nelsonMandela from "../Assets/Images/QuotesPersonalityImage/nelsonMandela.png";
import steveJobs from "../Assets/Images/QuotesPersonalityImage/steveJobs.png";
import HomeLayout from "../Layout/HomeLayout";
function AboutUs() {
  return (
    <HomeLayout>
      <div className="pl-20 pt-20 flex flex-col text-white">
        <div className="flex items-center mx-10 gap-5">
          <section className="w-1/2 space-y-10">
            <h1 className="text-5xl text-yellow-500 font-semibold">
              Affordable & Quality Education
            </h1>
            <p className="text-xl text-gray-200">
              Our goal is to provide Affordable and quality Education to the
              world. we are providing the platform to aspiring students to share
              their skills , creativity and knowledge to empower and contribute
              in the growth and wellness of mankind
            </p>
          </section>
          <div className="w-1/2">
            <img
                id="test1"
                style={{
                    filter: "drop-shadow(0px,10px,10px,rgb(0,0,0))",
                }}
              className="drop-shadow-2xl"
              src={aboutMainImage}
              alt="aboutMainImage"
            />
          </div>
        </div>
        <div className="carousel w-1/2 m-auto">
          <div id="slide1" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
              <img
                src={apj}
                className="w-40 rounded-full border-2 border-gray-400"
              />
              <h3 className="text-2xl font-semibold">Nelson Mandela</h3>
              <p className="text-xl text-gray-200">
                {'"Education is the most powerful tool you can use to change the world."'}
              </p>
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide5" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide2" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
          <div id="slide2" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
              <img
                src={einstein}
                className="w-40 rounded-full border-2 border-gray-400"
              />
              <h3 className="text-2xl font-semibold">Albert Einstein</h3>
              <p className="text-xl text-gray-200">
                {'"Education is not the learning of facts, but the training of the mind to think."'}
              </p>
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide1" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide3" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
          <div id="slide3" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
              <img
                src={steveJobs}
                className="w-40 rounded-full border-2 border-gray-400"
              />
              <h3 className="text-2xl font-semibold">Steve Jobs</h3>
              <p className="text-xl text-gray-200">
                {'"Innovation distinguishes between a leader and a follower."'}
              </p>
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide2" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide4" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
          <div id="slide4" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
              <img
                src={billGates}
                className="w-40 rounded-full border-2 border-gray-400"
              />
              <h3 className="text-2xl font-semibold">Bill Gates</h3>
              <p className="text-xl text-gray-200">
                {'"Technology is just a tool. In terms of getting the kids working together and motivating them, the teacher is the most important."'}
              </p>
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide3" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide5" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
          <div id="slide5" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
              <img
                src={nelsonMandela}
                className="w-40 rounded-full border-2 border-gray-400"
              />
               <h3 className="text-2xl font-semibold">Nelson Mandela</h3>
              <p className="text-xl text-gray-200">
                {'"Education is the most powerful tool you can use to change the world."'}
              </p>
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide4" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide1" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default AboutUs;
