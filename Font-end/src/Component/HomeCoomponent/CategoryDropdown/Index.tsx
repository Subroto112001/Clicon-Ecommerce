import React, { useState, type JSX } from "react";
import Containere from "../../CoomonComponent/Container/Containere";
import { icons } from "../../../Helpers/IconProvider";
const Categorydropdown = () => {
  const [categoryOpen, setCategoryOpen] = useState<Boolean>(false);
  const tranAndOthers: {
    id: number;
    name: string;
    icons: JSX.Element;
  }[] = [
    {
      id: 1,
      name: "Track Order",
      icons: icons.locationicon,
    },
    {
      id: 2,
      name: "Compare",
      icons: icons.compare,
    },
    {
      id: 3,
      name: "Customer Support",
      icons: icons.customerSupport,
    },
    {
      id: 4,
      name: "Need Help",
      icons: icons.help,
    },
  ];


  return (
    <div className="shadow-sm">
      <Containere>
        <div className="!py-3 grid grid-cols-2 items-center">
          <div className="flex items-center gap-x-2">
            {/* category dropdown */}
            <div className="relative">
              <select
                name="category"
                id="category"
                className="!px-4 !pr-7 !py-5 bg-gray-50 body-small-500 appearance-none outline-none rounded cursor-pointer "
                onClick={() => setCategoryOpen(!categoryOpen)}
              >
                <option className="body-small-500" value="AllCategory">
                  All Category
                </option>
                <option className="body-small-500" value="Mobile">
                  Mobile
                </option>
                <option className="body-small-500" value="Laptop">
                  Laptop
                </option>
                <option className="body-small-500" value="Camera">
                  Camera
                </option>
                <option className="body-small-500" value="Accesorise">
                  Accesorise
                </option>
              </select>
              <span className="absolute top-1/2 -translate-1/2 left-[8.5%] text-[20px]">
                {categoryOpen ? icons.upArrow : icons.downArrow}
              </span>
            </div>
            {/* track and compare and others*/}
            <div>
              <div className="flex flex-row  items-center gap-6">
                {tranAndOthers.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-row justify-center items-center gap-[11px] body-small-400 text-gray-600 cursor-pointer"
                  >
                    <span>{item.icons}</span>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* contact section */}
          <div className=" text-gray-900 body-large-400 flex justify-end gap-2 cursor-pointer">
            <span>{icons.phone}</span>
            <span>+1-202-555-0104</span>
          </div>
        </div>
      </Containere>
    </div>
  );
};

export default React.memo(Categorydropdown) || Categorydropdown;
