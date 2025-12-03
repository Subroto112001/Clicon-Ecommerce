import React, { useEffect, useState, type JSX } from "react";
import Containere from "../../CoomonComponent/Container/Containere";
import { featureProductImage } from "../../../Helpers/ImageProvider";
import {
  Button,
  SecondButton,
} from "../../CoomonComponent/CoomonEliment/Button";
import { icons } from "../../../Helpers/IconProvider";
import ProductComponent from "../../CoomonComponent/ProdcutComponent";
import { useQuery } from "@tanstack/react-query";
import {
  GetFeatureProductCategory,
  GetfeaturesProduct,
  GetProductByCCategory,
} from "../../../Api/featuresProduct";
import ProductCardLoading from "../../CoomonComponent/Skeliton/LoadingSkeliton";
import ErrorComponent from "../../CoomonComponent/FeatureComponentError/FeaturecomponentError";
import { useApp } from "../../../Hooks/Context/Contextapi";
import {
  useCategoryData,
  useProductsData,
} from "../../../Hooks/api-mutaion/api-mutation";

// Updated interface to match DummyJSON API response
// interface Category {
//   slug: string;
//   name: string;
//   url: string;
// }

interface Category {
  id: number;
  name: string;
  icons: JSX.Element;
}

interface GoProductDetails {
  availabilityStatus: boolean;
  barCode: string;
  brand: {
    _id: string;
    name: string;
    im: string;
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
  tags: string[];
  totalSale: number;
  unit: string;
  updatedAt: string;
  variantType: string;
  warehouseLocation: string;
  warrantyInformation: string;
  wholesalePrice: number;
  __v: number;
  _id: string;
}

const FeaturedProduct: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categoryname, setCategoryname] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const { data: categoriesData, error, isLoading, isError } = useCategoryData();
  const {
    data: productsData,
    error: productsError,
    isLoading: productsLoading,
    isError: productsIsError,
  } = useProductsData();

  const handleCategoryData = (
    categorySlug: string,
    categoryDisplayName: string
  ) => {
    if (categoryDisplayName === "All") {
      setCategoryname("");
      setSelectedCategory("All");
    } else {
      setCategoryname(categorySlug);
      setSelectedCategory(categoryDisplayName);
    }
  };

 
  return (
    <div>
      <Containere>
        <div className="grid grid-cols-[1fr_3fr] gap-5">
          <div className="bg-warning-300 h-[716px]">
            <div className="!py-[32px] !px-[18px] flex flex-col justify-center items-center gap-2">
              <h3 className="body-small-600 text-danger-600">
                COMPUTER & ACCESSORIES
              </h3>
              <h3 className="heading1 text-gray-900">32% Discount</h3>
              <p className="body-small-400 text-gray-400">
                For all electronics products
              </p>
              <div className="flex flex-row gap-1 items-center justify-center">
                <span className="body-small-500 text-gray-900">
                  Offers ends in:
                </span>
                <button className="py-1.5 px-3 bg-gray-00 hover:bg-gray-100 duration-300 transition-all rounded body-small-600 text-gray-900 cursor-pointer">
                  ENDS OF CHRISTMAS
                </button>
              </div>
              <div className="mt-5">
                <SecondButton content={"SHOP NOW"} />
              </div>
            </div>
            <div className="w-full mt-1">
              <img
                src={featureProductImage.Featured}
                alt="Featured Banner"
                className="w-full"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between items-center py-0">
              <h3 className="heading3 text-gray-900">Featured Products</h3>
              <div className="flex flex-row items-center gap-x-4">
                <div className="flex flex-row gap-2">
                  {/* All Products option */}
                  <span
                    onClick={() => handleCategoryData("", "All")}
                    className={`body-small-400 capitalize text-gray-600 hover:text-gray-900 hover:body-small-600 duration-300 transition-all cursor-pointer customstYle ${
                      selectedCategory === "All"
                        ? "text-primary-500 body-small-600"
                        : ""
                    }`}
                  >
                    All
                  </span>

                  {/* Category options */}
                  {categoriesData?.data
                    ?.slice(0, 5)
                    .map((item: Category, index: number) => (
                      <span
                        key={index}
                        className={`body-small-400 capitalize text-gray-600 hover:text-gray-900 hover:body-small-600 duration-300 transition-all customstYle cursor-pointer ${
                          selectedCategory === item.name
                            ? "text-primary-500 body-small-600"
                            : ""
                        }`}
                      >
                        {item.name}
                      </span>
                    ))}
                </div>
                <span className="body-small-600 hover:text-primary-500 duration-300 transition-all cursor-pointer">
                  Browse All Products <span>{icons.rightarrow}</span>
                </span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-6">
              {isLoading
                ? [...Array(8)].map((_, index) => (
                    <ProductCardLoading key={index} />
                  ))
                : productsData?.data
                    .slice(0, 8)
                    .map((item: GoProductDetails) => (
                      <ProductComponent
                        key={item._id}
                        productKey={item._id}
                        status={{
                          isPending: productsLoading,
                          isError: productsIsError,
                          error: productsError,
                        }}
                        item={item}
                      />
                    ))}
            </div>
          </div>
        </div>
      </Containere>
    </div>
  );
};

export default React.memo(FeaturedProduct);
