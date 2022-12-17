import React from "react";

const Orders = () => {
  const userHeader = [
    "Name",
    "Date",
    "No of Items",
    "Payment Status",
    "Price",
    "Status",
    "Action",
  ];
  return (
    <div>
      <h2 className='font-bold text-2xl'>Orders</h2>
      <p className='text-lg font-medium my-2'>All Orders</p>
      <div className='overflow-x-scroll'>
        <div className='grid'>
          <div className='grid gridLay2 gap-2 my-5 bg-gray-100 rounded-md p-5 '>
            {userHeader?.map((item, index) => {
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
