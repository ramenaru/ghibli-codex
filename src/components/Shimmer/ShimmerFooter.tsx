import React from 'react';

const ShimmerFooter: React.FC = () => {
  return (
    <footer className="animate-pulse bg-blue-600 text-white py-6 mt-auto">
      <div className="container mx-auto px-4 flex flex-col items-center sm:flex-row sm:justify-between">
        <div className="mb-4 sm:mb-0 text-center sm:text-left">
          <div className="h-6 bg-gray-300 rounded w-48 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-32"></div>
        </div>
        <div className="flex gap-4">
          <div className="h-8 bg-gray-300 rounded-full w-8"></div>
          <div className="h-8 bg-gray-300 rounded-full w-8"></div>
        </div>
      </div>
      <div className="mt-4 border-t border-blue-500 pt-4 text-center">
        <div className="h-4 bg-gray-300 rounded w-64"></div>
      </div>
    </footer>
  );
};

export default ShimmerFooter;
