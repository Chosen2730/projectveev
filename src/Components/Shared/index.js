import React from "react";
import Footer from "./footer";
import Nav from "./nav";

const MainLayout = ({ children }) => {
  return (
    <>
      <Nav />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default MainLayout;
