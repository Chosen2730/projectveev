import React, { useEffect, useState } from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Currency from "../../Components/Configs/currency";

const SingleOrder = () => {
  const { orderID } = useParams();
  console.log(orderID);
  const { allOrders } = useSelector((state) => state.admin);
  const [order, setOrder] = useState({});
  useEffect(() => {
    setOrder(() => allOrders.find((order) => order.orderId === orderID));
  }, [orderID]);
  console.log(order);
  const { name, message, trxref, cartItems } = order && order;
  const prices = cartItems?.map((cartItem) => cartItem.itemTotal);
  const totalPrice = prices?.reduce((sum, price) => sum + price);
  return (
    <div>
      <Link to='/admin' className='flex items-center gap-2 font-medium'>
        <i>
          <MdOutlineArrowBackIos />
        </i>
        <h2>Back</h2>
      </Link>
      <h2 className='font-bold my-4 text-2xl'>Order Details</h2>
      <div className='border p-5 shadow-md font-medium'>
        <div className='flex gap-4 justify-between border-b py-4'>
          <h2 className=''>Name</h2>
          <h2>{name}</h2>
        </div>
        <div className='flex gap-4 justify-between border-b py-4'>
          <h2 className=''>Email</h2>
          <h2>patiencesimoniseoluwa@gmail.com</h2>
        </div>
        <div className='flex gap-4 justify-between border-b py-4'>
          <h2 className=''>Phone Number</h2>
          <h2>08132157321</h2>
        </div>
        <div className='flex gap-4 justify-between border-b py-4'>
          <h2 className='w-[50%]'>Shipping Address</h2>
          <h2>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam
            quos eius in eaque soluta provident unde numquam, ipsum repellat
            quod.
          </h2>
        </div>
        <div className='flex gap-4 justify-between border-b py-4'>
          <h2 className=''>Payment Status</h2>
          <h2>{message}</h2>
        </div>
        <div className='flex gap-4 justify-between border-b py-4'>
          <h2 className=''>Transaction Reference</h2>
          <h2>{trxref}</h2>
        </div>
        <div className='border-b py-4'>
          <h2 className='font-medium my-2'>Total Items: {cartItems?.length}</h2>

          <div>
            {cartItems?.map(
              ({ img, item, desc, itemTotal, price, qty }, index) => {
                return (
                  <div
                    className='flex gap-5 items-center text-sm my-4 border-b p-3'
                    key={index}
                  >
                    <img
                      src={img}
                      className='w-10 h-10 object-contain'
                      alt={item}
                    />
                    <h2 className='whitespace-nowrap'>{item}</h2>
                    <h2 className='w-[50%]'>{desc}</h2>
                    <h2 className='whitespace-nowrap font-bold'>
                      Price: {price}
                    </h2>
                    <h2 className='whitespace-nowrap'>Qty: {qty}</h2>
                    <h2 className='whitespace-nowrap font-bold'>
                      Subtotal: {itemTotal}
                    </h2>
                  </div>
                );
              }
            )}
          </div>
        </div>
        <div className='flex gap-4 justify-between border-b py-4 items-center'>
          <h2 className=''>Order Status</h2>
          <select
            name='orderStatus'
            className='p-4 px-10 bg-gray-300 rounded-md'
            id=''
          >
            <option value='pending'>Pending</option>
            <option value='Delivered'>Delivered</option>
            <option value='Cancelled'>Cancelled</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;
