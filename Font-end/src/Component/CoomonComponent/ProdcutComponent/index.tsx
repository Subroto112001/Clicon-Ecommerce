import React from "react";
import Image from "../../../assets/Product/Image.png";
const ProductComponent = () => {
  return (
    <div className="!p-4 border border-gray-700 rounded inline-block bg-white flex-col gap-6 ">
      <div className="w-[202px] h-[172px]">
        <picture>
          <img src={Image} alt={Image} className="w-[full] h-[full] " />
        </picture>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="max-w-[202px] body-small-400">
          Samsung Electronics Samsung Galexy S21 5G
        </h3>
        <span className="text-secondary-500 body-small-600">$2,300</span>
      </div>
    </div>
  );
};

export default React.memo(ProductComponent);
