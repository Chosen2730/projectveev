import React from "react";

const Users = () => {
  const userHeader = ["Name", "Email", "Tel", "Status", "Actions"];
  return (
    <div>
      <h2 className='font-bold text-2xl'>Users</h2>
      <p className='text-lg font-medium my-2'>All Users</p>
      <div className='overflow-x-scroll'>
        <div className='grid'>
          <div className='grid grid-cols-5 my-5 bg-gray-100 rounded-md p-5 '>
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

export default Users;
