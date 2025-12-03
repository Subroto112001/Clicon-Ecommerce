import React from "react";
import { IoEyeOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { GiShoppingCart } from "react-icons/gi";
import ProductCardLoading from "../Skeliton/LoadingSkeliton";
import Star from "../Star/Star";

interface ProductDetails {
  availabilityStatus: boolean;
  barCode: string;
  brand: {
    _id: string;
    name: string;
    im: string; // Assuming 'im' is a string based on the value's context, potentially an image path or identifier
  };
  category: {
    _id: string;
    name: string;
  };
  color: string;
  createdAt: string;
  description: string;
  groupUnit: string;
  image: {
    url: string;
  }[];
  isActive: boolean;
  manufactureCountry: string;
  minimumOrderQuantity: number;
  name: string;
  qrCode: string;
  rating: number;
  retailPrice: number;
  returnPolicy: string;
  reviews: Array<any>;
  shippingInformation: string;
  size: string;
  sku: string;
  slug: string;
  stock: number;
  stockAlert: boolean;
  subCategory: string;
  tags: string[]; // Array of strings based on the format '["jeans"]'
  totalSale: number;
  unit: string;
  updatedAt: string; // Use 'string' for ISO date-time string
  variantType: string;
  warehouseLocation: string;
  warrantyInformation: string;
  wholesalePrice: number;
  __v: number;
  _id: string;
}

interface ProductComponentProps {
  bestDeals?: boolean;
  hotDeals?: boolean;
  productKey: string;
  status: {
    isPending: boolean;
    isError: boolean;
    error: any;
  };
  item: ProductDetails;
}

const ProductComponent = ({
  bestDeals = false,
  hotDeals = true,
  productKey,
  status,
  item,
}: ProductComponentProps) => {
  if (status.isPending) {
    return <ProductCardLoading />;
  }

  return (
    <div
      className="border border-gray-200 rounded bg-white inline-block p-3 relative group"
      key={productKey}
    >
      <div className="flex-col gap-y-3 flex justify-center items-center relative">
        <div className="w-[202px] h-[172px]">
          <picture>
            <img
              src={item.image[0]?.url}
              alt={item.name}
              className="w-[202px] h-[172px] "
            />
          </picture>
        </div>
        <div className="w-[202px] h-[172px] absolute bg-[rgba(0,0,0)] opacity-0 group-hover:opacity-20 transition-all duration-300 top-0"></div>
        <div className="flex flex-col gap-1 ">
          <div className="flex gap-2 items-center">
            <div className="flex gap-1 items-center text-primary-500">
              <Star rating={item.rating} />
            </div>
            <span className="text-gray-500">{`(${item.rating})`}</span>
          </div>
          <h3 className="max-w-[202px] body-small-600 cursor-pointer truncate hover:text-gray-600">
            {item.name}
          </h3>
          <h3 className="max-w-[202px] body-small-400 truncate">
            {item.description}
          </h3>
          <div className="flex flex-row gap-1.5">
            <span className="text-gray-300 body-small-600 line-through">
              {item.retailPrice}
            </span>
            {/* <span className="text-secondary-500 body-small-600">
              {item.discountPercentage
                ? `$${(
                    item.price -
                    (item.price * item.discountPercentage) / 100
                  ).toLocaleString()}`
                : `$${item.price.toLocaleString()}`}
            </span> */}
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
      <div className="flex flex-row items-center justify-center gap-2   absolute top-25 left-[20%] transition-all duration-300 opacity-0 group-hover:opacity-100">
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
