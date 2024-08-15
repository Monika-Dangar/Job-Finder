import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LogoutBtn from "../authentications/LogoutBtn";
import logoImg from "../../assets/logo.png";

const NavBar = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
      display: true,
    },
    {
      name: "Job",
      slug: "/job",
      active: true,
      display: true,
    },
    {
      name: "Post a Job",
      slug: "/post-job",
      active: true,
      display: true,
    },
    {
      name: "Resume Builder",
      slug: "/resume-builder",
      active: true,
      display: true,
    },
    {
      name: "Userdashboard",
      slug: "/userdashboard",
      active: authStatus,
      display: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
      display: false,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
      display: false,
    },
  ];

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (slug) => {
    navigate(slug);
    if (isOpen) {
      toggleNavbar(); // Collapse the navbar if it was open
    }
  };

  return (
    <nav className="bg-white sticky top-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="https://flowbite.com/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logoImg} className="bg-blackh h-8" alt="JobFinder Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Job Finder
          </span>
        </a>

        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {navItems.map((item) =>
            item.active && item.display === false ? (
              <div key={item.name}>
                <button
                  onClick={() => handleNavClick(item.slug)}
                  className="block py-2 px-3 text-white text-sm bg-blue-700 rounded md:p-2 md:ms-2 active:text-blue-200 "
                >
                  {item.name}
                </button>
              </div>
            ) : null
          )}
          {authStatus && (
            <div>
              <LogoutBtn />
            </div>
          )}

          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-sticky"
            aria-expanded={isOpen}
            onClick={toggleNavbar}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between w-full ${
            isOpen ? "block" : "hidden"
          } md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            {navItems.map((item) =>
              item.active && item.display ? (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavClick(item.slug)}
                    className="block py-2 px-3 rounded text-blue-700 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 active:bg-violet-700 cursor-pointer"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
