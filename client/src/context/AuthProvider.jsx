import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
// Create context
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [profile, setProfile] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    // Fetch user profile
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("jwt");
        if (token) {
          const { data } = await axios.get(
            "http://localhost:8080/api/users/my-profile",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              withCredentials: true,
            }
          );
          setProfile(data);
          // setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    // Fetch blogs
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8080/api/blogs/all-blogs",
          { withCredentials: true }
        );
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchProfile();
    fetchBlogs();
  }, []);

  // Provide values to children components
  return (
    <AuthContext.Provider
      value={{
        blogs,
        setBlogs,
        profile,
        setProfile,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Export context and provider
export { AuthProvider, AuthContext };
