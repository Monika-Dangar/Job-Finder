import React, { useState, useEffect } from "react";
import ResumeManager from "../../../../databaseService/ResumeManager";

const ResumeUpload = ({ card }) => {
  const [file, setFile] = useState({});
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const userID = localStorage.getItem("userID");
  // const handleFileChange = (event) => {
  //   setFile(event.target.files[0]);
  // };

  const handleUpload = async (event) => {
    const resumeFile = event.target.files[0];
    // console.log("resumeFile: ", resumeFile);

    setFile(resumeFile);

    if (!resumeFile) {
      alert("Please select a file first.");
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("userID", userID);
    // console.log("formData: ", formData);

    try {
      const response = await ResumeManager.addResumeService(formData);

      if (response) {
        setFile(resumeFile);
        // console.log("Resume added succesfully: ", response);
      }
    } catch (err) {
      setError("An error occurred while uploading the resume.");
    } finally {
      setUploading(false);
    }
  };

  const handleFileClick = () => {
    document.getElementById("resume").click();
  };

  const handleDelete = async () => {
    if (!file) {
      alert("No resume to delete.");
      return;
    }

    try {
      const response = await ResumeManager.removeResumeService(userID);
      if (response) {
        // Clear resume name after successful deletion
        setFile(null);
        // console.log("Resume removed successfully: ", response);
      }
    } catch (err) {
      setError("An error occurred while deleting the resume.");
    }
  };

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await ResumeManager.getResumeService(userID);
        if (response) {
          setFile(response.resume);
          // console.log("Resume fetched: ", response);
        }
      } catch (err) {
        setError("An error occurred while fetching the resume.");
      }
    };

    if (userID) {
      fetchResume();
    }
  }, [userID, file]);

  // console.log("filename: ", file);
  return (
    <>
      {card.title === "Resume" && (
        <div className="flex flex-col items-center w-full mt-3">
          {/* Display resume info and delete button if a resume is uploaded */}
          {file
            ? file.resumeFileName && (
                <div className="flex items-center justify-between w-full mb-3 border-2 border-gray-300 border-dashed px-2 rounded-lg">
                  <p className="text-gray-700">{file?.resumeFileName || ""}</p>
                  <button
                    onClick={handleDelete}
                    className="text-red-500 hover:underline"
                    disabled={uploading}
                  >
                    Delete
                  </button>
                </div>
              )
            : null}

          <label className="flex flex-col items-center justify-center w-full  h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ">
            <input
              id="dropzone-file"
              type="file"
              name="resume"
              onChange={handleUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={handleFileClick}
              className="mt-4 text-white font-medium rounded-lg text-sm px-5 py-2.5"
              disabled={uploading}
            >
              <div className=" flex flex-col items-center justify-center ">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">
                  Supported formats: doc, docx, rtf, pdf, up to 2MB
                </p>
              </div>
            </button>
          </label>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      )}
    </>
  );
};

export default ResumeUpload;
