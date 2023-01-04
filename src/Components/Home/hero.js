import React from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swiper from "../../Utils/quotes";

const Hero = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <div className='min-h-[600px] hero-bg flex flex-col justify-center p-8'>
      <h1 className='text-5xl md:text-8xl font-bold text-white'>
        Stand Out <br /> Fashionably!
      </h1>
      <Link to='/shop'>
        <button className='uppercase font-medium text-sm bg-black w-fit p-4 px-12 text-white my-5 hover:scale-105 hover:bg-gray-700'>
          Shop now
        </button>
      </Link>
      <div className='flex items-center cat-bg-grad gap-4 px-8 w-full sm:w-[40%] ml-auto'>
        <i>
          <AiOutlineArrowLeft className='bg-white w-4 h-4 md:w-7 md:h-7 flex items-center justify-center rounded-full md:p-2 p-1 cursor-pointer' />
        </i>
        <Swiper />
        <i>
          <AiOutlineArrowRight className='bg-white w-4 h-4 md:w-7 md:h-7 flex items-center justify-center rounded-full md:p-2 p-1 cursor-pointer' />
        </i>
      </div>
    </div>
  );
};

export default Hero;
