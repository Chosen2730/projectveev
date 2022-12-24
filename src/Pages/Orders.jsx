import React from "react";

const Orders = () => {
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
