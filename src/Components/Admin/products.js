import React from "react";
import { IoMdAdd } from "react-icons/io";
import { allProducts } from "../../Redux/features/adminSlice";
import Currency from "../Configs/currency";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
const Products = () => {
  const productHeader = ["product", "date", "price", "status", "actions"];
  return (
    <div>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-bold'>
          All Products ({allProducts.length})
        </h2>
        <button className='flex items-center justify-center text-white p-4 px-8 rounded-md bg-black gap-2 hover:scale-105 transition'>
          Upload Product
          <IoMdAdd className='text-2xl' />
        </button>
      </div>
      <div className='grid grid-cols-5 my-5 bg-gray-100 rounded-md p-5'>
        {productHeader.map((item, index) => {
          return (
            <h2 className='capitalize font-medium text-base' key={index}>
              {item}
            </h2>
          );
        })}
      </div>
      <div>
        {allProducts.map(({ item, img, price, desc }, index) => {
          return (
            <div
              key={index}
              className='grid grid-cols-5 my-2 p-5 text-xs items-center'
            >
              <div className='flex gap-2 items-center'>
                <img
                  className='w-10 h-10 rounded-md object-cover'
                  src={img}
                  alt={item}
                />
                <h2 className='font-medium'>{item}</h2>
              </div>
              <h2 className='capitalize'>02/04/22</h2>
              <Currency amount={price} className='font-medium' />
              <h2 className='capitalize'>In stock</h2>
              <div className='flex justify-between gap-2 text-5xl'>
                <AiOutlineDelete className='bg text-red-500 cursor-pointer p-3 rounded-md' />
                <AiOutlineEdit className='bg- text-blue-500 cursor-pointer p-3 rounded-md' />
                <AiOutlineEye className='bg-g text-gray-500 cursor-pointer p-3 rounded-md' />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
