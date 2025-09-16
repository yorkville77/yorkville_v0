import React from 'react';

const SkipNavigation = () => {
  return (
    <div className="sr-only focus:not-sr-only">
      <a
        href="#main-content"
        className="absolute top-0 left-0 bg-blue-900 text-white px-4 py-2 rounded-br-lg z-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200"
      >
        Skip to main content
      </a>
      <a
        href="#navigation"
        className="absolute top-0 left-32 bg-blue-900 text-white px-4 py-2 rounded-br-lg z-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200"
      >
        Skip to navigation
      </a>
    </div>
  );
};

export default SkipNavigation;