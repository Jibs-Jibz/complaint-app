import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          404: Page Not Found
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          The page you are looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="px-4 py-2 rounded-md text-white bg-indigo-500 hover:bg-indigo-600 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
