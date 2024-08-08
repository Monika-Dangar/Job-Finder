import React from "react";

const PostCard = () => {
  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-screen-md  p-6 border mt-3 border-gray-200 rounded-lg shadow bg-white">
        <div className="mb-5 bg-white rounded ">
          <h5 className="mb-2 text-3xl font-bold text-center pt-2 pb-2">
            Post a Job
          </h5>
        </div>

        <form className="max-w-lg mx-auto" autoComplete="on">
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-5">
              <label
                htmlFor="jobtitle"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Job title
              </label>
              <input
                type="text"
                id="jobtitle"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="e.g Software Developer"
                required
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="location"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Job location
              </label>
              <input
                type="text"
                id="location"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="e.g Mumbai"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="mb-5">
              <label
                htmlFor="organization-name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Organization name
              </label>
              <input
                type="text"
                id="organization-name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="organization here"
                required
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Job category
              </label>
              <select
                id="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option>Choose a category</option>
                <option value="full-time">Full time</option>
                <option value="part-time">Part time</option>
                <option value="intern">Internship</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="name@example.com"
                required
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="experience"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Job experience
              </label>
              <select
                id="experience"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option>Choose year</option>
                <option value="0">0 years (fresher)</option>
                <option value="1">1 year</option>
                <option value="2">2 years</option>
                <option value="3">3 years</option>
                <option value="4">4 years</option>
                <option value="5">5 years</option>
                <option value="5+">More than 5 years</option>
              </select>
            </div>
          </div>

          {/* <div className="mb-5">
            <label
              htmlFor="openings"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              No. of openings:
            </label>
            <div className="relative flex items-center max-w-[11rem]">
              <button
                type="button"
                id="decrement-button"
                className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-l-lg p-3 h-11 focus:ring-2 focus:outline-none"
              >
                <svg
                  className="w-3 h-3 text-gray-900"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 2"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h16"
                  />
                </svg>
              </button>

              <input
                type="text"
                id="openings"
                className="bg-gray-50 border-x-0 border-gray-300 h-11 font-medium text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full"
                placeholder=""
                value="3"
                required
              />
              <button
                type="button"
                id="increment-button"
                className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-r-lg p-3 h-11 focus:ring-2 focus:outline-none"
              >
                <svg
                  className="w-3 h-3 text-gray-900"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </button>
            </div>
          </div> */}

          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your message
          </label>
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Write your thoughts here..."
          ></textarea>

          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                required
              />
            </div>
            <label
              htmlFor="remember"
              className="ml-2 text-sm font-medium text-gray-900"
            >
              Remember me
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostCard;
