import React from "react";
import { useEffect } from "react";
import Shared from "../Components/Shared";
import Header from "../Components/Shop/header";
import Products from "../Components/Shop/products";

const Shop = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  return (
    <>
      <Header />
      <Products />
    </>
  );
};

export default Shop;
