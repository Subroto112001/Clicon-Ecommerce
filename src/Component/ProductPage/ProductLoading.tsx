// React import not required with the JSX transform
import Containere from "../CoomonComponent/Container/Containere";

const ProductDetailLoading = () => {
  return (
    <div>
      {/* Header and Breadcrumb Skeleton */}
      <div className="py-6 bg-gray-100">
        <Containere>
          <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
        </Containere>
      </div>

      {/* Product Details and Image Gallery Skeleton */}
      <Containere>
        <div className="flex gap-10 py-10 flex-col lg:flex-row">
          {/* Left Side: Product Image and Slider Skeleton */}
          <div className="flex flex-col items-center flex-1">
            {/* Big Image Skeleton */}
            <div className="w-full max-w-[600px] h-[460px] p-5 border border-gray-200 rounded bg-gray-200 animate-pulse"></div>

            {/* Slider Thumbnail Skeletons */}
            <div className="mt-5 w-full max-w-[600px] flex justify-between gap-5 overflow-hidden">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="w-[100px] h-[80px] rounded-md bg-gray-200 animate-pulse flex-shrink-0"
                ></div>
              ))}
            </div>
          </div>

          {/* Right Side: Product Info and Details Skeleton */}
          <div className="flex flex-col gap-4 max-w-[500px] flex-1">
            {/* Title Skeleton */}
            <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-5/6 bg-gray-200 rounded animate-pulse"></div>

            {/* Reviews Skeleton */}
            <div className="flex items-center gap-3">
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <hr className="my-1" />

            {/* Price Skeleton */}
            <div className="flex items-center gap-3">
              <div className="h-8 w-24 bg-red-200 rounded animate-pulse"></div>
              <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <hr className="my-1" />

            {/* Variant Selectors Skeleton */}
            <div className="grid grid-cols-2 gap-4 mt-2">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-10 w-full bg-gray-200 rounded-md animate-pulse"></div>
                </div>
              ))}
            </div>

            <hr className="my-3" />

            {/* Quantity & Actions Button Skeletons */}
            <div className="flex items-center gap-4">
              <div className="w-24 h-12 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="flex-1 h-12 bg-orange-200 rounded-md animate-pulse"></div>
              <div className="flex-1 h-12 bg-gray-200 rounded-md animate-pulse"></div>
            </div>

            {/* Wishlist and Compare Skeletons */}
            <div className="flex gap-6 mt-3">
              <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <hr className="my-3" />

            {/* Share and Payment Info Skeleton */}
            <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </Containere>

      <hr className="my-8" />

      {/* Product Tabs Skeleton */}
      <div className="mt-10 mb-20">
        <Containere>
          <div className="border border-gray-200 rounded-lg p-6">
            {/* Tabs Navigation Skeleton */}
            <div className="flex border-b border-gray-200 mb-6">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="py-3 px-6 h-10 w-32 mr-2 bg-gray-200 rounded-t-lg animate-pulse"
                ></div>
              ))}
            </div>

            {/* Content Placeholder Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-8">
              <div className="col-span-1 md:col-span-1 flex flex-col gap-4">
                <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="col-span-1 flex flex-col gap-4">
                <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className="h-4 w-full bg-gray-200 rounded animate-pulse"
                  ></div>
                ))}
              </div>
              <div className="col-span-1 flex flex-col gap-4">
                <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                {[...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className="h-4 w-full bg-gray-200 rounded animate-pulse"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </Containere>
      </div>
    </div>
  );
};

export default ProductDetailLoading;
