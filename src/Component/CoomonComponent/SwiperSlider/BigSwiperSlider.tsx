import React from "react";
import {
  Pagination,
  EffectFlip,
  A11y,
  Autoplay,
  EffectCards,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";
// @ts-ignore
import "swiper/css/pagination";

interface leftBottomType {
  _id: number;
  image: {
    url: string;
  };
}

interface propsType {
  animationStyle: string;
  ispagination: boolean;
  data?: any[];
  slideCount: number;
}
const BigSwiperSlider: React.FC<propsType> = ({
  animationStyle = "flip",
  ispagination,
  data,
  slideCount,
}) => {
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
      >
        {data?.map((item: leftBottomType, index) => (
          <SwiperSlide key={index}>
            <img
              src={item?.image?.url}
              alt={`banner-${item._id}`}
              className="w-full  h-[550px] object-cover rounded cursor-grab"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default React.memo(BigSwiperSlider);
