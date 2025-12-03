import React from "react";
import Containere from "../../CoomonComponent/Container/Containere";

import SwiperSlider from "../../CoomonComponent/SwiperSlider/SwiperSlider";
import { useBannerData } from "../../../Hooks/api-mutaion/api-mutation";
import BigSwiperSlider from "../../CoomonComponent/SwiperSlider/BigSwiperSlider";



const Banner = () => {
 

const { data: bannerData, error: bannerError, isLoading: bannerLoading } = useBannerData();

  return (
    <>
      <div className="!py-10">
        <Containere>
          <div className="grid grid-cols-[2fr_1fr] gap-5">
            <div className="rounded w-[900px] h-[550px]">
              <BigSwiperSlider
                animationStyle="flip"
                ispagination={true}
                data={bannerData?.data}
                slideCount={1}
              />
            </div>
            <div className="grid grid-rows-2 justify-items-stretch gap-y-1 ">
              <div className=" rounded w-[400px] h-[300px] ">
                <SwiperSlider
                  animationStyle="cards"
                  ispagination={true}
                  data={bannerData?.data}
                  slideCount={1}
                />
              </div>
              <div className=" rounded w-[400px] h-[300px]">
                <SwiperSlider
                  animationStyle="cards"
                  ispagination={true}
                  data={bannerData?.data}
                  slideCount={1}
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
