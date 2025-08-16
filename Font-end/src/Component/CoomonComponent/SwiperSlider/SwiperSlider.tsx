import React from 'react'
import { Pagination, EffectFlip, A11y,Autoplay, EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";
// @ts-ignore
import "swiper/css/pagination";


interface propsType {
  children: React.ReactNode;
  animationStyle: string;
  ispagination: boolean;
}
const SwiperSlider: React.FC<propsType> = ({
  children,
  animationStyle = "flip",
  ispagination ,
}) => {
  return (
    <div>
      <Swiper
        modules={[...(ispagination? [Pagination] : []), A11y, EffectFlip, Autoplay, EffectCards]}
        effect={animationStyle}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {[1, 2, 3, 4].map((item) => (
          <SwiperSlide>{children}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default React.memo(SwiperSlider);