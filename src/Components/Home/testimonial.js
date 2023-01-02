import React from "react";
import { MdArrowUpward, MdOutlineArrowDownward } from "react-icons/md";
import Swiper from "../../Utils/swiper";

const Testimonial = () => {
  return (
    <div className='max-w-2xl mx-auto'>
      <p className='text-center md:w-3/4 mx-auto text-sm'>
        Trendy Clothing & Accessories at VEEV CLOTHIERS - An Online Dress
        Boutique REPIIT is a UNISEX clothing store with new trendy and
        affordable arrivals dropping 2-3 times weekly. Shop the latest trends in
        women's fashion dresses, tops, sweaters, skirts, jeans, accessories &
        more.
      </p>
      <div className='flex flex-col md:flex-row-reverse items-center my-10 gap-8'>
        <div className='w-full'>
          <h1 className='font-bold text-2xl'>FEED BACKS FROM OUR CLIENTS</h1>
          <p className='text-sm my-2'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi
            .Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi .
          </p>
        </div>
        {/* <div className='hidden md:flex flex-col gap-8 justify-between items-center w-[10%]'>
          <MdArrowUpward className='rounded-full border-black text-3xl p-1 border-2 ' />
          <div className='flex flex-col items-center justify-center gap-2'>
            <div className='h-2 w-2 bg-gray-400 rounded-full' />
            <div className='h-3 w-3 bg-gray-700 rounded-full' />
            <div className='h-5 w-5 bg-black rounded-full' />
            <div className='h-3 w-3 bg-gray-700 rounded-full' />
            <div className='h-2 w-2 bg-gray-400 rounded-full' />
          </div>
          <MdOutlineArrowDownward className='rounded-full border-black text-3xl p-1 border-2 ' />
        </div> */}
        {/* <div className='w-full flex flex-col gap-12'>
          <div className='rounded-2xl bg-gray-100 shadow-md flex flex-col items-center justify-center p-6'>
            <img
              src='https://i.pinimg.com/474x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg'
              alt=''
              className='w-20 h-20 object-cover rounded-full'
            />
            <p className='text-sm my-2'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
              dolorem, enim ut consequuntur aliquid ad animi est cupiditate
              libero illo.
            </p>
          </div>
          <div className='rounded-2xl bg-gray-100 shadow-md flex flex-col items-center justify-center p-6'>
            <img
              src='https://i.pinimg.com/474x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg'
              alt=''
              className='w-20 h-20 object-cover rounded-full'
            />
            <p className='text-sm my-2'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
              dolorem, enim ut consequuntur aliquid ad animi est cupiditate
              libero illo.
            </p>
          </div>
        </div> */}
      </div>
      <Swiper />
    </div>
  );
};

export default Testimonial;
