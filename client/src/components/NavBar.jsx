import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

import React, { useState } from 'react'

const Navbar = () => {
  const [show, setShow] = useState(false);

  const { profile, isAuthenticated, setIsAuthenticated } = useAuth();
  const navigateTo = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/users/logout",
        { withCredentials: true }
      );
      localStorage.removeItem("jwt");
      toast.success(data.message);
      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };
  return (
    <nav className="shadow-md sticky top-0 bg-white z-50">
    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <div className="text-2xl font-bold text-gray-800">
        Blog<span className="text-blue-500">Sphere</span>
      </div>

      {/* Desktop Links */}
      <ul className="hidden md:flex space-x-8 text-lg">
        {["Home", "Blogs", "Creators", "About", "Contact"].map((item) => (
          <li key={item}>
            <Link
              to={`/${item.toLowerCase()}`}
              className="text-gray-600 hover:text-blue-500 transition duration-300"
            >
              {item.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>

      {/* Desktop Buttons */}
      <div className="hidden md:flex space-x-4">
        {isAuthenticated && profile?.user?.role === "admin" && (
          <Link
            to="/dashboard"
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition duration-300"
          >
            DASHBOARD
          </Link>
        )}
        {!isAuthenticated ? (
          <Link
            to="/login"
            className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition duration-300"
          >
            LOGIN
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition duration-300"
          >
            LOGOUT
          </button>
        )}
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden text-gray-600" onClick={() => setShow(!show)}>
        {show ? <IoCloseSharp size={28} /> : <AiOutlineMenu size={28} />}
      </div>
    </div>

    {/* Mobile Menu */}
    {show && (
      <div className="bg-gray-100 md:hidden">
        <ul className="flex flex-col items-center space-y-6 py-6">
          {["Home", "Blogs", "Creators", "About", "Contact"].map((item) => (
            <li key={item}>
              <Link
                to={`/${item.toLowerCase()}`}
                onClick={() => setShow(false)}
                className="text-gray-700 text-lg hover:text-blue-500 transition duration-300"
              >
                {item.toUpperCase()}
              </Link>
            </li>
          ))}
          {/* Mobile Auth Buttons */}
          {isAuthenticated && profile?.user?.role === "admin" && (
            <Link
              to="/dashboard"
              onClick={() => setShow(false)}
              className="px-6 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition duration-300"
            >
              DASHBOARD
            </Link>
          )}
          {!isAuthenticated ? (
            <Link
              to="/login"
              onClick={() => setShow(false)}
              className="px-6 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition duration-300"
            >
              LOGIN
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition duration-300"
            >
              LOGOUT
            </button>
          )}
        </ul>
      </div>
    )}
  </nav>
  )
}

export default Navbar