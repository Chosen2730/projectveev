import React from "react";
import Currency from "../Configs/currency";
import pay from "../../images/pay.png";
import { BsPaypal } from "react-icons/bs";
import { AiOutlineCreditCard } from "react-icons/ai";
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
      <h2 className='uppercase text-sm mt-8 font-bold'>Payment Method</h2>
      <p className='text-sm my-3'>All transactions are secure and encrypted.</p>
      <p className='text-sm my-3'>How do you want to place your order?</p>
      <div className='flex flex-col xl:flex-row sm:items-center my-10 gap-4 border justify-between p-3'>
        <img src={pay} className='w-72' alt='payment_method' />
        {/* <PaystackButton className="paystack-button" {...componentProps} /> */}
        <div className='flex items-center gap-3'>
          <button className='font-medium italic bg-sky-600 text-white p-5 rounded-md flex items-center gap-2 w-fit text-xs'>
            <i>
              <AiOutlineCreditCard />
            </i>{" "}
            Debit / Credit cards
          </button>
          <button className='font-medium italic bg-blue-800 text-white p-5 rounded-md flex items-center gap-2 w-fit text-xs'>
            <i>
              <BsPaypal />
            </i>{" "}
            Paypal
          </button>
        </div>
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
