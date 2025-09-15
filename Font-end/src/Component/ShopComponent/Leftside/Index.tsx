import React, { useState } from "react";
import RangeSlider from "react-range-slider-input";

import { useApp } from "../../../Hooks/Context/Contextapi";
const RightSideOfShopComponent = () => {
  const {  category, fetchProductByCategory, fetchPosts } = useApp();
  const [value, setValue] = useState<[number, number]>([5, 85]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "all") {
      fetchPosts();
    } else {
      fetchProductByCategory({ categoryname: e.target.value });
     
    }
  };
console.log(value);

  return (
    <div className=" flex flex-col gap-4">
      <h3 className="label2 text-gray-900">CATEGORY</h3>

      <div className=" border-b border-gray-300 pb-10">
        <div className=" flex flex-col gap-3 h-[55vh] overflow-y-scroll ">
          <div className="flex flex-row items-center gap-2">
            <input
              type="radio"
              name="category"
              value="all"
              onChange={handleChange}
              id="all"
              className="w-5 h-5 accent-primary-500 cursor-pointer"
            />
            <label
              htmlFor="all"
              className="text-gray-700 body-small-400 hover:body-small-500 hover:text-gray-900 capitalize body-small-400"
            >
              all
            </label>
          </div>

          {category.map((item, index) => (
            <div className="flex flex-row items-center gap-2" key={index}>
              <input
                type="radio"
                name="category"
                value={item}
                onChange={handleChange}
                id={item}
                className="w-5 h-5 accent-primary-500 cursor-pointer"
              />
              <label
                htmlFor={item}
                className="text-gray-700 body-small-400 hover:body-small-500 hover:text-gray-900 capitalize body-small-400"
              >
                {item}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className=" border-b border-gray-300 pb-10 flex flex-col gap-3">
        <h3 className="label2 text-gray-900">PRICE RANGE</h3>
        <div className="mt-[23px] felx flex-col ">
          <RangeSlider
            id="range-slider-yellow"
            value={value}
            onInput={setValue}
          />

          <div className="flex mt-6 flex-row justify-between items-center font-normal font-Public text-[14px] text-gray-500">
            <button className="w-[120px] h-[40px] rounded border border-gray-100 cursor-pointer hover:border-gray-200 transition-all duration-300">
              MIN PRICE
            </button>
            <button className="w-[120px] h-[40px] rounded border border-gray-100 cursor-pointer hover:border-gray-200  transition-all duration-300">
              MAX PRICE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSideOfShopComponent;
