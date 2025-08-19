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
  animationStyle: string;
  ispagination: boolean;
  data?: any[];
  slideCount : number;
}
const SwiperSlider: React.FC<propsType> = ({
  animationStyle = "flip",
  ispagination,
  data,
  slideCount,
}) => {
  console.log(data);

  return (
    <div>
      <Swiper
        modules={[
          ...(ispagination ? [Pagination] : []),
          A11y,
          EffectFlip,
          Autoplay,
          EffectCards,
        ]}
        effect={animationStyle}
        spaceBetween={50}
        slidesPerView={slideCount}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {data?.map((item, index) => (
          <SwiperSlide key={index}>
            <img
              src={item.images}
              alt={`banner-${item.id}`}
              className="w-full h-full object-cover rounded cursor-grab"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default React.memo(SwiperSlider);