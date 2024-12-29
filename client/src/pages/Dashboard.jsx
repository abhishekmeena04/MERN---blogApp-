import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import Sidebar from "../dashboard/Sidebar";
import MyProfile from "../dashboard/MyProfile";
import MyBlogs from "../dashboard/MyBlogs";
import CreateBlog from "../dashboard/CreateBlog";
import UpdateBlog from "../dashboard/UpdateBlog";
import { Navigate } from "react-router-dom";

function Dashboard() {
  const { profile, isAuthenticated } = useAuth();
  const [component, setComponent] = useState("My Blogs");

  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  // Mapping components to state values
  const componentsMap = {
    "My Profile": <MyProfile />,
    "Create Blog": <CreateBlog />,
    "Update Blog": <UpdateBlog />,
    "My Blogs": <MyBlogs />,
  };

  return (
    <div>
      <Sidebar component={component} setComponent={setComponent} />
      {/* Render the corresponding component based on the current state */}
      {componentsMap[component]}
    </div>
  );
}

export default Dashboard;
