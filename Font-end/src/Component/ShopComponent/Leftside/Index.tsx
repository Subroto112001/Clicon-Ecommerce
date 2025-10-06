import React, { useEffect, useState } from "react";
import RangeSlider from "react-range-slider-input";

import { useApp } from "../../../Hooks/Context/Contextapi";
import { GetfeaturesProduct } from "../../../Api/featuresProduct";
import { useQuery } from "@tanstack/react-query";
const RightSideOfShopComponent = () => {
  const [products, setProducts] = useState<any[]>([]);

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const { category, fetchProductByCategory, fetchPosts } = useApp();
  const [value, setValue] = useState<[number, number]>([5, 85]);

  const [selectedOption, setSelectedOption] = useState<string>("$300 to $500");
  const [randomTagsColor, setRandomTagsColor] = useState<string[]>([
    "primary-400",
    "primary-500",
    "gray-400",
    "gray-500",
    "secondary-400",
    "secondary-500",
    "tertiary-400",
    "tertiary-500",
    "success-400",
    "success-500",
    "warning-400",
    "warning-500",
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "all") {
      fetchPosts();
    } else {
      fetchProductByCategory({ categoryname: e.target.value });
    }
  };

  const throwTestError = () => {
    throw new Error(
      "Test Error: This is a simulated error to test ErrorBoundary!"
    );
  };

  // Query for all products
  const { data } = useQuery({
    queryKey: ["featured-products"],
    queryFn: GetfeaturesProduct,
  });

  useEffect(() => {
    setProducts(data?.products);
  }, [data]);

  const priceOptions = [
    "All Price",
    "Under $20",
    "$25 to $100",
    "$100 to $300",
    "$300 to $500",
    "$500 to $1,000",
    "$1,000 to $10,000",
  ];

  const handleBrandChange = (brandId: string) => {
    setSelectedBrands((prevSelectedBrands) =>
      prevSelectedBrands.includes(brandId)
        ? prevSelectedBrands.filter((id) => id !== brandId)
        : [...prevSelectedBrands, brandId]
    );
  };

  // brand selection
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

      <div className="  pb-10 flex flex-col gap-3">
        <div className=" felx flex-col  ">
          <h3 className="label2 text-gray-900">PRICE RANGE</h3>
          <div className="mt-[23px]">
            <RangeSlider
              id="range-slider-yellow"
              value={value}
              onInput={setValue}
            />
          </div>

          <div className="flex mt-6  flex-row justify-between items-center font-normal font-Public text-[14px] text-gray-500">
            <button className="w-[120px] h-[40px] rounded border border-gray-100 cursor-pointer hover:border-gray-200 transition-all duration-300">
              MIN PRICE
            </button>
            <button className="w-[120px] h-[40px] rounded border border-gray-100 cursor-pointer hover:border-gray-200  transition-all duration-300">
              MAX PRICE
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4   py-6 border-b border-gray-300">
          {priceOptions.map((option, index) => (
            <label
              key={index}
              className="flex cursor-pointer items-center gap-3"
            >
              {/* The actual radio button is visually hidden but accessible */}
              <input
                type="radio"
                name="price-option"
                value={option}
                checked={selectedOption === option}
                onChange={() => setSelectedOption(option)}
                className="peer sr-only"
              />

              {/* The custom-styled radio button */}
              <div
                className="
                h-5 w-5 rounded-full border-2 
                border-gray-300 
                transition-all 
                peer-checked:border-orange-500
              "
              ></div>

              {/* The text label */}
              <span className="text-gray-700 peer-checked:text-gray-900">
                {option}
              </span>
            </label>
          ))}
        </div>
        <div className=" py-7 border-b border-gray-300 flex flex-col gap-3">
          <h3 className="label2 text-gray-900">POPULAR BRANDS</h3>
          <div className="flex flex-col gap-3">
            {products?.slice(0, 14).map((item) => (
              <label
                key={item.id}
                className="flex items-center space-x-2 cursor-pointer "
              >
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(item.id)}
                  onChange={() => handleBrandChange(item.id)}
                  className="form-checkbox h-5 w-5 rounded-md border-gray-300 "
                />
                <span className="text-gray-800">{item.brand}</span>
              </label>
            ))}
          </div>
        </div>

        <div className=" py-7  border-b border-gray-300  flex flex-col gap-3">
          <h3 className="label2 text-gray-900">POPULAR TAGS</h3>
          <div className="grid grid-cols-2 gap-3">
            {products?.slice(0, 14).map((item) => (
              <span
                className={`text-gray-800 text-center items-center cursor-pointer px-1 py-1 justify-center bg-${
                  randomTagsColor[
                    Math.floor(Math.random() * randomTagsColor.length)
                  ]
                } border border-${
                  randomTagsColor[
                    Math.floor(Math.random() * randomTagsColor.length)
                  ]
                } inline-block hover:bg-gray-100 transition-all duration-300 rounded`}
              >
                {item.brand.split(" ")[0]}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSideOfShopComponent;
