import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../images/logo.png";
import { FaOpencart, FaHome } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useState } from "react";
import { useSelector } from "react-redux";
const List = ({ navItems, isSideBarOpen }) => {
  const newItems = [{ item: "cart", url: "/cart" }, ...navItems];
  const [selectedIndex, setSelectedIndex] = useState(1);
  const { cartItems } = useSelector((state) => state.product);
  return (
    <nav
      className={`fixed bottom-0 left-0 flex items-center md:hidden gap-4 p-8 py-0 shadow-xl bg-white w-full z-50 border-t-2`}
    >
      <div className='flex items-center justify-between w-full'>
        {newItems.slice(0, 3).map((item, index) => {
          return (
            <Link
              className={`${
                selectedIndex === index ? "text-black" : "text-gray-400"
              } flex flex-col items-center my-5 w-fit uppercase font-medium hover:border-b-2 ransition`}
              key={index}
              to={item.url}
              onClick={() => setSelectedIndex(index)}
            >
              <i className='text-xl'>
                {index === 0 ? (
                  <div className='flex'>
                    <FaOpencart />
                    <h2 className='bg-black text-xs text-white p-3 rounded-full w-4 h-4 flex items-center justify-center relative bottom-3 right-2 font-bold'>
                      {cartItems?.length}
                    </h2>
                  </div>
                ) : index === 1 ? (
                  <FaHome />
                ) : (
                  <HiOutlineShoppingBag />
                )}
              </i>
              <h2 className='text-xs'>{item.item}</h2>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default List;
