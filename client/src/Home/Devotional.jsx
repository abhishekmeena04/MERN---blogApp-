import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

const Devotional = () => {
  const { blogs } = useAuth();
  const devotionalBlogs = blogs?.filter((blog) => blog.category === "Coding");

  return (
    <div className="container mx-auto my-12 px-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Coding Blogs
      </h1>
      <p className="text-center mb-8 text-gray-600">
        Explore a collection of coding blogs covering various programming
        languages, frameworks, and development tools. Gain insights and
        inspiration for your coding journey and enhance your skills with
        practical examples and tutorials.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {devotionalBlogs && devotionalBlogs.length > 0 ? (
          devotionalBlogs.map((blog) => (
            <Link
              to={`/blog/${blog._id}`}
              key={blog._id}
              className="relative rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300 group"
            >
              <img
                src={blog?.blogImage?.url}
                alt={blog?.title}
                className="w-full h-56 object-cover group-hover:brightness-75 transition-all duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h2 className="text-lg font-semibold truncate">
                  {blog?.title}
                </h2>
                <p className="text-sm italic">{blog?.category}</p>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center text-center text-gray-500">
            <p className="text-lg">
              No devotional blogs available at the moment.
            </p>
            <img
              src="/placeholder-image.svg"
              alt="No blogs"
              className="w-64 h-64 mt-4"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Devotional;
