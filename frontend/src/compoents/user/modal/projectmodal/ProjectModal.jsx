import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ProjectManager from "../../../../databaseService/ProjectManager";

function ProjectModal({ isOpen, onClose }) {
  const { register, handleSubmit, reset } = useForm();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const userID = localStorage.getItem("userID");

  const onSubmit = async (data) => {
    if (loading) {
      // console.log("Loading data, please wait...");
      return;
    }
    const {
      projectName,
      projectDuration,
      projectDescription,
      skillUsedProject,
      projectURL,
    } = data;
    // console.log("Form submitted", data);

    try {
      let response;
      if (project) {
        response = await ProjectManager.updateProjectService(userID, data);
      } else {
        response = await ProjectManager.addProjectService(
          userID,
          projectName,
          projectDuration,
          projectDescription,
          skillUsedProject,
          projectURL
        );
      }

      if (response) {
        setProject(response[0]);
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
        const response = await ProjectManager.getProjectService(userID);
        if (response) {
          // console.log("Fetched project: ", response[0]);
          setProject(response[0]);
          reset(response[0]);
        }
      } catch (error) {
        console.log("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEdu();
  }, [userID]);
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-sm w-full">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Projects
                </h3>
                <label>
                  Showcase your talent with best projects you have worked on
                  during college and work
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
              <div className="mt-2">
                <label
                  htmlFor="projectname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Project name
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="projectname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter the name of the project you worked on"
                  {...register("projectName", {
                    required: "Project name is required",
                  })}
                />
              </div>

              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Project duration <span style={{ color: "red" }}>*</span>
              </label>

              <div
                id="date-range-picker"
                date-rangepicker
                className="flex items-center"
              >
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                  </div>
                  <input
                    id="datepicker-range-start"
                    name="projectDuration.startDate"
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="YYYY/MM/DD"
                    {...register("projectDuration.startDate", {
                      required: "Start date is required",
                    })}
                  />
                </div>
                <span className="mx-4 text-gray-500">to</span>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                  </div>
                  <input
                    id="datepicker-range-end"
                    name="projectDuration.endDate"
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="YYYY/MM/DD"
                    {...register("projectDuration.endDate", {
                      required: "End date is required",
                    })}
                  />
                </div>
              </div>

              <div className="mt-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Project description
                </label>
                <textarea
                  id="description"
                  rows="4"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write a brief description of the project"
                  {...register("projectDescription", {
                    required: "Project description is required",
                  })}
                ></textarea>
              </div>

              <div className="mt-2">
                <label
                  htmlFor="skills"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Skills used
                </label>
                <input
                  type="text"
                  id="skills"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter the skills used in the project"
                  {...register("skillUsedProject", {
                    required: "Skills used are required",
                  })}
                />
              </div>

              <div className="mt-2">
                <label
                  htmlFor="projecturl"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Project URL
                </label>
                <input
                  type="url"
                  id="projecturl"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter the URL of the project"
                  {...register("projectURL", {
                    required: "Project URL is required",
                  })}
                />
              </div>

              <button
                type="button"
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                onClick={onClose}
              >
                Cancel
              </button>

              <button
                type="submit"
                // className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                className={`text-white ms-2 bg-blue-500 border border-blue-600 focus:outline-none hover:bg-blue-600 focus:ring-4 focus:ring-blue-200 rounded-lg text-sm px-5 py-2.5 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Save"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ProjectModal;
