import { info } from "autoprefixer";
import React, { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useSelector } from "react-redux";
import Currency from "../Components/Configs/currency";
import Input from "../Components/Form/input";

const Checkout = () => {
  const { cartItems, totalAmount } = useSelector((state) => state.product);
  const stages = ["information", "shipping", "payment"];
  const [selected, setSelected] = useState(0);
  const nextCheck = () => {
    setSelected((oldState) => {
      const newState = oldState + 1;
      if (newState > 2) {
        return 2;
      } else return newState;
    });
  };
  return (
    <div className='flex flex-col md:flex-row gap-8 p-4 md:p-8'>
      <div className='md:w-[65%]'>
        <h1 className='uppercase font-medium text-xl'>Checkout</h1>
        <div className='flex gap-3 my-10 items-center'>
          <h1 className='uppercase font-medium'>
            Bag ({cartItems.length} items)
          </h1>
          <div className='flex items-center gap-2'>
            {stages.map((item, i) => {
              return (
                <div key={i} className='flex gap-2 items-center'>
                  <i className='text-sm p-1 rounded-full bg-gray-100'>
                    <AiOutlineArrowRight />
                  </i>
                  <h1
                    className={`${
                      selected === i ? "font-bold" : "font-normal"
                    } uppercase cursor-pointer`}
                    onClick={() => setSelected(i)}
                  >
                    {item}
                  </h1>
                </div>
              );
            })}
          </div>
        </div>
        <div className='uppercase'>
          <Input
            type='address'
            textarea
            id='address'
            title='delivery address'
          />
          <div className='grid grid-cols-2 items-center gap-4 w-full'>
            <Input type='name' input id='first_name' title='first name' />
            <Input type='name' input id='last_name' title='last name' />
          </div>
          <div className='grid grid-cols-2 items-center gap-4 w-full'>
            <Input type='text' input id='company_name' title='company name' />
            <Input
              type='name'
              dropdown
              data={["Select", "Nigeria", "USA"]}
              id='last_name'
              title='Country/Region'
            />
          </div>
          <div className='grid grid-cols-2 items-center gap-4 w-full'>
            <Input type='address' input id='town' title='town/city' />
            <Input type='address' input id='state' title='State' />
          </div>
          <div className='grid grid-cols-2 items-center gap-4 w-full'>
            <Input type='number' input id='tel' title='Phone Number' />
            <Input type='email' input id='email' title='Email Address' />
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex gap-2 items-center'>
            <i className='text-sm p-1 rounded-full bg-gray-300 text-white'>
              <AiOutlineArrowLeft />
            </i>
            <h1 className='font-normal uppercase'>Back to bag</h1>
          </div>
          <button
            className='bg-black text-white p-4 px-12 rounded-full hover:scale-105 transition hover:text-gray-200'
            onClick={nextCheck}
          >
            Next
          </button>
        </div>
      </div>
      <div className='md:w-[35%]'>
        <h1 className='uppercase font-medium text-xl'>Order summary</h1>
        <div className='border-b-2'>
          {cartItems.map(({ img, item, itemTotal, qty }, id) => {
            return (
              <div
                key={id}
                className='flex my-4 items-center gap-4 p-4 bg-gray-50 rounded-md shadow-xl shadow-gray-100 relative'
              >
                <img className='w-20 h-20 object-cover' src={img} alt={item} />
                <div>
                  <h2 className='text-sm'>{item}</h2>
                  <span className='my-4'>Qty: {qty}</span>
                  <h2 className='font-medium'>
                    Subtotal:{" "}
                    <Currency
                      className='inline-block text-sm font-bold '
                      amount={itemTotal}
                    />
                  </h2>
                </div>
              </div>
            );
          })}
        </div>
        <div className='border-b-2 bg-gray-50 shadow-md p-4'>
          <div className='flex justify-between items-center'>
            <h2 className='text-lg my-4'>Sub Total: </h2>
            <span className='text-lg font-medium'>
              <Currency className='inline-flex' amount={totalAmount} />
            </span>{" "}
          </div>
          <div className='flex justify-between items-center'>
            <h2 className='text-lg my-4'>Delivery Fee: </h2>
            <span className='text-lg font-medium'>
              <Currency className='inline-flex' amount={500} />
            </span>{" "}
          </div>
        </div>
        <div className='border-b-2 bg-gray-50 shadow-md p-4'>
          <div className='flex justify-between items-center'>
            <h2 className='text-lg my-4'>Grand Total: </h2>
            <span className='text-lg font-bold'>
              <Currency className='inline-flex' amount={totalAmount + 500} />
            </span>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
