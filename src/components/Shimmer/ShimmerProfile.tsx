import React from 'react';

const ShimmerProfile: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto mt-8 animate-pulse">
      <div className="flex items-center mb-6">
        <div className="w-24 h-24 bg-gray-300 rounded-full mr-4"></div>
        <div>
          <div className="h-6 bg-gray-300 rounded w-32 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-48"></div>
        </div>
      </div>
      <div className="h-6 bg-gray-300 rounded w-24 mb-4"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array(6).fill(0).map((_, index) => (
          <div key={index} className="bg-gray-300 rounded-lg shadow-md overflow-hidden h-64"></div>
        ))}
      </div>
    </div>
  );
};

export default ShimmerProfile;
