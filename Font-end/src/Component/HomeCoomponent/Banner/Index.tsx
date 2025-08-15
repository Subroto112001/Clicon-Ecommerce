import React from "react";
import Containere from "../../CoomonComponent/Container/Containere";
import { assets } from "../../../Helpers/ImageProvider";
import SwiperSlider from "../../CoomonComponent/SwiperSlider/SwiperSlider";



const Banner = () => {
  return (
    <>
      <div className="!py-10">
        <Containere>
          <div className="grid grid-cols-[2fr_1fr] gap-5">
            <div className="rounded w-[1000px]">
              
              <SwiperSlider/>
            </div>
            <div className="grid grid-rows-2 justify-items-stretch gap-y-5 ">
              <div className=" rounded ">
                <img
                  src={assets.BannerRight1}
                  alt={assets.BannerRight1}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className=" rounded">
                <img
                  src={assets.BannerRight2}
                  alt={assets.BannerRight2}
                  className="w-full h-full object-cover rounded"
                />
              </div>
            </div>
          </div>
        </Containere>
      </div>
    </>
  );
};

export default React.memo(Banner);
