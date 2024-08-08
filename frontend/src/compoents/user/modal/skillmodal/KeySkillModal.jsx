import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SkillManager from "../../../../databaseService/SkillManager";

function KeySkillModal({ isOpen, onClose }) {
  const { register, handleSubmit } = useForm({});
  const [error, setError] = useState();

  const userID = localStorage.getItem("userID");

  const onSubmit = async (data) => {
    // console.log("Form data submitted:", data); // Add this log
    const { skillname } = data;

    try {
      const response = await SkillManager.addSkillService(userID, skillname);

      if (response.status === 201) {
        // console.log("Skill added: ", response);
        onClose();
      } else if (response.status === 400) {
        setError("Skill Alredy exists");
        // console.log("Skill Not Added");
      }
    } catch (error) {
      console.error("Error adding skill:", error);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-sm w-full">
            <div className="flex items-center justify-between mb-4">
              <div className="grid">
                <h3 className="text-xl font-semibold text-gray-900">
                  Key skill
                </h3>
                <label className="text-sm">
                  Add skills that best define your expertise, e.g., Direct
                  Marketing, Oracle, Java, etc. (Minimum 1)
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
              <div className="mb-5">
                <label
                  htmlFor="skillname"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Skill
                </label>
                <input
                  type="text"
                  id="skillname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="e.g. Javascript, Ms.Excel"
                  required
                  {...register("skillname")}
                />
              </div>
              {error && <p>{error}</p>}
              <div className="flex space-x-2">
                <button
                  type="button"
                  className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5"
                  onClick={onClose}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default KeySkillModal;
