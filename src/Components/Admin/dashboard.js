import React from "react";
import { FaUsers } from "react-icons/fa";
import {
  MdOutlineCancel,
  MdOutlineDownloadDone,
  MdPendingActions,
} from "react-icons/md";
import { RiLuggageCartFill } from "react-icons/ri";
import { SlNote } from "react-icons/sl";

const Dashboard = () => {
  return (
    <div className='p-5'>
      <h2 className='font-bold text-2xl'>Admin Dashboard</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 my-10'>
        <div className='rounded-xl shadow-xl bg-black text-white p-8'>
          <div className='flex justify-between gap-2 items-center'>
            <p className='text-lg font-medium my-2'>Total No of Orders</p>
            <i className='bg-white text-black text-2xl w-8 rounded-md h-8 flex items-center justify-center'>
              <SlNote />
            </i>
          </div>
          <p className='text-4xl font-medium'>0</p>
        </div>
        <div className='rounded-xl shadow-xl bg-blue-800 text-white p-8'>
          <div className='flex justify-between gap-2 items-center'>
            <p className='text-lg font-medium my-2'>Total No of Users</p>
            <i className='bg-white text-blue-800 text-2xl w-8 rounded-md h-8 flex items-center justify-center'>
              <FaUsers />
            </i>
          </div>
          <p className='text-4xl font-medium'>{0}</p>
        </div>
        <div className='rounded-xl shadow-xl bg-green-800 text-white p-8'>
          <div className='flex justify-between gap-2 items-center'>
            <p className='text-lg font-medium my-2'>
              Total No of Products in Store
            </p>
            <i className='bg-white text-green-800 text-2xl w-8 rounded-md h-8 flex items-center justify-center'>
              <RiLuggageCartFill />
            </i>
          </div>
          <p className='text-4xl font-medium'>{0}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
