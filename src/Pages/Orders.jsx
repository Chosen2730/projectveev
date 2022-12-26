import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getUsersOrders } from "../Utils/functions";

const Orders = () => {
  const { isLoggedIn, user: { uid } } = useSelector((state) => state.auth);
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

  console.log({usersOrders});


  const orderHeader = ["Items", "Date", "Price", "Quantity", "Delivery Status"];
  return (
    <div>
      <div className='overflow-x-scroll'>
        <div className='grid'>
          <div className='grid grid-cols-5 my-5 bg-gray-100 rounded-md p-5 '>
            {orderHeader?.map((item, index) => {
              return (
                <h2 className='capitalize font-bold text-base' key={index}>
                  {item}
                </h2>
              );
            })}
          </div>
          <div className=''></div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
