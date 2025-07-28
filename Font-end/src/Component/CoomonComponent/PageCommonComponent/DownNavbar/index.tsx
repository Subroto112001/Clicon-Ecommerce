import Containere from "../../Container/Containere";
import { assets } from "../../../../Helpers/ImageProvider";
import Search from "../../CoomonEliment/Search";
import { icons } from "../../../../Helpers/IconProvider";
import type React from "react";
import { useState } from "react";
const DownNavbar = () => {

const [typeChange, setTypeChange] = useState<Boolean>(false);

    const handlechangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setTypeChange(true)
        console.log(event.target.value);
        
    }
    return (
      <div className="bg-secondary-700 py-4! border-t-2 border-t-[#3F7CA3]">
        <Containere>
          <div className="grid grid-cols-3 items-center ">
            <div>
              <picture>
                <img src={assets.Logo} alt={assets.Logo} />
              </picture>
            </div>
            <div>
              <Search className="relative">
                <input
                  type={typeChange ? "text" : "search"}
                  name="search"
                  onChange={handlechangeInput}
                  placeholder="Search for anything..."
                  className="bg-gray-00 body-small-400 w-full rounded text-gray-600 outline-none p-3! "
                />
                <span className="absolute top-[28%] text-gray-600 right-6 text-2xl">
                  {icons.search}
                </span>
              </Search>
            </div>
          </div>
        </Containere>
      </div>
    );
};

export default DownNavbar;
