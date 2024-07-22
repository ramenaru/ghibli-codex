import React from 'react';

const ShimmerPersonDetail: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto animate-pulse">
      <div className="flex items-center text-blue-500 mb-6">
        <div className="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>
        <div className="h-6 bg-gray-300 rounded w-20"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-1">
          <div className="w-full h-64 bg-gray-300 rounded-lg shadow-lg"></div>
        </div>
        <div className="md:col-span-1 space-y-4">
          <div className="h-8 bg-gray-300 rounded w-3/4"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
}

export default ShimmerPersonDetail;
