import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import signunImage from "../../assets/signup.jpg";
import SignupManager from "../../databaseService/SignupManager";

const SignupCompoent = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    const { username, emailID, password, mobilenumber } = data;

    setError("");
    try {
      // Database endpoint
      const response = await SignupManager.signupService(
        username,
        emailID,
        password,
        mobilenumber
      );
      // console.log("Succesful signup", response);

      if (response) {
        // Update values in store
        // dispatch(
        //   signup({ userID: response.user._id, userData: response.user })
        // ); // Dispatch a plain object action
        navigate("/");
      } else {
        setError("Error ouccured while registering");
      }
    } catch (error) {
      console.log("Signup error", error);
      setError("Regiseting failed. Please try again.");
    }
  };
  return (
    <>
      <div className="singup-container grid grid-cols-12 gap-4 ">
        <div className="login-image col-span-6 overflow-hidden h-screen hidden md:grid relative">
          <img
            src={signunImage}
            alt="Login image description"
            className="object-cover w-full h-full absolute top-0 left-0"
          />
        </div>

        <div className="signup-form col-span-12 md:col-span-6 flex flex-col items-center justify-center p-12 rounded bg-white dark:bg-gray-800 h-">
          <h3 className="text-xl font-semibold text-gray-900 mb-8">
            Register to our platfrom
          </h3>

          <div>
            <svg
              className="w-15 h-12 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
          </div>
          <form
            className="space-y-4"
            action="#"
            method="post"
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="on"
          >
            <div className="form-group">
              <label
                htmlFor="username"
                className="block mb-2 text-base font-medium text-gray-700 dark:text-gray-200"
              >
                Username
              </label>
              <input
                {...register("username")}
                type="text"
                id="username"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                placeholder="Username"
                required
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="email"
                className="block mb-2 text-base font-medium text-gray-700 dark:text-gray-200"
              >
                Email
              </label>
              <input
                {...register("emailID")}
                type="email"
                id="email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                placeholder="name@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="password"
                className="block mb-2 text-base font-medium text-gray-700 dark:text-gray-200"
              >
                Your password
              </label>
              <input
                {...register("password")}
                type="password"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="tel"
                className="block mb-2 text-base font-medium text-gray-700 dark:text-gray-200"
              >
                Your mobile numebr
              </label>
              <input
                {...register("mobilenumber")}
                type="tel"
                pattern="[0-9]{10}"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                placeholder="0123456789"
                required
              />
            </div>

            {error && <p className="text-center">{error}</p>}

            <div className="form-group flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  className="w-5 h-5 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-base font-medium text-gray-700 dark:text-gray-200"
                >
                  Remember me
                </label>
              </div>
              {/* <a href="#" className="text-base text-blue-600 hover:underline dark:text-blue-400">Lost Password?</a> */}
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Register your account
            </button>
            {/* <div className="text-base font-medium text-gray-700 dark:text-gray-200 mt-6">
        Not registered? <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">Create account</a>
      </div> */}
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupCompoent;
