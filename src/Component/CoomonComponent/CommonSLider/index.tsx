import React from "react";

import {  A11y, Navigation, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";
import { categoriesarrow } from "../../../Helpers/IconProvider";


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
    <div className="relative">
      <Swiper
        modules={[Navigation, Scrollbar, A11y]}
        spaceBetween={20}
        slidesPerView={6}
        loop={true}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        scrollbar={{ draggable: true }}
      >
        {data?.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="flex flex-col justify-center items-center gap-2">
              <div className={imagestyle}>
                <img
                  src={item.image.url}
                  alt={item.image}
                  className="w-full h-full "
                />
              </div>
                <p className={titlestyle}>{item.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom buttons */}
      <div className="custom-prev w-10 h-10 bg-primary-500 hover:bg-primary-400 text-white rounded-full flex items-center justify-center cursor-pointer absolute top-1/2 left-[-19px] -translate-y-1/2 z-10">
        {categoriesarrow.prev}
      </div>
      <div className="custom-next w-10 h-10 bg-primary-500 hover:bg-primary-400 text-white rounded-full flex items-center justify-center cursor-pointer absolute top-1/2 right-[-19px] -translate-y-1/2 z-10">
        {categoriesarrow.next}
      </div>
    </div>
  );
};

export default React.memo(CommonSLider);
