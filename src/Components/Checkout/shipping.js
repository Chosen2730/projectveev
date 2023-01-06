import React from "react";
import Currency from "../Configs/currency";
import Input from "../Form/input";

const Shipping = ({ informationDetails, handleInputChange, deliveryFee }) => {
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
      <h2 className='font-medium uppercase text-base my-3 mt-8'>
        Shipping Method
      </h2>
      <div className='flex justify-between gap-4 items-center p-8 border-2'>
        <h2 className='uppercase text-sm'>DHL Logistics</h2>
        <Currency className='font-medium' amount={deliveryFee} />
      </div>
      <div className='p-8 border-2'>
        <Input
          setItem={handleInputChange}
          textarea
          title='ORDER NOTES (Optional)'
        />
      </div>
    </div>
  );
};

export default Shipping;
