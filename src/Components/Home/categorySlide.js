import React from "react";

const Slide = ({ data }) => {
  return (
    <div className='my-10 mx-auto md:-mt-28'>
      <div className='grid grid-flow-col overflow-x-scroll horScroll scroll gap-6 md:gap-2'>
        {data.map(({ title, img }, i) => {
          return (
            <div
              key={i}
              className='w-[150px] md:w-[350px] flex items-center flex-col'
            >
              <img
                src={img}
                className='w-40 h-52 md:w-80 md:h-[300px] object-cover rounded-3xl shadow-xl'
                alt={title}
              />
              <p className='md:-translate-y-20 -translate-y-16 text-xs md:text-base capitalize font-medium my-2 bg-black text-white p-3 md:px-10'>
                {title}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Slide;
