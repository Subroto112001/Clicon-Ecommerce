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
            <div className="rounded w-[900px] h-[540px]">
              <SwiperSlider animationStyle="flip" ispagination={true}>
                <img
                  src={assets.BannerLeft}
                  alt={assets.BannerLeft}
                  className="w-full h-full object-cover rounded cursor-grab"
                />
              </SwiperSlider>
            </div>
            <div className="grid grid-rows-2 justify-items-stretch gap-y-5 ">
              <div className=" rounded w-[400px] h-[300px] ">
                <SwiperSlider animationStyle="cards" ispagination={true}>
                  <img
                    src={assets.BannerRight1}
                    alt={assets.BannerRight1}
                    className="w-full h-full object-cover rounded"
                  />
                </SwiperSlider>
              </div>
              <div className=" rounded w-[400px] h-[300px]">
                <SwiperSlider animationStyle="cards" ispagination={true}>
                  <img
                    src={assets.BannerRight2}
                    alt={assets.BannerRight2}
                    className="w-full h-full object-cover rounded"
                  />
                </SwiperSlider>
              </div>
            </div>
          </div>
        </Containere>
      </div>
    </>
  );
};

export default React.memo(Banner);
