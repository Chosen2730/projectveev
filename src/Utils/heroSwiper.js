import React, { useRef, useState } from "react";
// Import Swiper React components
import { SwiperSlide, Swiper } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import men from "../images/men.png";
import women from "../images/women.png";
import kid from "../images/kid.jpg";
import fab from "../images/fab.jpg";

// import required modules
import { Pagination, Autoplay } from "swiper";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

export default function Slider() {
  const images = [
    { img: men, text: "Up to 10% off website launch sales " },
    { img: women, text: "Get beautiful and unique outfits from us" },
    { img: kid, text: "Measurement guide on all custom orders" },
    { img: fab, text: "Affordable luxury for Men|Women|Kids" },
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
        {images.map(({ img, text }, i) => {
          return (
            <SwiperSlide key={i}>
              <div>
                <img
                  className='object-cover w-screen h-[700px]'
                  src={img}
                  alt=''
                />
                <div className='relative bottom-52 flex items-center cat2-bg-grad gap-4 px-8 w-[90%] sm:w-[50%] justify-center md:mx-0 md:ml-auto mx-auto'>
                  <i>
                    <AiOutlineArrowLeft className='bg-white w-4 h-4 md:w-7 md:h-7 flex items-center justify-center rounded-full md:p-2 p-1 cursor-pointer' />
                  </i>
                  <p className='text-base text-center capitalize font-medium my-2 text-white py-6'>
                    {text}
                  </p>
                  <i>
                    <AiOutlineArrowRight className='bg-white w-4 h-4 md:w-7 md:h-7 flex items-center justify-center rounded-full md:p-2 p-1 cursor-pointer' />
                  </i>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
