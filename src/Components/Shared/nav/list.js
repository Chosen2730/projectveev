import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../images/logo.png";
import { FaOpencart } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";

const List = ({ selectedIndex, setSelectedIndex, navItems, isSideBarOpen }) => {
  return (
    <nav
      className={`${
        isSideBarOpen ? "translate-x-0" : "translate-x-full"
      } transition fixed flex flex-col items-center top-0 md:hidden gap-4 p-8 shadow-md bg-white w-[70%] min-h-screen right-0`}
    >
      <Link>
        <img src={logo} alt='logo' className='w-56' />
      </Link>
      <div className='my-10 flex flex-col items-center'>
        {navItems.map((item, index) => {
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
        <i>
          <BsSearch />
        </i>
      </div>
    </nav>
  );
};

export default List;
