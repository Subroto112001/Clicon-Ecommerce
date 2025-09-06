import React from "react";

const ProductCardLoading = () => {
  return (
    <div className="border border-gray-700 rounded bg-white inline-block p-6 relative">
      <div className="flex-col gap-y-3 flex justify-center items-center relative">
        {/* Image placeholder */}
        <div className="w-[202px] h-[172px] bg-gray-200 rounded animate-pulse"></div>

        <div className="flex flex-col gap-1 w-full">
          {/* Star rating placeholder */}
          <div className="flex gap-2 items-center">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 bg-gray-200 rounded animate-pulse"
              ></div>
            ))}
          </div>

          {/* Product title placeholder */}
          <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>

          {/* Product description placeholder */}
          <div className="w-3/4 h-3 bg-gray-200 rounded animate-pulse"></div>

          {/* Price placeholder */}
          <div className="flex flex-row gap-1.5 mt-1">
            <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Badge placeholder */}
        <div className="absolute top-[12px] left-[12px]">
          <div className="w-16 h-6 bg-gray-200 rounded-sm animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};


export default ProductCardLoading;