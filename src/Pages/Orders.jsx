import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Currency from "../Components/Configs/currency";
import { getUsersOrders } from "../Utils/functions";

const Orders = () => {
  const {
    isLoggedIn,
    user: { uid },
  } = useSelector((state) => state.auth);
  const [usersOrders, setUsersOrders] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const limit = 20;
      const res = await getUsersOrders(uid, limit);
      setUsersOrders(res.data);
      // dispatch(setOrders(res.data));//
      // setLastVisibleItem(res.lastVisibleItem);
    };
    fetch();
  }, [uid]);

  console.log({ usersOrders });

  return (
    <div className='max-w-5xl mx-auto p-4'>
      <h2 className='text-2xl font-bold border-b-2 py-3'>My Orders</h2>
      <p>{usersOrders?.length < 1 && "You have no orders at the moment"}</p>
      <div>
        {usersOrders?.map((order, i) => {
          const {
            createdAt,
            cartItems,
            productId,
            orderStatus,
            status,
            trxref,
          } = order;
          return (
            <div key={i} className='my-10 border-b-2 p-4 text-sm font-medium'>
              <h2>Placed on {createdAt}</h2>
              <p>Maybe eligible for return within 7 days after delivery</p>
              <h2>Total Orders: {cartItems?.length}</h2>
              <h2>Order ID: {productId}</h2>
              <h2>Payment Status: {status}</h2>
              <h2>Transaction ID: {trxref}</h2>
              <div className='flex gap-4 justify-between items-center my-4'>
                <h2>Delivery Status</h2>
                <h2
                  className={`${
                    orderStatus === "pending"
                      ? "bg-gray-600"
                      : orderStatus === "delivered"
                      ? "bg-green-600"
                      : "bg-red-600"
                  } rounded-2xl p-2 px-6 text-white capitalize text-xs`}
                >
                  {orderStatus}
                </h2>
              </div>
              <div>
                <h2 className='text-base uppercase font-bold'>
                  Items in your order
                </h2>
                <div className='ml-8'>
                  {cartItems?.map(({ imageURLS, title, qty, itemTotal }, i) => {
                    return (
                      <div className='flex gap-4 items-center my-4' key={i}>
                        <img
                          className='w-20 h-20 object-cover'
                          src={imageURLS[0]?.url || ""}
                          alt='image'
                        />
                        <div className='text-xs'>
                          <h2>{title}</h2>
                          <h2>Qty: {qty}</h2>
                          <Currency className='font-bold' amount={itemTotal} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
