import React, { useRef, useState } from "react";
// Import Swiper React components
import { SwiperSlide, Swiper } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper";
import pat from "../images/pat.jpg";
import tosin from "../images/tosin.jpg";
import victor from "../images/victor.jpg";
import omo from "../images/omo.jpg";

export default function Slider() {
  const testimonial = [
    {
      name: "Tosin Atewogboye",
      content:
        "Thank you for our dresses, you did well, we received lots of compliments.",
      img: tosin,
    },
    {
      name: "Pat Irete",
      content:
        "The Agbada I bought for my husband get swag o. I love it, He loves it, the fabrics,  the colours,  and the embroidery are lovely. Thank you so much more grace, I'll definitely buy more..",
      img: pat,
    },
    { name: "Akokwu Victor", content: "Quality always", img: victor },
    {
      name: "Okeoghene Omoluwabi",
      content:
        "A growing brand with particular interest in customer satisfaction. When a business is built on integrity and what drives it is ensuring that the customers get premium quality, then you can be sure to go to sleep when dealing with VeeV clothiers.",
      img: omo,
    },
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
        {testimonial.map(({ content, name, img }, i) => {
          return (
            <SwiperSlide key={i}>
              <div className='hover:scale-105 transition flex flex-col items-center justify-center my-6 py-6'>
                <img
                  src={img}
                  className='w-32 rounded-full h-32 object-cover'
                  alt={name}
                />
                <p className='uppercase text-sm font-bold mt-3'>{name}</p>
                <p className='text-sm text-center capitalize font-medium'>
                  {content}
                </p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
