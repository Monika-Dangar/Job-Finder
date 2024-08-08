import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import LoginManager from "../../databaseService/LoginManager";
import UserImageManager from "../../databaseService/UserImageManager";
import BasicLoadingCard from "./BasicLoadingCard";

const BasicInfoCard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userID = localStorage.getItem("userID");

  useEffect(() => {
    const fetchBasicInfo = async () => {
      try {
        setLoading(true);
        const response = await LoginManager.getUserSerivce(userID);
        if (response) {
          setInfo(response);
        }
      } catch (error) {
        setError("Error fetching data");
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserImage = async () => {
      try {
        // const filename = info?.profileImage; // Assuming this is a filename or identifier
        // const filename = info?.profileImage?.imageFileName; // Extract filename
        // console.log("Fetching image with filename:", filename);

        // if (filename) {
        const response = await UserImageManager.getUserImageService(userID);
        if (response) {
          setInfo((prevInfo) => ({ ...prevInfo, profileImage: response }));
        }
        // }
      } catch (error) {
        setError("Error fetching image");
        console.error("Error fetching image: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBasicInfo();
    fetchUserImage();
  }, [userID]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    console.log("file: ", file);

    if (!file) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", file);
    formData.append("userID", userID); // Correctly append userID

    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      const response = await UserImageManager.addUserImageService(formData);

      if (response) {
        console.log("Image uploaded successfully:", response);
      }
    } catch (error) {
      setError("An error occurred while uploading the file.");
      console.error(
        "Error uploading image:",
        error.response?.data || error.message
      );
    }
  };

  const handleModal = () => {
    setModalOpen(!modalOpen);
  };

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    if (!userID) return console.log("Missing userID");

    try {
      await LoginManager.updateUserService(userID, data);
      setInfo(data);
      handleModal();
    } catch (error) {
      console.error("Error while updating user:", error);
    }
  };

  if (loading) {
    return <BasicLoadingCard />;
  }

  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="bg-white mt-10 border border-gray-200 rounded-lg shadow ">
        <div className="flex flex-row py-5 px-6">
          <div className="relative">
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              className="hidden"
              onChange={handleFileUpload}
            />
            <img
              className="w-24 h-24 rounded-full"
              src={info?.profileImage || "/default-image-url"}
              alt="Profile"
            />
            {error && <p className="text-red-500">{error}</p>}
          </div>

          <div className="mx-5">
            <button className="btn flex items-center" onClick={handleModal}>
              <p className="text-xl mr-20 cursor-pointer font-medium text-gray-900">
                {info?.username || "loading...."}
              </p>
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </p>
            </button>

            <div className="flex flex-col items-start">
              <button type="button" onClick={handleModal}>
                <span>{info?.emailID || "Email"}</span>
              </button>

              <button className="btn" onClick={handleModal}>
                <span>{info?.mobilenumber || "Phone number"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div
          id="profile-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex items-center justify-center"
        >
          <div className="relative p-4 w-full max-w-sm max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  All about you
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={handleModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="p-4 md:p-5">
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <label
                      htmlFor="username"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Enter Name
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      defaultValue={info?.username || ""}
                      {...register("username")}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="emailID"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="emailID"
                      id="emailID"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      defaultValue={info?.emailID || ""}
                      {...register("emailID")}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="mobilenumber"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Phone number
                    </label>
                    <input
                      type="text"
                      name="mobilenumber"
                      id="mobilenumber"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      defaultValue={info?.mobilenumber || ""}
                      {...register("mobilenumber")}
                      required
                    />
                  </div>

                  <div className="flex space-x-2">
                    <button
                      type="button"
                      className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5"
                      onClick={handleModal}
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
          </div>
        </div>
      )}
    </>
  );
};

export default BasicInfoCard;
