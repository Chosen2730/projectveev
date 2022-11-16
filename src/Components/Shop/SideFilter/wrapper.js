import React from "react";
import { BsChevronDown } from "react-icons/bs";

const Wrapper = ({ children, func, title }) => {
  return (
    <div className='bg-gray-50 shadow-md my-6 p-4'>
      {/* <div className='h-[1px] my-3 w-full bg-gray-700 ' /> */}
      <div className=''>
        <div
          className='flex gap-2 items-center justify-between cursor-pointer'
          onClick={func}
        >
          <h1 className='text-sm font-bold'>{title}</h1>
          <i>
            <BsChevronDown />
          </i>
        </div>
        <div className='mt-4'>{children}</div>
      </div>
    </div>
  );
};

export default Wrapper;
