import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import logo from '../assets/AgroLogo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (dropdownTitle) => {
    if (openDropdown === dropdownTitle) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(dropdownTitle);
    }
  };

  const closeDropdowns = () => {
    setOpenDropdown(null);
  };
  const navigate = useNavigate();
  const { user, logOut, userDataContent } = useAuth();


  const handleSignOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const dropdownNames = [
    { label: "About Us", path: "/workinprogress" },
    { label: "Services", path: "/workinprogress" },
    { label: "Contact", path: "/workinprogress" },
  ];

  const dropdownFarmers = [
    { label: "Registration for Share Problem", path: "/workinprogress" },
    { label: "Registration for Forward Linkage and Backward Linkage", path: "/workinprogress" },
    { label: "Registration for Technial Advisories", path: "/workinprogress" }
  ];


  return (
    <nav className="flex z-20 flex-wrap items-center justify-between w-full p-6 mb-10 bg-white  lg:px-20 fixed shadow-md">
      <div className="flex items-center flex-shrink-0 mr-6 text-black">
        <Link to="/">
          <img src={logo} className="z-0 mr-2 w-full h-20" alt="avlogo" />
        </Link>
      </div>
      <div className="block lg:hidden">
        <button
          className="flex items-center px-3 py-2 text-primary-200 border border-primary-600 rounded hover:text-black hover:border-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 fill-current"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
      <div className={`lg:flex-grow ${isOpen ? "block" : "hidden"} w-full lg:flex lg:items-center lg:w-auto`}>
        <Link
          to="/aboutUs"
          className="block mt-4 mr-4 text-black font-semibold text-lg lg:inline-block lg:mt-0 hover:text-primary-700"
          style={{ fontFamily: "cursive" }}
        >
          About Us
        </Link>
        <div className="text-sm lg:flex-grow">
          {userDataContent?.userType === 'admin' && (
            <Link
              to="/users"
              className="block mt-4 mr-4 text-black font-semibold text-lg lg:inline-block lg:mt-0 hover:text-primary-700"
              style={{ fontFamily: "cursive" }}
            >
              Users
            </Link>
          )}
          {userDataContent?.userType === 'admin' ?
            user?.displayName && (
              <Link
                to='/adminProfile'
                className='block mt-4 mr-4 text-black font-semibold text-lg lg:inline-block lg:mt-0 hover:text-primary-700'
                style={{ fontFamily: "cursive" }}

              >
                Profile
              </Link>
            )
            :
            user?.displayName && (
              <Link
                to='/profile'
                className='block mt-4 mr-4 text-black font-semibold text-lg lg:inline-block lg:mt-0 hover:text-primary-700'
                style={{ fontFamily: "cursive" }}

              >
                Profile
              </Link>
            )}
          <Link
            to="/ourServices"
            className="block mt-4 mr-4 text-black font-semibold text-lg lg:inline-block lg:mt-0 hover:text-primary-700"
            style={{ fontFamily: "cursive" }}

          >
            Our Services
          </Link>
        </div>
        <Link
          to="/gallery"
          className="block mt-4 mr-4 text-black font-semibold text-lg lg:inline-block lg:mt-0 hover:text-primary-700"
          style={{ fontFamily: "cursive" }}

        >
          Gallery
        </Link>
        <Link
          to="/contactUs"
          className="block mt-4 mr-4 text-black font-semibold text-lg lg:inline-block lg:mt-0 hover:text-primary-700"
          style={{ fontFamily: "cursive" }}

        >
          Contact Us
        </Link>
        <Link
          to="/donate"
          className="block mt-4 mr-4 text-black font-semibold text-lg lg:inline-block lg:mt-0 hover:text-primary-700"
          style={{ fontFamily: "cursive" }}

        >
          Donate
        </Link>
        {user?.displayName ? (
          <div className="flex items-center">
            <button
              className="inline-block px-4 py-2 mt-4 mr-4 leading-none font-semibold text-lg text-black bg-primary-500 border border-white rounded hover:border-transparent hover:text-primary-500 hover:bg-white lg:mt-0"
              onClick={handleSignOut}
            >
              Log Out
            </button>
            <img
              className="inline-block  rounded-full w-9 h-9"
              src={user?.photoURL}
              alt={user?.displayName}
            />
          </div>
        ) : (
          <div>
            <Link
              to="/signin"
              className="inline-block px-4 py-2 mt-4 leading-none font-semibold text-lg text-white bg-primary-500 border border-white rounded hover:border-transparent hover:text-primary-500 hover:bg-white lg:mt-0"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;