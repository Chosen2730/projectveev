import React, { useRef, useState } from "react";
// Import Swiper React components
import { SwiperSlide, Swiper } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import men from "../images/men.jpg";
import women from "../images/women.jpg";
import kid from "../images/kids.jpg";
import fab from "../images/fab.jpg";
import prints from "../images/prints.jpg";
import women2 from "../images/women2.jpg";

// import required modules
import { Pagination, Autoplay } from "swiper";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

export default function Slider() {
  const images = [
    { img: men, text: "Affordable Luxury For Men Women Kids" },
    { img: women, text: "Owambe/Asoebi Bespoke Tailoring" },
    { img: kid, text: "Get Beautiful And Unique Outfits From Us" },
    { img: fab, text: "Culture, Style, & Class in African Prints" },
    { img: women2, text: "Up To 10% Off Website Launch Sales" },
    { img: prints, text: "African Prints in beautiful designs" },
    // { img: women2, text: "Culture | Style | Class in African Prints" },
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
