import React, { useState } from "react";
import { MdFilterList } from "react-icons/md";
import { allCategory } from "../../Utils/category";

const Header = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <section>
      <div className='bg-black text-white p-4 hidden md:flex items-center justify-center gap-8'>
        {allCategory.map((item, i) => (
          <h1
            key={i}
            className={`${
              selectedIndex === i
                ? "font-bold border-white"
                : "border-b-transparent"
            } capitalize text-sm border-b-2 p-2 cursor-pointer transition`}
            onClick={() => setSelectedIndex(i)}
          >
            {item}
          </h1>
        ))}
      </div>
      <div className='p-4 flex items-center md:hidden bg-black '>
        <MdFilterList className='text-3xl text-white' />
        <div className='w-full flex items-center bg-black text-white gap-4'>
          <select className='w-full bg-black  p-4 rounded-md'>
            {allCategory.map((item, i) => (
              <option className='capitalize text-sm' key={i}>
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
