import React from 'react';
import { Link } from 'react-router-dom';

const NotPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-gray-800 animate-bounce">404</h1>
        <p className="text-2xl md:text-3xl font-semibold text-gray-600 mt-4">
          Oops! Page not found.
        </p>
        <p className="text-md md:text-lg text-gray-500 mt-2">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotPage;
