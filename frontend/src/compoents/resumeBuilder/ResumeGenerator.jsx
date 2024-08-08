import React, { useState } from "react";
import ResumeGeneratorMangaer from "../../databaseService/ResumeGeneratorManager";

const ResumeGenerator = () => {
  const [resumeContent, setResumeContent] = useState(null);
  const [error, setError] = useState("");

  const userID = localStorage.getItem("userID");

  const handleGenerateResume = async (e) => {
    e.preventDefault();
    // console.log("Clicked on handleGenerateResume");
    try {
      const response = await ResumeGeneratorMangaer.getAllUserData(userID);
      // console.log("got response: ", response.data);
      setResumeContent(response.data.resumeContent);
      setError("");
    } catch (err) {
      setError("Error generating resume. Please try again.");
      console.error(err);
    }
  };
  // console.log("ResumeContent: ", resumeContent);
  return (
    <>
      <div className="bg-gray-100 flex justify-center">
        {/* Content area with scrolling */}
        <div className="p-6 mt-4 bg-white w-full max-w-screen-md border-gray-200 rounded-lg shadow min-h-screen">
          <h1 className="text-2xl text-center font-bold mb-4">
            Resume Generator
          </h1>
          {error && <p className="text-red-500">{error}</p>}
          {resumeContent ? (
            <div>
              <h2 className="text-xl font-semibold">Summary</h2>
              <p>{resumeContent.summary}</p>
              <h2 className="text-xl font-semibold mt-4">Key Points</h2>
              <p>{resumeContent.keypoints}</p>
              <h2 className="text-xl font-semibold mt-4">
                Job Responsibilities
              </h2>
              <p>{resumeContent.jobResponsibilities}</p>
              <h2 className="text-xl font-semibold mt-4">Education Summary</h2>
              <p>{resumeContent.educationSummary}</p>
              <h2 className="text-xl font-semibold mt-4">Projects Summary</h2>
              <p>{resumeContent.projectsSummary}</p>
            </div>
          ) : (
            <>
              <div className="text-center my-40">
                <h1 className="text-2xl ">Hello fellow user!!</h1>
                <h2 className="text-xl">
                  To generate resume give your accurate details in user
                  dashboard
                </h2>
              </div>
            </>
          )}
        </div>

        {/* Input field fixed at the bottom */}
        <div className=" border-gray-200 w-full max-w-screen-md fixed bottom-0">
          <form onSubmit={handleGenerateResume}>
            <label htmlFor="chat" className="sr-only">
              Your message
            </label>
            <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 ">
              <textarea
                id="chat"
                rows="1"
                className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your message..."
              ></textarea>
              <button
                type="submit"
                className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
              >
                <svg
                  className="w-5 h-5 rotate-90 rtl:-rotate-90"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                </svg>
                <span className="sr-only">Send message</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResumeGenerator;
