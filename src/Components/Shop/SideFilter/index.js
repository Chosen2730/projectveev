import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import {
  allCategory,
  color,
  prices,
  sizes,
  status,
} from "../../../Utils/category";
import Wrapper from "./wrapper";
import { MdFilterList } from "react-icons/md";

const SideFilter = () => {
  const [isDropDown, setIsDropDown] = useState(false);
  const [sizeDropDown, setSizeDropDown] = useState(false);
  const [colorDropDown, setColorDropDown] = useState(false);
  const [priceDropDown, setPriceDropDown] = useState(false);
  const [statusDropDown, setStatusDropDown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(null);
  const [selectedColorIndex, setSelectedColorIndex] = useState(null);
  const [selectedPriceIndex, setSelectedPriceIndex] = useState(null);
  const [selectedStatusIndex, setSelectedStatusIndex] = useState(null);
  return (
    <div className='w-[25%] hidden lg:hidden'>
      <div className='flex gap-2 items-center'>
        <MdFilterList className='text-2xl' />
        <h1 className='font-bold'>Filter by:</h1>
      </div>
      <Wrapper title='Categories' func={() => setIsDropDown(!isDropDown)}>
        <div className={`${isDropDown ? "block" : "hidden"}`}>
          {allCategory.map((item, i) => (
            <h1
              key={i}
              className={`${
                selectedIndex === i
                  ? "font-bold border-gray-300"
                  : "border-b-transparent"
              } capitalize text-xs border-b-[1px] py-2 cursor-pointer transition`}
              onClick={() => setSelectedIndex(i)}
            >
              {item}
            </h1>
          ))}
        </div>
      </Wrapper>

      <Wrapper title='Size' func={() => setSizeDropDown(!sizeDropDown)}>
        <div
          className={`${
            sizeDropDown ? "block" : "hidden"
          } grid grid-cols-3 xl:grid-cols-4 my-4`}
        >
          {sizes.map((item, i) => (
            <div
              key={i}
              className='flex flex-col items-center justify-center cursor-pointer'
              onClick={() => setSelectedSizeIndex(i)}
            >
              <div
                className={`${
                  selectedSizeIndex === i ? "bg-black" : "bg-gray-400"
                } w-8 h-8 rounded-full transition`}
              />
              <h1
                className={`${
                  selectedSizeIndex === i
                    ? "font-bold border-white"
                    : "border-b-transparent"
                } text-xs border-b-2 py-2 cursor-pointer transition uppercase`}
              >
                {item}
              </h1>
            </div>
          ))}
        </div>
      </Wrapper>

      <Wrapper title='Prices' func={() => setPriceDropDown(!priceDropDown)}>
        <div className={`${priceDropDown ? "block" : "hidden"}  my-4`}>
          {prices.map((item, i) => (
            <div
              key={i}
              className='flex items-center gap-4 cursor-pointer my-3'
              onClick={() => setSelectedPriceIndex(i)}
            >
              <div
                className={`${
                  selectedPriceIndex === i ? "bg-black" : "bg-gray-400"
                } w-8 h-7 rounded-md transition`}
              />
              <h1
                className={`${
                  selectedPriceIndex === i
                    ? "font-bold border-white"
                    : "border-b-transparent"
                } text-xs border-b-2 py-2 cursor-pointer transition uppercase`}
              >
                {item}
              </h1>
            </div>
          ))}
        </div>
      </Wrapper>

      <Wrapper title='Color' func={() => setColorDropDown(!colorDropDown)}>
        <div
          className={`${
            colorDropDown ? "block" : "hidden"
          } grid grid-cols-3 gap-4 my-4`}
        >
          {color.map((item, i) => (
            <div
              key={i}
              className='flex flex-col items-center justify-center cursor-pointer'
              onClick={() => setSelectedColorIndex(i)}
            >
              <div
                style={{ backgroundColor: item }}
                className={` w-8 h-8 rounded-full transition`}
              />
              <h1
                className={`${
                  selectedColorIndex === i
                    ? "font-bold border-white"
                    : "border-b-transparent"
                } text-xs border-b-2 py-2 cursor-pointer transition capitalize`}
              >
                {item}
              </h1>
            </div>
          ))}
        </div>
      </Wrapper>

      <Wrapper title='Status' func={() => setStatusDropDown(!statusDropDown)}>
        <div
          className={`${
            statusDropDown ? "block" : "hidden"
          } grid grid-cols-2 gap-4 my-4`}
        >
          {status.map((item, i) => (
            <div
              key={i}
              className='flex flex-col items-center justify-center cursor-pointer'
              onClick={() => setSelectedStatusIndex(i)}
            >
              <div
                className={`${
                  selectedStatusIndex === i ? "bg-black" : "bg-gray-400"
                } w-8 h-8 rounded-full transition`}
              />
              <h1
                className={`${
                  selectedStatusIndex === i
                    ? "font-bold border-white"
                    : "border-b-transparent"
                } text-xs border-b-2 py-2 cursor-pointer transition capitalize`}
              >
                {item}
              </h1>
            </div>
          ))}
        </div>
      </Wrapper>
    </div>
  );
};

export default SideFilter;
