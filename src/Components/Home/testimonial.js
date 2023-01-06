import React from "react";
import Swiper from "../../Utils/swiper";

const Testimonial = () => {
  return (
    <div className='max-w-2xl mx-auto'>
      <div className='flex flex-col md:flex-row-reverse items-center my-10 gap-8'>
        <div className='w-full'>
          <h1 className='font-bold text-2xl uppercase'>
            Reviews FROM OUR CLIENTS
          </h1>
          {/* <p className='text-sm my-3'>
            Trendy Clothing & Accessories at VEEV CLOTHIERS - An Online Dress
            Boutique REPIIT is a UNISEX clothing store with new trendy and
            affordable arrivals dropping 2-3 times weekly.
          </p> */}
        </div>
      </div>
      <Swiper />
    </div>
  );
};

export default Testimonial;
