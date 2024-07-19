import React from 'react';

const ShimmerCard: React.FC = () => {
  return (
    <div className="animate-pulse bg-gray-200 rounded-lg shadow-md p-4">
      <div className="w-full h-64 bg-gray-300 mb-4 rounded-lg"></div>
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
    </div>
  );
};

export default ShimmerCard;
