import React from 'react';

const ShimmerDetailCard: React.FC = () => {
  return (
    <div className="animate-pulse bg-white rounded-lg shadow-md p-6">
      <div className="w-full h-72 bg-gray-300 mb-6 rounded-lg"></div>
      <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/5 mb-6"></div>
      <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
    </div>
  );
};

export default ShimmerDetailCard;
