import React from "react";
import Containere from "../../CoomonComponent/Container/Containere";
import CommonSLider from "../../CoomonComponent/CommonSLider";
import { useApp } from "../../../Hooks/Context/Contextapi";

const Categories = () => {
  const { localCategory } = useApp();
  const categories = Array.isArray(localCategory) ? localCategory : [];
  return (
    <div className="pt-3.5!">
      <Containere>
        <div className="">
          <div className="grid justify-center items-center">
            <h1 className="heading1 text-gray-900">Shop By Categorry</h1>
          </div>
          <div className="!mt-10">
            <CommonSLider
              categories={categories}
              titlestyle={`body-medium-500 text-gray-900`}
              imagestyle={`border border-gray-100 w-[200px] h-[236px] flex flex-col justify-center items-center p-5! gap-y-4`}
            />
          </div>
        </div>
      </Containere>
    </div>
  );
};

export default React.memo(Categories);
