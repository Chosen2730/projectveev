import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../Components/Admin/Layout/header";

const AdminIndex = () => {
  return (
    <div>
      <Header />
      <div className='max-w-6xl mx-auto my-10'>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminIndex;
