import React from "react";
import Containere from "../Component/CoomonComponent/Container/Containere";
import BreadCrumb from "../Component/CoomonComponent/BreadCrumb/BreadCrumb";
import { useApp } from "../Hooks/Context/Contextapi";
import { icons } from "../Helpers/IconProvider";
import ShopPProductSkeliton from "../Component/CoomonComponent/ShopProductSkeliton/ShopPProductSkeliton";
import ProductCardLoading from "../Component/CoomonComponent/Skeliton/LoadingSkeliton";

const Shop = () => {
  const { posts, loading, fetchPosts } = useApp();
  console.log(posts);

  return (
    <div>
      <div className="py-6 bg-gray-100">
        <Containere>
          <BreadCrumb />
        </Containere>
      </div>
      <Containere>
        <div className=" grid grid-cols-[1fr_4fr] gap-6 py-10">
          <div className="bg-green-400">ffsd</div>
          <div className=" flex flex-col gap-2 h-full">
            <div className=" flex flex-row items-center justify-between">
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
              <div className=" flex flex-row gap-2.5 items-center">
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
            <div className="flex flex-wrap gap-2 items-center">
              {loading
                ? // Show loading skeletons when loading
                  Array.from({ length: 12 }).map((_, index) => (
                    <ProductCardLoading key={index} />
                  ))
                : // Show actual products when loaded
                  posts
                    .slice(0, 12)
                    ?.map((item) => (
                      <ShopPProductSkeliton key={item.id} item={item} />
                    ))}
            </div>
          </div>
        </div>
      </Containere>
    </div>
  );
};

export default React.memo(Shop);
