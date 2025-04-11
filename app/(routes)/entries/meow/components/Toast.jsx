import React from 'react';

const Toast = ({ message, show }) => {
  return (
    <div
      className={`fixed bottom-5 right-5 bg-white text-gray-800 shadow-lg rounded-lg px-6 py-4 flex items-center gap-4 transition-all duration-300 ${
        show ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div className="flex items-center">
        <svg
          className="w-6 h-6 text-green-500 mr-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <span>{message}</span>
      </div>

      <button className="ml-auto text-gray-500 hover:text-gray-700">
        &times;
      </button>
    </div>
  );
};

export default Toast;
