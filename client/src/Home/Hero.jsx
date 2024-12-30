import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

const Hero = () => {
  const { blogs } = useAuth();

  return (
    <div className="container mx-auto my-10 px-6">
      {/* Blogs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {blogs && blogs.length > 0 ? (
          blogs.slice(0, 4).map((element) => (
            <Link
              to={`/blog/${element._id}`}
              key={element._id}
              className="group bg-white rounded-lg shadow-md hover:shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              {/* Blog Image */}
              <div className="relative">
                <img
                  src={element.blogImage.url}
                  alt={element.title}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75 group-hover:opacity-90 transition-opacity duration-300"></div>
                <h1 className="absolute bottom-4 left-4 text-white text-lg font-bold group-hover:text-yellow-400 transition-colors duration-300">
                  {element.title}
                </h1>
              </div>
              {/* Author Details */}
              <div className="p-4 flex items-center">
                <img
                  src={element.adminPhoto}
                  alt={element.adminName}
                  className="w-12 h-12 rounded-full border-2 border-yellow-400"
                />
                <div className="ml-4">
                  <p className="text-gray-800 text-sm font-semibold">
                    {element.adminName}
                  </p>
                  <p className="text-gray-400 text-xs">
                    Published {new Date(element.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          // Loading Indicator
          <div className="flex h-40 items-center justify-center w-full">
            <p className="text-gray-500 text-lg animate-pulse">Loading blogs...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Hero;
