import React from "react";
import bannerImg from "../assets/7.jpg.jpg";
const Banner = () => {
  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row mt-15 my-10 gap-6">
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-3 md:mt-4 bg-gray-200 p-8 rounded-lg flex flex-col justify-center">
          <div className="space-y-10">
            <h1 className="text-4xl font-bold typing">
              Welcome! Learn something <br />
              <span className="text-blue-500">new every day.</span>
            </h1>

            <p className="mt-6 text-black-600 text-base leading-relaxed">
              Discover a carefully curated collection of books designed to
              inspire learning and personal growth. From fiction and non-fiction
              to academic and competitive exam resources, our bookstore offers
              quality reads for every learner. Expand your knowledge, fuel your
              imagination, and make reading a part of your everyday life.
            </p>

            {/* <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input type="email" placeholder="mail@site.com" required />
            </label> */}
          </div>
        </div>
        <div className="order-1 ">
          <img
            src={bannerImg}
            className="w-140 h-180 rounded-xl object-cover mt-18 "
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default Banner;
