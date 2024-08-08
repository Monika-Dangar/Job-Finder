import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import EmploymentManager from "../../../../databaseService/EmploymentManager";

function EmploymentModal({ isOpen, onClose }) {
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const [employ, setEmploy] = useState(null);
  const [loading, setLoading] = useState(false);
  const userID = localStorage.getItem("userID");

  useEffect(() => {
    const fetchEmploy = async () => {
      if (!userID) return; // Return early if userID is not available

      setLoading(true);
      try {
        const response = await EmploymentManager.getEmployService(userID);
        if (response && response[0]) {
          const data = response[0];
          setEmploy(data);
          reset(data); // Use reset to set default values for the form
        }
      } catch (error) {
        console.error("Error fetching employ:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchEmploy();
    }
  }, [userID, isOpen, reset]);

  const onSubmit = async (data) => {
    if (loading) return;

    try {
      let response;
      if (employ) {
        response = await EmploymentManager.updateEmployService(userID, data);
      } else {
        response = await EmploymentManager.addEmployService(
          userID,
          data.employed,
          data.employmentType,
          data.companyName,
          data.jobTitle,
          data.salary,
          data.skillUsed
        );
      }

      if (response) {
        setEmploy(response[0]);
        onClose();
        reset(response[0]);
      } else {
        console.error("Error in submission:", response);
      }
    } catch (error) {
      console.error("Error in submission:", error);
    }
  };

  const employed = watch("employed");
  const employmentType = watch("employmentType");

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-sm w-full">
            <div className="flex items-center justify-between mb-4">
              <div className="grid">
                <h3 className="text-xl font-semibold text-gray-900">
                  Employment details
                </h3>
                <label className="text-sm">
                  Details like job title, company name, etc. help employers
                  understand your work
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
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Is this your current employment?
                <span className="text-red-600">*</span>
              </label>
              <div className="flex">
                <label className="mr-3">
                  Yes
                  <input
                    type="radio"
                    value="true"
                    className="ml-2"
                    {...register("employed", { required: true })}
                    checked={employed === "true"}
                  />
                </label>
                <label className="mr-3">
                  No
                  <input
                    type="radio"
                    value="false"
                    className="ml-2"
                    {...register("employed", { required: true })}
                    checked={employed === "false"}
                  />
                </label>
              </div>

              <label className="block mb-2 text-sm font-medium text-gray-900">
                Employment type
                <span className="text-red-600">*</span>
              </label>
              <div className="flex">
                <label className="mr-3">
                  Full time
                  <input
                    type="radio"
                    value="Full time"
                    className="ml-2"
                    {...register("employmentType", { required: true })}
                    checked={employmentType === "Full time"}
                  />
                </label>
                <label className="mr-3">
                  Part time
                  <input
                    type="radio"
                    value="Part time"
                    className="ml-2"
                    {...register("employmentType", { required: true })}
                    checked={employmentType === "Part time"}
                  />
                </label>
                <label className="mr-3">
                  Internship
                  <input
                    type="radio"
                    value="Internship"
                    className="ml-2"
                    {...register("employmentType", { required: true })}
                    checked={employmentType === "Internship"}
                  />
                </label>
              </div>

              <div className="mt-2">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Current company name
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Type your organization"
                  {...register("companyName")}
                />
              </div>

              <div className="mt-2">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Current job title
                  <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Type your designation"
                  {...register("jobTitle", { required: true })}
                />
              </div>

              <div className="mt-2">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Current salary
                </label>
                <input
                  type="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="e.g. 450000"
                  {...register("salary")}
                />
              </div>

              <div className="mt-2">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Skills used
                  <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Add skills (comma-separated)"
                  {...register("skillUsed", { required: true })}
                />
              </div>
              
              <button
                type="button"
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 rounded-lg text-sm px-5 py-2.5"
                onClick={onClose}
              >
                Close
              </button>
              <button
                type="submit"
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

export default EmploymentModal;
