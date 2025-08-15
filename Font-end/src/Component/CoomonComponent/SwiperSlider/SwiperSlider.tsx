import React from 'react'
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";
// @ts-ignore
import "swiper/css/pagination";



import { assets } from '../../../Helpers/ImageProvider';
const SwiperSlider = () => {
  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination,  A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {[1, 2, 3, 4].map((item) => (
          <SwiperSlide>
            <img
              src={assets.BannerLeft}
              alt={assets.BannerLeft}
              className="w-full h-full object-cover rounded"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default React.memo(SwiperSlider);