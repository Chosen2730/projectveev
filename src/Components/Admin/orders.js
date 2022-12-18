import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../Utils/functions";
import { RiLuggageCartFill } from "react-icons/ri";
import {
  MdPendingActions,
  MdOutlineDownloadDone,
  MdOutlineCancel,
} from "react-icons/md";
import Currency from "../Configs/currency";
import { setOrders } from "../../Redux/features/adminSlice";
import { Navigate, useNavigate } from "react-router-dom";

const Orders = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [allOrders, setAllOrders] = useState([]);
  const [limit, setLimit] = useState(20);
  const [lastVisibleItem, setLastVisibleItem] = useState();

  useEffect(() => {
    const fetch = async () => {
      const res = await getOrders(limit);
      setAllOrders(res.data);
      dispatch(setOrders(res.data));
      setLastVisibleItem(res.lastVisibleItem);
    };
    fetch();
  }, [limit]);

  console.log({ allOrders });
  const orderHeader = [
    "Name",
    "Date",
    "No of Items",
    "Payment Status",
    "Price",
    "Order Status",
    "Action",
  ];
  return (
    <div className='p-4'>
      <h2 className='font-bold text-2xl'>Orders</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 my-10'>
        <div className='rounded-xl shadow-xl bg-black text-white p-8'>
          <div className='flex justify-between gap-2 items-center'>
            <p className='text-lg font-medium my-2'>All Orders</p>
            <i className='bg-white text-black text-2xl w-8 rounded-md h-8 flex items-center justify-center'>
              <RiLuggageCartFill />
            </i>
          </div>
          <p className='text-4xl font-medium'>{allOrders?.length}</p>
        </div>
        <div className='rounded-xl shadow-xl bg-blue-800 text-white p-8'>
          <div className='flex justify-between gap-2 items-center'>
            <p className='text-lg font-medium my-2'>Pending Orders</p>
            <i className='bg-white text-blue-800 text-2xl w-8 rounded-md h-8 flex items-center justify-center'>
              <MdPendingActions />
            </i>
          </div>
          <p className='text-4xl font-medium'>{0}</p>
        </div>
        <div className='rounded-xl shadow-xl bg-green-800 text-white p-8'>
          <div className='flex justify-between gap-2 items-center'>
            <p className='text-lg font-medium my-2'>Delivered Orders</p>
            <i className='bg-white text-green-800 text-2xl w-8 rounded-md h-8 flex items-center justify-center'>
              <MdOutlineDownloadDone />
            </i>
          </div>
          <p className='text-4xl font-medium'>{0}</p>
        </div>
        <div className='rounded-xl shadow-xl bg-red-800 text-white p-8'>
          <div className='flex justify-between gap-2 items-center'>
            <p className='text-lg font-medium my-2'>Cancelled Orders</p>
            <i className='bg-white text-red-800 text-2xl w-8 rounded-md h-8 flex items-center justify-center'>
              <MdOutlineCancel />
            </i>
          </div>
          <p className='text-4xl font-medium'>{0}</p>
        </div>
      </div>
      <div className='overflow-x-scroll '>
        <div className='grid min-w-[1000px]'>
          <div className='grid grid-cols-7 gap-2 my-5 bg-gray-100 rounded-md p-5 '>
            {orderHeader?.map((item, index) => {
              return (
                <h2 className='capitalize font-bold text-base' key={index}>
                  {item}
                </h2>
              );
            })}
          </div>
          <div className=''>
            {allOrders?.map(({ cartItems, message, name, orderId }, index) => {
              const prices = cartItems?.map((cartItem) => cartItem.itemTotal);
              const totalPrice = prices?.reduce((sum, price) => sum + price);
              return (
                <div
                  key={index}
                  className='grid grid-cols-7 gap-2 my-5 border-b rounded-md p-5'
                >
                  <h2>{name}</h2>
                  <h2>02/11/22</h2>
                  <h2>{cartItems?.length}</h2>
                  <h2>{message}</h2>
                  <Currency amount={totalPrice ? totalPrice : 0} />
                  <h2>Pending</h2>
                  <div className='flex gap-4 text-xl'>
                    {/* <AiOutlineDelete className='bg text-red-500 cursor-pointer rounded-md' /> */}
                    <h2 className='text-sm italic text-red-700 cursor-pointer'>
                      delete
                    </h2>
                    <h2
                      className='text-sm italic text-blue-700 cursor-pointer'
                      onClick={() => navigate(`/admin/order/${orderId}`)}
                    >
                      details
                    </h2>
                    {/* <AiOutlineEye className='bg-g text-gray-500 cursor-pointer rounded-md' /> */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
