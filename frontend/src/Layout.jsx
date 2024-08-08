import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./compoents/header/NavBar";
import Footer from "./compoents/footer/Footer";
import { useDispatch } from "react-redux";
import { login } from "./store/authSlice"; // Assuming authSlice for login/logout actions

const Layout = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initial login state

  useEffect(() => {
    // const storedUserData = localStorage.getItem('userData'); // Use 'userData' key

    const storedUserID = localStorage.getItem("userID"); // Use 'userID' key

    if (storedUserID) {
      try {
        // const parsedUserID = JSON.parse(storedUserID); // Parse JSON for security

        const parsedUserID = storedUserID; // Parse JSON for security
        dispatch(login(parsedUserID)); // Dispatch login action
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem("userID"); // Remove potentially corrupted data
      }
    }

    setLoading(false); // Set loading to false after authentication check
  }, [dispatch]);

  return (
    !loading && (
      <div className="flex flex-col min-h-screen">
        <NavBar isLoggedIn={isLoggedIn} /> {/* Pass login state to Header */}
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    )
  );
};

export default Layout;
