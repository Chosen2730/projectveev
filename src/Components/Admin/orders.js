import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrder,
  getAllCustomOrders,
  getOrders,
} from "../../Utils/functions";
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
  const [customOrders, setCustomOrders] = useState([]);
  const [limit, setLimit] = useState(20);
  const [lastVisibleItem, setLastVisibleItem] = useState();
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const res = await getOrders(limit);
      setAllOrders(res.data);
    };
    fetch();
  }, [limit]);

  useEffect(() => {
    const unsubscribe = getAllCustomOrders(
      (querySnapshot) => {
        const customOrder = querySnapshot.docs.map((docSnapshot) => ({
          productId: docSnapshot.id,
          ...docSnapshot.data(),
        }));
        setCustomOrders(customOrder);
      },
      (error) => console.log(error)
    );
    return unsubscribe;
  }, []);

  const cancelled = allOrders.filter(
    (order) => order.orderStatus === "cancelled"
  );
  const delivered = allOrders.filter(
    (order) => order.orderStatus === "delivered"
  );
  const pending = allOrders.filter((order) => order.orderStatus === "pending");
  const orderHeader = [
    "Name",
    "Date",
    "No of Items",
    "Payment Status",
    "Price",
    "Order Status",
    "Action",
  ];
  const toggleButtons = ["All Orders", "Custom Orders"];
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
        <div className='rounded-xl shadow-xl bg-black text-white p-8'>
          <div className='flex justify-between gap-2 items-center'>
            <p className='text-lg font-medium my-2'>Custom Orders</p>
            <i className='bg-white text-black text-2xl w-8 rounded-md h-8 flex items-center justify-center'>
              <RiLuggageCartFill />
            </i>
          </div>
          <p className='text-4xl font-medium'>{customOrders?.length}</p>
        </div>
        <div className='rounded-xl shadow-xl bg-blue-800 text-white p-8'>
          <div className='flex justify-between gap-2 items-center'>
            <p className='text-lg font-medium my-2'>Pending Orders</p>
            <i className='bg-white text-blue-800 text-2xl w-8 rounded-md h-8 flex items-center justify-center'>
              <MdPendingActions />
            </i>
          </div>
          <p className='text-4xl font-medium'>{pending?.length}</p>
        </div>
        <div className='rounded-xl shadow-xl bg-green-800 text-white p-8'>
          <div className='flex justify-between gap-2 items-center'>
            <p className='text-lg font-medium my-2'>Delivered Orders</p>
            <i className='bg-white text-green-800 text-2xl w-8 rounded-md h-8 flex items-center justify-center'>
              <MdOutlineDownloadDone />
            </i>
          </div>
          <p className='text-4xl font-medium'>{delivered?.length}</p>
        </div>
        <div className='rounded-xl shadow-xl bg-red-800 text-white p-8'>
          <div className='flex justify-between gap-2 items-center'>
            <p className='text-lg font-medium my-2'>Cancelled Orders</p>
            <i className='bg-white text-red-800 text-2xl w-8 rounded-md h-8 flex items-center justify-center'>
              <MdOutlineCancel />
            </i>
          </div>
          <p className='text-4xl font-medium'>{cancelled?.length}</p>
        </div>
      </div>
      <div className='flex'>
        {toggleButtons.map((btn, i) => (
          <button
            key={i}
            className={`${
              page === i ? "bg-black" : "bg-gray-400"
            } text-white p-4 px-6 text-sm`}
            onClick={() => setPage(i)}
          >
            {btn}
          </button>
        ))}
      </div>
      {page === 0 ? (
        <div className='overflow-x-scroll '>
          <div className='grid min-w-[1000px]'>
            <div className='grid grid-cols-7 gap-2 my-5 bg-gray-200 rounded-md p-5 '>
              {orderHeader?.map((item, index) => {
                return (
                  <h2 className='capitalize font-medium text-sm' key={index}>
                    {item}
                  </h2>
                );
              })}
            </div>
            {!allOrders.length > 0 && (
              <div className='uppercase font-bold'>No data yet!</div>
            )}
            <div className=''>
              {allOrders?.map(
                ({ cartItems, message, name, orderId, orderStatus }, index) => {
                  const prices = cartItems?.map(
                    (cartItem) => cartItem.itemTotal
                  );
                  var totalPrice;
                  if (prices && prices.length > 0) {
                    totalPrice = prices?.reduce((sum, price) => sum + price);
                  }
                  return (
                    <div
                      key={index}
                      className='grid grid-cols-7 gap-2 my-5 border-b rounded-md p-5 text-sm'
                    >
                      <h2>{name}</h2>
                      <h2>02/11/22</h2>
                      <h2>{cartItems?.length}</h2>
                      <h2>{message}</h2>
                      <Currency amount={totalPrice ? totalPrice : 0} />
                      <h2
                        className={`${
                          orderStatus === "pending"
                            ? "text-gray-600"
                            : orderStatus === "delivered"
                            ? "text-green-400"
                            : "text-red-600"
                        } capitalize`}
                      >
                        {orderStatus}
                      </h2>
                      <div className='flex gap-4 text-xl'>
                        {/* <AiOutlineDelete className='bg text-red-500 cursor-pointer rounded-md' /> */}
                        <h2
                          className='text-sm italic text-red-700 cursor-pointer'
                          onClick={() => {
                            deleteOrder(orderId);
                          }}
                        >
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
                }
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          {customOrders?.map(
            (
              {
                productId,
                name,
                email,
                tel,
                _createdAt,
                social,
                ankle,
                bust,
                cuff,
                dress_length,
                full_hip,
                knee,
                lower_waist,
                quatity,
                message,
                round_sleeve,
                shoulder,
                skirt_trouser_length,
                sleeve_length,
                thigh,
                tommy,
                top_length,
                upper_waist,
                waist,
                imageURLS,
              },
              i
            ) => {
              return (
                <div key={productId} className='my-4 p-3 border rounded-md'>
                  <h2 className='font-medium text-xs my-2'>
                    {i + 1}. Order ID: {productId}
                  </h2>
                  <h2 className='font-medium text-xs my-2'>
                    Quatity: {quatity}
                  </h2>
                  <h2 className='font-medium text-xs my-2'>
                    Message: {message}
                  </h2>
                  <div className='text-xs p-4 rounded-md border flex flex-col gap-2'>
                    <h2>Date: {_createdAt}</h2>
                    <h2>Name: {name}</h2>
                    <h2>Email: {email}</h2>
                    <h2>Tel No: {tel}</h2>
                    <h2>Social: {social}</h2>
                  </div>
                  <div className='text-xs p-4 rounded-md border my-4 flex-col gap-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4'>
                    <h2>Ankle: {ankle}</h2>
                    <h2>Bust: {bust}</h2>
                    <h2>Cuff: {cuff}</h2>
                    <h2>Dress Length: {dress_length}</h2>
                    <h2>Full Hip: {full_hip}</h2>
                    <h2>Knee: {knee}</h2>
                    <h2>Lower Waist: {lower_waist}</h2>
                    <h2>Round Sleeve: {round_sleeve}</h2>
                    <h2>Shoulder: {shoulder}</h2>
                    <h2>Skirt/Trouser Length: {skirt_trouser_length}</h2>
                    <h2>Sleeve Slength Length: {sleeve_length}</h2>
                    <h2>Thigh: {thigh}</h2>
                    <h2>Tommy: {tommy}</h2>
                    <h2>Top Length: {top_length}</h2>
                    <h2>Upper Waist: {upper_waist}</h2>
                    <h2>Waist: {waist}</h2>
                  </div>
                  <div className='grid grid-cols-3 gap-2'>
                    <h2 className='font-medium text-sm'>Styles</h2>
                    {imageURLS?.slice(0, 3).map(({ url }, i) => {
                      return (
                        <img
                          className='w-full h-52 rounded-md object-contain'
                          key={i}
                          src={url}
                          alt='image'
                        />
                      );
                    })}
                  </div>
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;
