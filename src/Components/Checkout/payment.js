import React from "react";
import Currency from "../Configs/currency";

const Payment = ({ informationDetails, deliveryFee }) => {
  return (
    <div className='my-10'>
      <h2 className='font-medium uppercase text-base my-3'>Shipping</h2>
      <div className='flex flex-col md:flex-row justify-between gap-4 md:items-center p-8 border-2'>
        <h2 className='uppercase text-sm'>Address</h2>
        <h2 className='font-medium'>{informationDetails.email}</h2>
        <h2 className='uppercase text-sm cursor-pointer'>Change</h2>
      </div>
      <div className='flex flex-col md:flex-row justify-between gap-4 md:items-center p-8 border-2'>
        <h2 className='uppercase text-sm'>Ship to</h2>
        <h2 className='font-medium'>{informationDetails.address}</h2>
        <h2 className='uppercase text-sm cursor-pointer'>Change</h2>
      </div>
      <div className='flex flex-col md:flex-row justify-between gap-4 md:items-center p-8 border-2'>
        <h2 className='uppercase text-sm'>Method</h2>
        <h2 className='uppercase text-sm'>DHL Logistics</h2>
        <Currency className='font-medium' amount={deliveryFee} />
      </div>
    </div>
  );
};

export default Payment;
