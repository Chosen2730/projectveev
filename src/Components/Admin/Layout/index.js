import React from "react";
import Header from "./header";
import SideBar from "./sideBar";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className='mx-auto max-w-6xl my-5 p-4'>{children}</main>
    </div>
  );
};

export default Layout;
