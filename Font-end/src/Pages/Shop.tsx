import React, { useState, useEffect } from "react";
import Containere from "../Component/CoomonComponent/Container/Containere";
import BreadCrumb from "../Component/CoomonComponent/BreadCrumb/BreadCrumb";
import { useApp } from "../Hooks/Context/Contextapi";
import { icons } from "../Helpers/IconProvider";
import ShopPProductSkeliton from "../Component/CoomonComponent/ShopCmponent/ShopProductSkeliton/ShopPProductSkeliton";
import ProductCardLoading from "../Component/CoomonComponent/Skeliton/LoadingSkeliton";
import RightSideOfShopComponent from "../Component/ShopComponent/Leftside/Index";
 interface Post {
   id: number;
   title: string;
   body: string;
 }
const Shop = () => {
  const [page, setPage] = useState(1);
  const [pagePerShow, setPagePerShow] = useState(8);
  const [dataLength, setDataLength] = useState(0);

  const { posts, loading, categorybydata, selectedCategoryName } = useApp();
  const [productdata, setProductdata] = useState<Post[]>([]);

 

  useEffect(() => {
    if (categorybydata && categorybydata.length > 0) {
      setProductdata(categorybydata);
    } else {
      setProductdata(posts || []);
    }
  }, [posts, categorybydata]);

  /**
   *@desc: this useEffect will set the data length
   */
  useEffect(() => {
    if (productdata) {
      setDataLength(productdata.length);
    }
  }, [productdata]);
  /**
   *@desc: total page calculation
   */

  const totalpage = Math.ceil(dataLength / pagePerShow);

  /**
   *@desc: it will handle going to previous page
   */

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  /**
   *@desc:  it will handle going to next page
   */

  const handleNext = () => {
    if (page < totalpage) setPage(page + 1);
  };
  /**
   *@desc: this function will set the page number of product
   */

  const handlePageItem = (index:number) => {
    setPage(index);
  };




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
                  value={pagePerShow}
                  onChange={(e) => {
                    setPagePerShow(Number(e.target.value));
                    setPage(1);
                  }}
                >
                  <option value="8">8</option>
                  <option value="16">16</option>
                  <option value="32">32</option>
                  <option value="64">64</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between items-center bg-gray-50 rounded py-3 px-6">
              <div className="flex gap-2 items-center">
                <h3 className="text-gray-600 body-small-400 ">
                  Active Filters :
                </h3>
                {/* there will be category  name dynamically */}
                <span className="capitalize clas text-gray-900 body-small-600 ">
                  {selectedCategoryName}
                </span>
              </div>
              <div>
                <span>{productdata.length}</span> &nbsp;
                <span className="text-gray-600 body-small-400 ">
                  Results found
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              {loading
                ? // Show loading skeletons when loading
                  Array.from({ length: 12 }).map((_, index) => (
                    <ProductCardLoading key={index} />
                  ))
                : // Show actual products when loaded
                  productdata

                    ?.slice(page * 8 - 8, page * pagePerShow)
                    .map((item) => (
                      <ShopPProductSkeliton key={item.id} item={item} />
                    ))}
            </div>
            {/* pagination */}

            <div className="flex flex-row justify-center items-center mt-[40px]">
              <ul className="flex justify-center items-center">
                <li>
                  <div
                    onClick={handlePrev}
                    className={`flex items-center justify-center px-4 h-10 text-center  text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg cursor-pointer  ${
                      page === 1
                        ? "bg-gray-200 text-gray-400"
                        : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    }`}
                  >
                    {icons.leftArrow}
                  </div>
                </li>

                {[...new Array(totalpage)].map((_, index) => (
                  <li key={index}>
                    <div
                      className={`flex items-center justify-center px-4 h-10   text-gray-500 bg-white border border-gray-300  cursor-pointer ${
                        page == index + 1
                          ? "bg-blue-500 text-gray-500"
                          : " text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      }`}
                      onClick={() => handlePageItem(index + 1)}
                    >
                      {index + 1}
                    </div>
                  </li>
                ))}

                <li>
                  <div
                    onClick={handleNext}
                    className={`flex items-center justify-center px-4 h-10  leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg cursor-pointer  ${
                      page === totalpage
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    }`}
                  >
                    {icons.rightarrow}
                  </div>
                </li>
              </ul>
            </div>
            {/* pagination */}
          </div>
        </div>
      </Containere>
    </div>
  );
};

export default React.memo(Shop);
