import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../images/logo.png";
import { FaOpencart } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";

const Grid = ({ selectedIndex, setSelectedIndex, navItems }) => {
  return (
    <nav className='hidden md:flex gap-4 items-center justify-between p-8 shadow-xl shadow-gray-200 bg-white my-5'>
      <Link>
        <img src={logo} alt='logo' className='w-52' />
      </Link>
      <div className='flex gap-4 items-center justify-center'>
        {navItems.map((item, index) => {
          return (
            <Link
              className={`${
                selectedIndex === index ? "border-b-2 border-b-black" : ""
              } uppercase font-medium hover:border-b-2 md:hover:border-b-gray-400 hover:text-gray-400 transition text-sm`}
              key={index}
              to={item.url}
              onClick={() => setSelectedIndex(index)}
            >
              {item.item}
            </Link>
          );
        })}
      </div>
      <div className='flex gap-4 items-center justify-center text-xl'>
        <i>
          <FaOpencart />
        </i>
        <i>
          <BsSearch />
        </i>
      </div>
    </nav>
  );
};

export default Grid;
