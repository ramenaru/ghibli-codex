import React from 'react';

const ShimmerBanner: React.FC = () => {
  return (
    <section className="relative animate-pulse">
      <div className="w-full h-64 bg-gray-300"></div>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="h-10 bg-gray-300 rounded w-64"></div>
      </div>
    </section>
  );
};

export default ShimmerBanner;
