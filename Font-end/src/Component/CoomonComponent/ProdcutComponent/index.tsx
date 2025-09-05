import React from "react";
import Image from "../../../assets/Product/Image.png";
import { FaCartArrowDown, FaHeart, FaRegEye, FaStar } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { GiShoppingCart } from "react-icons/gi";
interface ProductComponentProps {
  bestDeals?: boolean;
  hotDeals?: boolean;
  productKey: number;
}

const ProductComponent = ({ bestDeals = false, hotDeals = true, productKey }: ProductComponentProps) => {
  return (
    <div
      className="border border-gray-700 rounded bg-white inline-block p-6 relative group"
      key={productKey}
    >
      <div className="flex-col gap-y-3 flex justify-center items-center relative">
        <div className="w-[202px] h-[172px]">
          <picture>
            <img src={Image} alt={Image} className="w-[full] h-[full] " />
          </picture>
        </div>
        <div className="w-[202px] h-[172px] absolute bg-[rgba(0,0,0)] opacity-0 group-hover:opacity-20 transition-all duration-300 top-0"></div>
        <div className="flex flex-col gap-1">
          <div className="flex ga-2 items-center text-primary-500">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
          <h3 className="max-w-[202px] body-small-600 cursor-pointer hover:text-gray-600">
            Samsung Galexy S21 5G
          </h3>
          <h3 className="max-w-[202px] body-small-400 truncate">
            Samsung Electronics Samsung Galexy S21 5G
          </h3>
          <div className="flex flex-row gap-1.5">
            <span className="text-gray-300 body-small-600 line-through">
              $2,300
            </span>
            <span className="text-secondary-500 body-small-600">$2,100</span>
          </div>
        </div>

        <div className="absolute top-[12px] left-[12px]">
          {hotDeals && (
            <span className="py-[5px] px-2.5 rounded-[2px] bg-danger-500 body-tiny-600 text-gray-00">
              HOT
            </span>
          )}

          {bestDeals && (
            <span className="py-[5px] px-2.5 rounded-[2px] bg-secondary-500 body-tiny-600 text-gray-00">
              BEST DEALS
            </span>
          )}
        </div>
      </div>

      {/* hover component */}
      <div className="flex flex-row  items-center justify-center gap-2  absolute top-25 left-[20%] transition-all duration-300 opacity-0 group-hover:opacity-100">
        <div className="w-[40px] h-[40px] flex justify-center items-center bg-gray-00 rounded-full text-lg text-gray-900 hover:bg-primary-500 duration-300 transition-all hover:text-gray-00 cursor-pointer">
          <CiHeart />
        </div>
        <div className="w-[40px] h-[40px] flex justify-center items-center bg-gray-00 rounded-full text-lg text-gray-900 hover:bg-primary-500 duration-300 transition-all hover:text-gray-00 cursor-pointer">
          <GiShoppingCart />
        </div>
        <div className="w-[40px] h-[40px] flex justify-center items-center bg-gray-00 rounded-full text-lg text-gray-900 hover:bg-primary-500 duration-300 transition-all hover:text-gray-00 cursor-pointer">
          <IoEyeOutline />
        </div>
      </div>

      {/* hover component */}
    </div>
  );
};

export default React.memo(ProductComponent);
