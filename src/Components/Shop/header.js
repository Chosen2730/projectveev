import React, { useState } from "react";
import { MdFilterList } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setActiveCategory } from "../../Redux/features/productSlice";
import { allCategory } from "../../Utils/category";

const Header = () => {
  const dispatch = useDispatch();
  const { activeCategory } = useSelector((state) => state.product);
  const setItems = (id) => {
    dispatch(setActiveCategory(id));
  };
  return (
    <section>
      <div className='bg-black text-white p-4 hidden md:flex items-center justify-center gap-8'>
        {allCategory.map((item, i) => (
          <h1
            key={i}
            className={`${
              activeCategory === i
                ? "font-bold border-white"
                : "border-b-transparent"
            } capitalize text-sm border-b-2 p-2 cursor-pointer transition`}
            onClick={() => setItems(i)}
          >
            {item}
          </h1>
        ))}
      </div>
      <div className='p-4 flex items-center md:hidden bg-black '>
        <MdFilterList className='text-3xl text-white' />
        <div className='w-full flex items-center bg-black text-white gap-4'>
          <select
            className='w-full bg-black  p-4 rounded-md'
            onChange={(e) => {
              const id = e.target.value;
              setItems(parseInt(id));
            }}
          >
            {allCategory.map((item, i) => (
              <option value={i} className='capitalize text-sm' key={i}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
};

export default Header;
