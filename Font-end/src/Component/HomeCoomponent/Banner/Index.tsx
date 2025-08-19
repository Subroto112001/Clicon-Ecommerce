import React, { useState } from "react";
import Containere from "../../CoomonComponent/Container/Containere";
import { assets } from "../../../Helpers/ImageProvider";
import SwiperSlider from "../../CoomonComponent/SwiperSlider/SwiperSlider";



const Banner = () => {
  interface BannerItem {
    id: number;
    images: string; 
  }

  const [bannerlist, setBannerlist] = useState<BannerItem[]>([
    {
      id: 1,
      images: assets.BannerLeft,
    },
    {
      id: 2,
      images: assets.BannerLeft,
    },
    {
      id: 3,
      images: assets.BannerLeft,
    },
    {
      id: 4,
      images: assets.BannerLeft,
    },
  ]);
  const [bannerlist2, setBannerlist2] = useState<BannerItem[]>([
    {
      id: 1,
      images : assets.BannerRight1    },
    {
      id: 2,
      images : assets.BannerRight1    },
    {
      id: 3,
      images : assets.BannerRight1    },
    {
      id: 4,
      images : assets.BannerRight1    }
  ])
  const [bannerlist3, setBannerlist3] = useState<BannerItem[]>([
    {
      id: 1,
      images: assets.BannerRight2,
    },
    {
      id: 2,
      images: assets.BannerRight2,
    },
    {
      id: 3,
      images: assets.BannerRight2,
    },
    {
      id: 4,
      images: assets.BannerRight2,
    },
  ]);
  return (
    <>
      <div className="!py-10">
        <Containere>
          <div className="grid grid-cols-[2fr_1fr] gap-5">
            <div className="rounded w-[900px] h-[550px]">
              <SwiperSlider
                animationStyle="flip"
                ispagination={true}
                data={bannerlist}
                slideCount={1}
              />
            </div>
            <div className="grid grid-rows-2 justify-items-stretch gap-y-1 ">
              <div className=" rounded w-[400px] h-[300px] ">
                <SwiperSlider
                  animationStyle="cards"
                  ispagination={true}
                  data={bannerlist2}
                  slideCount={1}
                />
              </div>
              <div className=" rounded w-[400px] h-[300px]">
                <SwiperSlider
                  animationStyle="cards"
                  ispagination={true}
                  data={bannerlist3}
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
