import React from "react";
import Currency from "../Configs/currency";
import { AiFillEye } from "react-icons/ai";
import { FaOpencart } from "react-icons/fa";

const ProductContainer = ({ name, data }) => {
  return (
    <div className='my-6'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {data?.slice(0, 3).map(({ img, item, price, oldPrice }, i) => {
          return (
            <div
              className='flex flex-col items-center justify-center relative'
              key={i}
            >
              <img
                className='w-full h-[500px] object-cover shadow-xl shadow-gray-100 rounded-md'
                src={img}
                alt={item}
              />
              <div className='my-3 text-center'>
                <h2 className='uppercase font-medium text-sm'>{item}</h2>
                <Currency className='font-bold my text-lg' amount={price} />
                <Currency
                  className='font-medium line-through text-gray-500 text-sm'
                  amount={oldPrice}
                />
              </div>
              <AiFillEye className='absolute top-8 right-8 text-4xl cursor-pointer' />
              <button className='flex items-center justify-center text-white p-4 px-8 rounded-full bg-black gap-2 absolute bottom-28 hover:scale-105 transition'>
                Add to Cart
                <FaOpencart className='text-2xl' />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductContainer;
