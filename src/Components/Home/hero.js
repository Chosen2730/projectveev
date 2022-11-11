import React from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
const Hero = () => {
  return (
    <div className='min-h-[600px] hero-bg flex flex-col justify-center p-8'>
      <h1 className='text-5xl md:text-8xl font-bold text-white'>
        Repping a <br /> better you!
      </h1>
      <button className='uppercase font-medium text-sm bg-black w-fit p-4 px-12 text-white my-5 hover:scale-105 hover:bg-gray-700'>
        Shop now
      </button>
      <div className='flex items-center cat-bg-grad gap-4 p-8 w-full sm:w-[40%] ml-auto'>
        <i>
          <AiOutlineArrowLeft className='bg-white w-6 h-6 md:w-10 md:h-10 flex items-center justify-center rounded-full md:p-2 p-1 cursor-pointer' />
        </i>
        <p className='text-white text-sm'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum,
          aperiam?
        </p>
        <i>
          <AiOutlineArrowRight className='bg-white w-6 h-6 md:w-10 md:h-10 flex items-center justify-center rounded-full md:p-2 p-1 cursor-pointer' />
        </i>
      </div>
    </div>
  );
};

export default Hero;
