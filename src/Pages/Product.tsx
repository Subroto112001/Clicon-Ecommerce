import React, { useRef } from "react";
import { productImage } from "../Helpers/ImageProvider";
import Containere from "../Component/CoomonComponent/Container/Containere";
import BreadCrumb from "../Component/CoomonComponent/BreadCrumb/BreadCrumb";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
const Product = () => {


    const prevRef = useRef(null);
    const nextRef = useRef(null);
  return (
    <div>
      <div className="py-6 bg-gray-100">
        <Containere>
          <BreadCrumb />
        </Containere>
      </div>

      <div>
        <Containere>
          <div className="main py-5">
            {/* left */}
            <div className="flex flex-col justify-center items-center">
              <div className="w-[600px] h-[464px] p-5 border border-gray-200 rounded">
                <img
                  src={productImage.ProductImage}
                  alt=""
                  className="w-full h-full"
                />
              </div>
              <div className="mt-5 w-[600px] relative">
                <Swiper
                  modules={[Navigation]}
                  navigation={{
                    nextEl: ".next-btn",
                    prevEl: ".prev-btn",
                  }}
                  loop={true}
                  slidesPerView={4}
                  spaceBetween={58}
                  grabCursor={true}
                  className="mySwiper"
                >
                  {[...Array(5)].map((_, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={productImage.ProductImage}
                        alt=""
                        className="w-[100px] h-[80px] rounded-md"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <button
                  ref={prevRef}
                  className="absolute top-1/2 left-[-30px] -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-yellow-500 shadow-md flex items-center justify-center hover:scale-105 transition"
                  aria-label="Previous"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M15 18L9 12L15 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* Next button */}
                <button
                  ref={nextRef}
                  className="absolute top-1/2 right-2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-105 transition"
                  aria-label="Next"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 18L15 12L9 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {/* right */}
            <div></div>
          </div>
        </Containere>
      </div>
    </div>
  );
};

export default Product;
