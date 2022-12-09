import React from "react";
import Currency from "../Configs/currency";
import pay from "../../images/pay.png";

const Payment = ({ informationDetails }) => {
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
        <h2 className='uppercase text-sm'>FTM Logistics</h2>
        <Currency className='font-medium' amount={3000} />
      </div>
      <h2 className='uppercase text-sm mt-8 font-bold'>Payment Method</h2>
      <p className='text-sm my-3'>All transactions are secure and encrypted.</p>
      <p className='text-sm my-3'>How do you want to place your order?</p>
      <div className='flex flex-col sm:flex-row sm:items-center my-10 gap-4'>
        <img src={pay} className='w-72' alt='payment_method' />
        <h2 className='font-medium italic text-base'>
          Pay with your Debit / Credit cards
        </h2>
      </div>
      <p className='text-sm my-8'>
        Your personal data will be used to process your order, support your
        experience throughout this website, and for other purposes described in
        our Privacy Policy
      </p>
    </div>
  );
};

export default Payment;
