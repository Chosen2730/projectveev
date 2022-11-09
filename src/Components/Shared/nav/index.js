import React, { useState } from "react";
import ngn from "../../../images/flag.png";
import { RiMenu4Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import Grid from "./grid";
import List from "./list";

const Nav = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const navItems = [
    { item: "Home", url: "/" },
    { item: "Shop", url: "/shop" },
    { item: "About Us", url: "/about" },
    { item: "Events", url: "/events" },
  ];
  return (
    <div className='p-4 md:px-0'>
      <div className='flex items-center justify-between bg-white uppercase'>
        <i
          className='bg-black rounded-md md:hidden text-white p-3 text-xl shadow-md items-center justify-center text-center'
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
        >
          {isSideBarOpen ? <IoMdClose /> : <RiMenu4Fill />}
        </i>
        <div className='ml-auto font-medium flex gap-2 items-center text-xs p-4 shadow-md w-fit rounded-md'>
          <img className='w-5 h-5' src={ngn} alt='' />
          <h1>|</h1>
          <h1>Nigeria</h1>
          <h1>NGN</h1>
          <h1>|</h1>
          <img
            src='https://media.istockphoto.com/id/517998264/vector/male-user-icon.jpg?s=612x612&w=0&k=20&c=4RMhqIXcJMcFkRJPq6K8h7ozuUoZhPwKniEke6KYa_k='
            alt='profile-img'
            className='w-7 h-7 object-cover rounded-full border-2 border-black shadow-md bg-black'
          />
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
