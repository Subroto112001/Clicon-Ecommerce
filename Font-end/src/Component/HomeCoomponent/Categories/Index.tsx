import React from "react";
import Containere from "../../CoomonComponent/Container/Containere";
import { shopbycategoryImageHolder } from "../../../Helpers/ImageProvider";
import CommonSLider from "../../CoomonComponent/CommonSLider";

const Categories = () => {
  interface Category {
    id: number;
    name: string;
    images: string; // or the actual type of shopbycategoryImageHolder values
  }
  const categoriholder: Category[] = [
    {
      id: 1,
      name: "Computer & Laptop",
      images: shopbycategoryImageHolder.Computer,
    },
    {
      id: 2,
      name: "Mobile",
      images: shopbycategoryImageHolder.Mobile,
    },
    {
      id: 3,
      name: "Headphones",
      images: shopbycategoryImageHolder.HeadPhone,
    },
    {
      id: 4,
      name: "Accessories",
      images: shopbycategoryImageHolder.Keyboard,
    },
    {
      id: 5,
      name: "Accessories",
      images: shopbycategoryImageHolder.Keyboard,
    },
    {
      id: 6,
      name: "Camera & Photo",
      images: shopbycategoryImageHolder.Camera,
    },
    {
      id: 7,
      name: "TV & Homes",
      images: shopbycategoryImageHolder.Televison,
    },
  ];

  return (
    <div className="pt-3.5!">
      <Containere>
        <div className="">
          <div className="grid justify-center items-center">
            <h1 className="heading1 text-gray-900">Shop By Categorry</h1>
          </div>
          <div className="!mt-10">
            <CommonSLider
              data={categoriholder}
              titlestyle={`body-medium-500 text-gray-900`}
              imagestyle={`border border-gray-100 w-[200px] h-[2036] flex flex-col justify-center items-center p-5! gap-y-4`}
            />
          </div>
        </div>
      </Containere>
    </div>
  );
};

export default React.memo(Categories);
