import React from "react";
import Containere from "../../CoomonComponent/Container/Containere";
import { featureProductImage } from "../../../Helpers/ImageProvider";
import { Button } from "../../CoomonComponent/CoomonEliment/Button";
import { icons } from "../../../Helpers/IconProvider";
import ProductComponent from "../../CoomonComponent/ProdcutComponent";

const FeaturedProduct: React.FC = () => {
  type FeatureHeading = {
    id: number;
    name: string;
  };

  const featureHeadingsItem: FeatureHeading[] = [
    {
      id: 1,
      name: "All Product",
    },
    {
      id: 2,
      name: "Smart Phone",
    },
    {
      id: 3,
      name: "Laptop",
    },
    {
      id: 4,
      name: "Headphones",
    },
    {
      id: 5,
      name: "Tablet",
    },
  ];

  return (
    <div>
      <Containere>
        <div className="grid grid-cols-[1fr_3fr] gap-5">
          <div className=" bg-warning-300">
            <div className="!py-[32px] !px-[18px] flex flex-col justify-center items-center gap-2">
              <h3 className="body-small-600 text-danger-600">
                COMPUTER & ACCESSORIES
              </h3>
              <h3 className="heading1 text-gray-900">32% Discount</h3>
              <p className="body-small-400 text-gray-400">
                For all ellectronics products
              </p>
              <div className="flex flex-row gap-1 items-center justify-center">
                <span className="body-small-500 text-gray-900">
                  Offers ends in:
                </span>
                <button className="!py-1.5 !px-3 bg-white rounded body-small-600 text-gray-900">
                  ENDS OF CHRISTMAS
                </button>
              </div>
              <div className="mt-5!">
                <Button content={"SHOP NOW"} />
              </div>
            </div>
            <div>
              <img src={featureProductImage.Featured} alt="Featured Banner" />
            </div>
          </div>
          <div className="grid grid-rows-[10%90%]">
            <div className="bg-amber-200 flex justify-between items-center">
              <h3 className="heading3 text-gray-900">Featured Products</h3>
              <div className="flex flex-row items-center gap-4">
                <div className=" flex flex-row gap-2">
                  {featureHeadingsItem.map((item) => (
                    <span
                      key={item.id}
                      className="body-small-400 text-gray-600 hover:text-gray-900 hover:body-small-600 duration-300 transition-all cursor-pointer customstYle"
                    >
                      {item.name}
                    </span>
                  ))}
                </div>
                <span className="body-small-600  hover:text-primary-500 duration-300 transition-all cursor-pointer">
                  Browser All Product <span>{icons.rightarrow}</span>
                </span>
              </div>
            </div>
            <div className="bg-amber-900">

<ProductComponent/>

            </div>
          </div>
        </div>
      </Containere>
    </div>
  );
};

export default FeaturedProduct;
