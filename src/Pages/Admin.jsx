import React from "react";
import { useSelector } from "react-redux";
import Dashboard from "../Components/Admin/dashboard";
import Layout from "../Components/Admin/Layout";
import Orders from "../Components/Admin/orders";
import Products from "../Components/Admin/products";
import Users from "../Components/Admin/users";

const Admin = () => {
  const { selectedHeaderIndex } = useSelector((state) => state.admin);
  return (
    <div>
      <Layout>
        {selectedHeaderIndex === 0 ? (
          <Dashboard />
        ) : selectedHeaderIndex === 1 ? (
          <Users />
        ) : selectedHeaderIndex === 2 ? (
          <Orders />
        ) : (
          <Products />
        )}
      </Layout>
    </div>
  );
};

export default Admin;
