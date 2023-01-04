import React from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swiper from "../../Utils/quotes";
import HeroSwiper from "../../Utils/heroSwiper";

const Hero = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <div className='relative h-[700px]'>
      <HeroSwiper />
      <div className='cat-bg-grad p-8 absolute top-0 z-10 h-full flex flex-col justify-center  w-full'>
        <div>
          <h1 className='text-5xl md:text-8xl font-bold text-white'>
            Stand Out <br /> Fashionably!
          </h1>
          <Link to='/shop'>
            <button className='uppercase font-medium text-sm bg-black w-fit p-4 px-12 text-white my-5 hover:scale-105 hover:bg-gray-700'>
              Shop now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
