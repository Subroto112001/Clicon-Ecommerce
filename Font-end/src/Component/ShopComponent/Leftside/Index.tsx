import React from "react";
import { useApp } from "../../../Hooks/Context/Contextapi";

const RightSideOfShopComponent = () => {
  const { loading, category } = useApp();
  console.log(category);

  return (
    <div className=" flex flex-col gap-4">
      <h3 className="label2 text-gray-900">CATEGORY</h3>

      <div>
        {category.map((item) => (
          <div className="flex flex-row items-center gap-2">
            <input type="radio" />
            <span className="text-gray-700 body-small-400 hover:body-small-500 hover:text-gray-900">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightSideOfShopComponent;
