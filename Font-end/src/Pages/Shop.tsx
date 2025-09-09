import React, { useState, useMemo } from "react";
import Containere from "../Component/CoomonComponent/Container/Containere";
import BreadCrumb from "../Component/CoomonComponent/BreadCrumb/BreadCrumb";
import { useApp } from "../Hooks/Context/Contextapi";
import { icons } from "../Helpers/IconProvider";
import ShopPProductSkeliton from "../Component/CoomonComponent/ShopProductSkeliton/ShopPProductSkeliton";
import ProductCardLoading from "../Component/CoomonComponent/Skeliton/LoadingSkeliton";
import RightSideOfShopComponent from "../Component/ShopComponent/Leftside/Index";

const Shop = () => {
  const { posts, loading, fetchPosts } = useApp();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Calculate pagination values
  const totalProducts = posts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  // Get current page products
  const currentProducts = useMemo(() => {
    return posts.slice(startIndex, endIndex);
  }, [posts, startIndex, endIndex]);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Show last page
      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    handlePageChange(currentPage - 1);
  };

  const handleNext = () => {
    handlePageChange(currentPage + 1);
  };

  console.log(posts);

  return (
    <div>
      <div className="py-6 bg-gray-100">
        <Containere>
          <BreadCrumb />
        </Containere>
      </div>
      <Containere>
        <div className="grid grid-cols-[1fr_4fr] gap-6 py-10">
          <div className="">
            <RightSideOfShopComponent />
          </div>
          <div className="flex flex-col gap-2 h-full">
            <div className="flex flex-row items-center justify-between">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search for anything..."
                  className="body-small-400 text-gray-500 w-[364px] py-3 outline-none border border-gray-100 pl-4"
                />
                <span className="absolute text-2xl top-1/2 right-3 -translate-y-1/2">
                  {icons.search}
                </span>
              </div>
              <div className="flex flex-row gap-2.5 items-center">
                <h3>Short By : </h3>
                <select
                  name=""
                  id=""
                  className="border border-gray-200 p-2 outline-none cursor-pointer"
                >
                  <option value="" className="cursor-pointer">
                    Low to High
                  </option>
                  <option value="" className="cursor-pointer">
                    High to Low
                  </option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex flex-wrap gap-2 items-center min-h-[600px]">
              {loading
                ? // Show loading skeletons when loading
                  Array.from({ length: productsPerPage }).map((_, index) => (
                    <ProductCardLoading key={index} />
                  ))
                : // Show actual products when loaded
                  currentProducts?.map((item) => (
                    <ShopPProductSkeliton key={item.id} item={item} />
                  ))}
            </div>

            {/* Pagination */}
            {!loading && totalProducts > 0 && (
              <div className="flex flex-col gap-4 mt-8">
                {/* Results info */}
                <div className="text-sm text-gray-600">
                  Showing {startIndex + 1}-{Math.min(endIndex, totalProducts)}{" "}
                  of {totalProducts} products
                </div>

                {/* Pagination controls */}
                <div className="flex items-center justify-center gap-2">
                  {/* Previous button */}
                  <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                        : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                    }`}
                  >
                    Previous
                  </button>

                  {/* Page numbers */}
                  <div className="flex items-center gap-1">
                    {getPageNumbers().map((page, index) => (
                      <React.Fragment key={index}>
                        {page === "..." ? (
                          <span className="px-3 py-2 text-gray-400">...</span>
                        ) : (
                          <button
                            onClick={() => handlePageChange(page as number)}
                            className={`px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
                              currentPage === page
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                            }`}
                          >
                            {page}
                          </button>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Next button */}
                  <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
                      currentPage === totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                        : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                    }`}
                  >
                    Next
                  </button>
                </div>

                {/* Jump to page */}
                <div className="flex items-center justify-center gap-2 text-sm">
                  <span className="text-gray-600">Jump to page:</span>
                  <input
                    type="number"
                    min="1"
                    max={totalPages}
                    value={currentPage}
                    onChange={(e) => {
                      const page = parseInt(e.target.value);
                      if (page >= 1 && page <= totalPages) {
                        handlePageChange(page);
                      }
                    }}
                    className="w-16 px-2 py-1 text-center border border-gray-300 rounded-md outline-none focus:border-blue-500"
                  />
                  <span className="text-gray-600">of {totalPages}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </Containere>
    </div>
  );
};

export default React.memo(Shop);
