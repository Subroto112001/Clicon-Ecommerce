import React from "react";

import {  A11y, Navigation, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";

interface propsType {
  data: any[];
  titlestyle: string;
  imagestyle: string;
}
const CommonSLider: React.FC<propsType> = ({
  data,
  titlestyle,
  imagestyle,
}) => {
  return (
    <div>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={6}
        navigation
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {data?.map((item) => (
          <SwiperSlide>
            <div className={imagestyle} key={item.id}>
              <img src={item.images} alt={item.images} />
              <p className={titlestyle}>{item.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default React.memo(CommonSLider);
