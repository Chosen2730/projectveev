import React, { useEffect, useState } from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Currency from "../../Components/Configs/currency";
import { getOrderById, updateOrderStatus } from "../../Utils/functions";

const SingleOrder = () => {
  const { orderID } = useParams();
  const { allOrders } = useSelector((state) => state.admin);
  const [order, setOrder] = useState({});
  const [orderStatus, setOrderStatus] = useState("");
  // useEffect(() => {
  //   setOrder(() => allOrders.find((order) => order.orderId === orderID));
  // }, [allOrders, orderID]);
  useEffect(() => {
    const fetch = async () => {
      const orderRef = await getOrderById(orderID);
      setOrder(orderRef);
    };
    return fetch;
  }, [allOrders, orderID]);

  console.log(order, allOrders);
  const { name, email, phone, shippingAddress, message, trxref, cartItems } =
    order || null;
  const prices = cartItems?.map((cartItem) => cartItem.itemTotal);
  const totalPrice = prices?.reduce((sum, price) => sum + price);

  const handleUpdateOrderStatus = async () => {
    const ref = await updateOrderStatus(orderID, orderStatus);
    console.log(ref);
  };

  return (
    <div className='p-4'>
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
          <h2>{email}</h2>
        </div>
        <div className='flex gap-4 justify-between border-b py-4'>
          <h2 className=''>Phone Number</h2>
          <h2>{phone}</h2>
        </div>
        <div className='flex gap-4 justify-between border-b py-4'>
          <h2 className='w-[50%]'>Shipping Address</h2>
          <h2>{shippingAddress}</h2>
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
                    className='grid grid-cols-2 md:flex gap-5 items-center text-sm my-4 border-b p-3'
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
        <div className='flex gap-4 justify-between border-b py-4 bg-gray-400 p-4'>
          <h2 className=''>Grand Total</h2>
          <Currency className='font-bold' amount={totalPrice} />{" "}
        </div>
        <div className='flex gap-4 justify-between border-b py-4 items-center'>
          <h2 className=''>Order Status</h2>
          <select
            name='orderStatus'
            className='p-4 px-10 bg-gray-300 rounded-md'
            id=''
            onChange={(e) => {
              setOrderStatus(e.target.value);
            }}
          >
            <option value='pending'>Pending</option>
            <option value='delivered'>Delivered</option>
            <option value='bancelled'>Cancelled</option>
          </select>
        </div>
        <button
          className='bg-black text-white p-4 px-10 rounded-md shadow-md hover:scale-95 hover:bg-gray-700'
          onClick={handleUpdateOrderStatus}
        >
          Update Order Status
        </button>
      </div>
    </div>
  );
};

export default SingleOrder;
