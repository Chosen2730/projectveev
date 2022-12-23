import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../images/logo.png";
import { FaOpencart } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";

const Grid = ({ selectedIndex, setSelectedIndex, navItems }) => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.product);
  return (
    <nav className='hidden md:flex gap-4 items-center justify-between p-8 shadow-xl shadow-gray-100 bg-white my-5'>
      <Link>
        <img src={logo} alt='logo' className='w-52' />
      </Link>
      <div className='flex gap-12 items-center justify-center'>
        {navItems.map((item, index) => {
          return (
            <Link
              className={`${
                selectedIndex === index ? "border-b-2 border-b-black" : ""
              } uppercase font-medium hover:border-b-2 md:hover:border-b-gray-400 hover:text-gray-400 transition text-xs`}
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
        <Link
          to='/cart'
          onClick={(e) => {
            e.preventDefault();
            navigate("/cart");
          }}
          className='flex'
        >
          <FaOpencart />
          <h2 className='bg-black text-xs text-white p-3 rounded-full w-4 h-4 flex items-center justify-center relative bottom-3 right-2 font-bold'>
            {cartItems?.length}
          </h2>
        </Link>

        <i>
          <BsSearch />
        </i>
      </div>
    </nav>
  );
};

export default Grid;
