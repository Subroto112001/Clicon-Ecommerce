import React from "react";

const CategoryLoadingSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="label2 text-gray-900">CATEGORY</h3>

      <div className="flex flex-col gap-3 h-[55vh] overflow-y-scroll">
        {/* "All" option skeleton */}
        <div className="flex flex-row items-center gap-2 animate-pulse">
          <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
          <div className="h-4 bg-gray-300 rounded w-8"></div>
        </div>

        {/* Category items skeleton */}
        {[...Array(8)].map((_, index) => (
          <div
            className="flex flex-row items-center gap-2 animate-pulse"
            key={index}
          >
            <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
            <div className="h-4 bg-gray-300 rounded w-20"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryLoadingSkeleton;
