import React, { useState } from "react";
import ngn from "../../../images/flag.png";
import { RiMenu4Fill, RiUserAddLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import Grid from "./grid";
import List from "./list";
import { BsChevronDown, BsCreditCard } from "react-icons/bs";
import { AiOutlineUser, AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../../Redux/features/authSlice";
import { Link } from "react-router-dom";
import logo from "../../../images/logo.png";

const Nav = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isDropDown, setIsDropDown] = useState(false);
  const navItems = [
    { item: "Home", url: "/" },
    { item: "Shop", url: "/shop" },
    { item: "About Us", url: "/about" },
    { item: "Events", url: "/events" },
  ];
  const dispatch = useDispatch();
  const {
    isLoggedIn,
    user: { name, img, admin },
  } = useSelector((state) => state.auth);
  const imageUrl =
    img ||
    "https://media.istockphoto.com/id/517998264/vector/male-user-icon.jpg?s=612x612&w=0&k=20&c=4RMhqIXcJMcFkRJPq6K8h7ozuUoZhPwKniEke6KYa_k=";

  return (
    <div className='p-4 relative'>
      <div className='flex items-center justify-between bg-white uppercase py-4'>
        <Link to='/'>
          <img src={logo} alt='logo' className='w-24 md:hidden' />
        </Link>
        <div className='shadow-md shadow-gray-100 w-fit rounded-md ml-auto p-4 absolute top-2 right-5 bg-white z-50'>
          <div
            className='font-medium flex gap-2 items-center text-xs cursor-pointer'
            onClick={() => setIsDropDown(!isDropDown)}
          >
            <img className='w-5 h-5' src={ngn} alt='' />
            <h1 className='text-xs'>|</h1>
            <h1 className='text-xs'>Nigeria</h1>
            <h1 className='text-xs'>NGN</h1>
            <h1 className='text-xs'>|</h1>
            <img
              src={imageUrl}
              alt=''
              className='w-7 h-7 object-cover rounded-full border-2 shadow-md  bg-black'
            />
            <i className='cursor-pointer'>
              <BsChevronDown />
            </i>
          </div>
          <div className={`${isDropDown ? "block" : "hidden"} transition`}>
            {isLoggedIn && (
              <div>
                <div className='flex text-xs gap-2 py-2 border-t-2 border-t-gray-100 items-center my-4 cursor-pointer'>
                  <i className='text-lg'>
                    <AiOutlineUser />
                  </i>
                  <h1 className='capitalize'>{name}</h1>
                </div>
                {admin && (
                  <Link to='/admin' onClick={() => setIsDropDown(false)}>
                    <div className='flex text-xs gap-2 py-2 border-t-2 border-t-gray-100 items-center my-4 cursor-pointer'>
                      <i className='text-lg'>
                        <RiUserAddLine />
                      </i>
                      <h1 className='capitalize'>Admin Area</h1>
                    </div>
                  </Link>
                )}
              </div>
            )}
            {isLoggedIn ? (
              <div>
                <Link onClick={() => setIsDropDown(false)} to='/orders'>
                  <div className='flex text-xs gap-2 py-2 border-t-2 border-t-gray-100 items-center my-4 text-black cursor-pointer'>
                    <i className='text-lg'>
                      <BsCreditCard />
                    </i>
                    <h1 className='capitalize'>My Orders</h1>
                  </div>
                </Link>
                <div className='flex text-xs gap-2 py-2 border-t-2 border-t-gray-100 items-center my-4 text-red-500 cursor-pointer'>
                  <i className='text-lg'>
                    <AiOutlineLogout />
                  </i>
                  <h1 className='capitalize'>Logout</h1>
                </div>
              </div>
            ) : (
              <div
                className='flex text-xs gap-2 py-2 border-t-2 border-t-gray-100 items-center my-4 cursor-pointer'
                onClick={() => {
                  setIsDropDown(false);
                  dispatch(login());
                }}
              >
                <i className='text-lg'>
                  <AiOutlineLogin />
                </i>
                <h1 className='capitalize'>Login</h1>
              </div>
            )}
          </div>
        </div>
      </div>
      <Grid
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        navItems={navItems}
      />
      <List
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        navItems={navItems}
        isSideBarOpen={isSideBarOpen}
      />
    </div>
  );
};

export default Nav;
