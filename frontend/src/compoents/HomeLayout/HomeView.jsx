import React from "react";
import { useNavigate } from "react-router-dom";

const HomeView = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="bg-center bg-no-repeat bg-[url('https://img.freepik.com/free-vector/business-people-searching-job-applicants_1262-19721.jpg?t=st=1721375159~exp=1721378759~hmac=0c9d0879ad1e730a281b25c274fb6f720eb1a3dcb80f5b15414e923b726bd308&w=1380')] bg-gray-500 bg-blend-multiply">
        <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
            Explore thousands of jobs on Job Finder.
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
            Find your dream job with Job Finder. Search thousands of positions,
            connect with top employers, and launch your career!
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <button
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
              onClick={() => navigate("./job")}
            >
              Get started
              <svg
                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeView;
