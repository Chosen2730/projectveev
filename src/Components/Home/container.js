import React from "react";
import Currency from "../Configs/currency";
import { AiFillEye } from "react-icons/ai";
import { FaOpencart } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

const Container = ({ name, data }) => {
  const navigate = useNavigate();
  return (
    <div className='my-20'>
      <div className='flex gap-3 items-center my-6'>
        <div className='h-[2px] w-full bg-gray-700 ' />
        <h2 className='uppercase text-xl md:text-2xl font-bold w-full text-center'>
          {name}
        </h2>
        <div className='h-[2px] w-full bg-gray-700' />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {data
          ?.slice(0, 3)
          .map(
            ({
              imageURLS,
              discountValue,
              title,
              item,
              price,
              productId: id,
            }) => {
              let discount;
              discount = (parseInt(discountValue) / 100) * price;
              const newPrice = price - discount;
              const imageUrl = (imageURLS && imageURLS[0].url) || "";
              return (
                <div
                  className='flex flex-col items-center justify-center relative'
                  key={id}
                >
                  <img
                    className='w-full h-[500px] object-cover shadow-xl shadow-gray-100 rounded-md'
                    src={imageUrl}
                    alt={item}
                  />
                  <div className='my-3 text-center'>
                    {discountValue ? (
                      <div>
                        <h2 className='uppercase font-medium text-sm'>
                          {title}
                        </h2>
                        <Currency
                          className='font-bold my text-lg'
                          amount={newPrice}
                        />

                        <Currency
                          className='font-medium line-through text-gray-500 text-sm'
                          amount={price}
                        />
                      </div>
                    ) : (
                      <div>
                        {" "}
                        <h2 className='uppercase font-medium text-sm'>
                          {title}
                        </h2>
                        <Currency
                          className='font-bold my text-lg'
                          amount={price}
                        />
                      </div>
                    )}
                  </div>
                  <Link to={`/product/${id}`} className='modal_buttons link'>
                    <AiFillEye className='absolute top-8 right-8 text-4xl cursor-pointer' />
                  </Link>

                  <button
                    className='flex items-center justify-center text-white p-4 px-8 rounded-full bg-black gap-2 absolute bottom-28 hover:scale-105 transition'
                    onClick={() => navigate(`/product/${id}`)}
                  >
                    Shop Item
                    <FaOpencart className='text-2xl' />
                  </button>
                </div>
              );
            }
          )}
      </div>
      <div className='flex items-center justify-center mb-10'>
        <Link to='shop'>
          <button className='hover:scale-105 transition flex items-center justify-center border-2 border-black text-black p-4 px-8 rounded-full bg-white'>
            See More
            <IoIosArrowForward className='text-2xl' />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Container;
