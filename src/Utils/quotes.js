import React, { useRef, useState } from "react";
// Import Swiper React components
import { SwiperSlide, Swiper } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper";

export default function Slider() {
  const quotes = [
    "Up to 10% off website launch sales ",
    "Get a decent and classic dress styled from us",
    "Measurement guide on all custom wear orders",
  ];
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={3}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: true }}
      >
        {quotes.map((quote, i) => {
          return (
            <SwiperSlide key={i}>
              <p className='text-base text-center capitalize font-medium my-2 text-white py-6'>
                {quote}
              </p>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
