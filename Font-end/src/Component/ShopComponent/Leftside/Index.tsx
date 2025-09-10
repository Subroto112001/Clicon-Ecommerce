import React from "react";
import { useApp } from "../../../Hooks/Context/Contextapi";
const RightSideOfShopComponent = () => {
  const { loading, category, fetchProductByCategory } = useApp();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    fetchProductByCategory({ categoryname: e.target.value });
  };
  return (
    <div className=" flex flex-col gap-4">
      <h3 className="label2 text-gray-900">CATEGORY</h3>

      <div className=" flex flex-col gap-3 h-[55vh] overflow-y-scroll">
        {category.map((item, index) => (
          <div className="flex flex-row items-center gap-2" key={index}>
            <input
              type="radio"
              name="category"
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
  );
};

export default RightSideOfShopComponent;

