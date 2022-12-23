import React, { useEffect } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Currency from "../Components/Configs/currency";
import Container from "../Components/Home/container";
import { featured } from "../Utils/products";
import { getTotalAmount, removeItem } from "../Redux/features/productSlice";
import { IoBagCheckOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  const { cartItems, totalAmount } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getTotalAmount());
  }, [cartItems]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkout = () => {
    if (totalAmount > 0) {
      navigate("/checkout");
    }
  };
  return (
    <div className='max-w-6xl mx-auto p-4'>
      <h2 className='font-bold uppercase'>Bag ({cartItems.length} items)</h2>
      <div className='flex flex-col md:flex-row gap-8'>
        <div className='md:w-[75%]'>
          {cartItems.map(
            ({ img, item, price, oldPrice, productId, itemTotal, qty }, id) => {
              return (
                <div
                  key={id}
                  className='flex my-4 items-center gap-4 p-8 py-10 bg-gray-50 rounded-md shadow-xl shadow-gray-100 relative'
                >
                  <MdClose
                    className='absolute top-4 right-4 text-2xl p-1 bg-black text-white rounded-full'
                    onClick={() => dispatch(removeItem({ id: productId }))}
                  />
                  <img
                    className='w-24 h-28 object-cover'
                    src={img}
                    alt={item}
                  />
                  <div>
                    <h2 className='text-sm'>{item}</h2>
                    <Currency
                      className='font-bold my text-sm md:text-lg'
                      amount={price}
                    />
                    <Currency
                      className='font-medium line-through text-gray-500 text-xs'
                      amount={oldPrice}
                    />
                    <h2 className='my-3 font-medium'>
                      <span className='mr-4'>Qty: {qty}</span>
                      <span className='block sm:inline-block'>
                        Subtotal:{" "}
                        <Currency
                          className='inline-block text-sm font-bold '
                          amount={itemTotal}
                        />
                      </span>
                    </h2>
                  </div>
                </div>
              );
            }
          )}
        </div>
        <div className='w-full md:w-[30%]'>
          <h2 className='font-bold text-base uppercase'>Bag Summary</h2>
          <div className='h-[2px] bg-gray-900 my-2' />
          <h2 className='text-lg my-4'>
            Total:{" "}
            <span className='text-2xl font-bold'>
              <Currency className='inline-flex' amount={totalAmount} />
            </span>{" "}
          </h2>
          <button
            className='flex items-center justify-center text-white p-4 px-8 rounded-full bg-black gap-2 hover:scale-105 transition font-bold'
            onClick={checkout}
          >
            Checkout
            <IoBagCheckOutline className='text-2xl' />
          </button>
        </div>
      </div>
      <Container data={featured} name='related posts' />
    </div>
  );
};

export default Cart;
