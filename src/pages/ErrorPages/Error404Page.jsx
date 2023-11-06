import React from "react";

export default function Error404Page () {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Oops! 404 Not Found</h1>
          <p className="text-lg text-gray-600 mb-8">The page you are looking for does not exist.</p>
          <a href="/" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">Go back to home</a>
        </div>
      );
}