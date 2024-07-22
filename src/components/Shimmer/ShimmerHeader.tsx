import React from 'react';

const ShimmerHeader: React.FC = () => {
  return (
    <div className="animate-pulse bg-blue-500 text-white shadow-lg w-full z-10">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        <div className="flex items-center space-x-4">
          <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
          <div className="h-6 bg-gray-300 rounded w-32"></div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-8 bg-gray-300 rounded-full w-8"></div>
          <div className="h-8 bg-gray-300 rounded w-16"></div>
          <div className="h-8 bg-gray-300 rounded w-16"></div>
          <div className="h-8 bg-gray-300 rounded w-8"></div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerHeader;
