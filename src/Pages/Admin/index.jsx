import React from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../Components/Admin/Layout/header";

const AdminIndex = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
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
