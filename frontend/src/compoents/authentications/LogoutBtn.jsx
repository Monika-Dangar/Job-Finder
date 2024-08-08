import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const lougoutHandler = () => {
    localStorage.removeItem("userID");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center "
        // className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 "
        onClick={lougoutHandler}
      >
        Logout
      </button>
    </>
  );
};

export default LogoutBtn;
