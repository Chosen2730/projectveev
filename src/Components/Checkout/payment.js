import React from "react";
import Currency from "../Configs/currency";
// import { PaystackButton } from 'react-paystack'

const Payment = ({ informationDetails }) => {
  // const componentProps = {
  //   email: informationDetails,
  //   amount: 3000,
  //   metadata: {
  //     name: informationDetails.name,
  //     phone: informationDetails.phone,
  //   },
  //   publicKey: 'pk_test_24ddae0d0c49925a3937ab60331bcc4f3d594c52',

  //   text: () => { return <h1>Place Order</h1> },
  //   onSuccess: () =>
  //     alert("Thanks for doing business with us! Come back soon!!"),
  //   onClose: () => alert("Wait! You need this oil, don't go!!!!"),
  // }

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
    </div>
  );
};

export default Payment;
