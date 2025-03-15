import React from "react";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-main">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Error Heading */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Oops!</h1>
        <p className="text-lg text-gray-600 mb-6">
          Something went wrong. The page you're looking for doesn't exist or has
          been moved.
        </p>

        {/* Back to Home Button */}
        <Link
          to="/"
          className="inline-block bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default Error;
