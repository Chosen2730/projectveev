import React from "react";
import Currency from "../Configs/currency";
import { AiFillEye } from "react-icons/ai";
import { FaOpencart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../Configs/spinner";

const ProductContainer = ({ data, loading }) => {
  const navigate = useNavigate();
  if (data?.length < 1) {
    return (
      <div className='flex items-center justify-center h-[300px] w-full'>
        <h1 className='text-base italic'>
          No Product under this Category at the moment
        </h1>
      </div>
    );
  }
  if (loading) {
    return (
      <div className='flex items-center justify-center h-[300px] w-full'>
        <Spinner loaderText='Loading' />
      </div>
    );
  }
  return (
    <div className='my-6'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {data?.map(
          ({ imageURLS, title, price, discountValue, productId: id }) => {
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
                  alt={title}
                />
                <div className='my-3 text-center'>
                  {discountValue ? (
                    <div>
                      <h2 className='uppercase font-medium text-sm'>{title}</h2>
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
                      <h2 className='uppercase font-medium text-sm'>{title}</h2>
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
    </div>
  );
};

export default ProductContainer;
