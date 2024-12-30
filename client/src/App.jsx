import React from "react";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import Footer from "./components/Footer.jsx";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Blogs from "./pages/Blogs.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Creators from "./pages/Creators.jsx";
import { useAuth } from "./context/AuthProvider";
import { Toaster } from "react-hot-toast";
import UpdateBlog from "./dashboard/UpdateBlog.jsx";
import Detail from "./pages/Detail.jsx";
// import NotFound from "./pages/NotFound";
function App() {
  const location = useLocation();
  const hideNavbarFooter = ["/dashboard", "/login", "/register"].includes(
    location.pathname
  );
  const { blogs, isAuthenticated } = useAuth();
  let token = localStorage.getItem("jwt"); // Retrieve the token directly from the localStorage to maininting the routes protect (Go to login.jsx)
  console.log(blogs);
  console.log(isAuthenticated); // it is not using because every page refresh it was redirected to /login

  return (
    <div>
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        <Route
          exact
          path="/"
          element={token ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route exact path="/blogs" element={<Blogs />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/creators" element={<Creators />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/dashboard" element={<Dashboard />} />

        {/* Single page route */}
        <Route exact path="/blog/:id" element={<Detail />} />

        {/* Update page route */}
        <Route exact path="/blog/update/:id" element={<UpdateBlog />} />

        {/* Universal route */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      <Toaster />
      {!hideNavbarFooter && <Footer />}
    </div>
  );
}

export default App;