import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import EducationManager from "../../../../databaseService/EducationManager";

function EducationModal({ isOpen, onClose }) {
  const { register, handleSubmit, reset } = useForm();
  const [edu, setEdu] = useState();
  const [loading, setLoading] = useState(false);
  const userID = localStorage.getItem("userID");

  const onSubmit = async (data) => {
    if (loading) {
      // console.log("Loading data, please wait...");
      return;
    }

    // console.log("Form submitted", data);
    const { degree, course, courseType } = data;
    try {
      let response;
      if (edu) {
        response = await EducationManager.updateEmployService(userID, data);
      } else {
        response = await EducationManager.addEduService(
          userID,
          degree,
          course,
          courseType
        );
      }

      if (response) {
        setEdu(response[0]);
        // reset(response[0]);
        onClose();
      } else {
        console.error("Error in submission:", response);
      }
    } catch (error) {
      console.error("Error in submission:", error);
    }
  };

  useEffect(() => {
    const fetchEdu = async () => {
      setLoading(true);
      try {
        const response = await EducationManager.getEduService(userID);
        if (response) {
          // console.log("Fetched edu: ", response[0]);
          setEdu(response[0]);
          reset(response[0]);
        }
      } catch (error) {
        console.log("Error fetching employ:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEdu();
  }, [userID]);

  // console.log("current edu: ", edu);
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-sm w-full">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Education
                </h3>
                <label>
                  Details like course, university, and more, help recruiters
                  identify your educational background
                </label>
              </div>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-900 rounded-lg p-2"
                onClick={onClose}
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.707 4.293a1 1 0 0 1 0 1.414L11.414 10l3.293 3.293a1 1 0 1 1-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 0 1-1.414-1.414L8.586 10 5.293 6.707a1 1 0 0 1 1.414-1.414L10 8.586l3.293-3.293a1 1 0 0 1 1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Qulification/Degree
              </label>
              <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("degree", { required: true })}
              >
                <option value="">Choose degree</option>
                <option value="PhD">Doctorate/PhD</option>
                <option value="PG">Masters/Post-Graduation</option>
                <option value="UG">Graduation</option>
                <option value="12th">12th</option>
                <option value="10th">10th</option>
                <option value="below">Below 10th</option>
              </select>

              <div className="mt-2">
                <label
                  htmlFor="skill"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Course
                </label>
                <input
                  type="text"
                  id="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Add course"
                  required
                  {...register("course", { required: true })}
                />
              </div>

              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Course type
              </label>
              <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("courseType", { required: true })}
              >
                <option value="">Choose a course</option>
                <option value="full time">Full time</option>
                <option value="part time">Part time</option>
                <option value="distance">Distance</option>
              </select>

              <button
                type="button"
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                onClick={onClose}
              >
                Cancel
              </button>

              <button
                type="submit"
                // className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                className={`text-white ms-2 bg-blue-500 border border-blue-600 focus:outline-none hover:bg-blue-600 focus:ring-4 focus:ring-blue-200 rounded-lg text-sm px-5 py-2.5 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "loading..." : "Save"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default EducationModal;
