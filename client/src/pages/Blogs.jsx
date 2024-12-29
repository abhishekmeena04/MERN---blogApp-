import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Blogs() {
  const { blogs } = useAuth();

  console.log(blogs);
  return (
    <div>
      <div className="container mx-auto my-12 p-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          All Blogs Goes Here!!!
        </h1>
        <p className="text-center mb-8 text-lg text-gray-700">
          The concept of gods varies widely across different cultures, religions, and belief systems
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {blogs && blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <Link
                to={`/blog/${blog.id}`}
                key={index}
                className="relative rounded-lg overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={blog?.blogImage?.url}
                  alt={blog?.title}
                  className="w-full h-48 object-cover transform transition-transform duration-300 ease-in-out hover:scale-110"
                />
                <div className="absolute inset-0 bg-black opacity-30 transition-opacity duration-300 ease-in-out hover:opacity-50"></div>
                <div className="absolute bottom-4 left-4 text-white transition-opacity duration-300 ease-in-out opacity-0 hover:opacity-100">
                  <h2 className="text-lg font-semibold">{blog?.title}</h2>
                  <p className="text-sm">{blog?.category}</p>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center text-lg text-gray-600">
              No blogs available at the moment.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Blogs;
