import React, { useState } from "react";
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
      <div className='md:hidden w-full flex items-center bg-black text-white gap-4'>
        <select className='bg-black w-full p-4 rounded-md'>
          {allCategory.map((item, i) => (
            <option className='capitalize text-sm' key={i}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
};

export default Header;
