import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../images/logo.png";
import { FaOpencart } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";

const List = ({ selectedIndex, setSelectedIndex, navItems, isSideBarOpen }) => {
  return (
    <nav
      className={`fixed bottom-0 flex items-center md:hidden gap-4 p-8 shadow-md bg-white w-full z-50`}
    >
      <div className='flex items-center justify-between'>
        {navItems.slice(0, 2).map((item, index) => {
          return (
            <Link
              className={`${
                selectedIndex === index ? "border-b-2 border-b-black" : ""
              } block my-5 w-fit uppercase font-medium hover:border-b-2 md:hover:border-b-gray-400 hover:text-gray-400 transition text-lg`}
              key={index}
              to={item.url}
              onClick={() => setSelectedIndex(index)}
            >
              {item.item}
            </Link>
          );
        })}
      </div>
      <div className='flex gap-4 items-center text-xl'>
        <i>
          <FaOpencart />
        </i>
        {/* <i>
          <BsSearch />
        </i> */}
      </div>
    </nav>
  );
};

export default List;
