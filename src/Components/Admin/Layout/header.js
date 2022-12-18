import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdSpaceDashboard } from "react-icons/md";
import { FaUsers, FaSellsy, FaLuggageCart } from "react-icons/fa";
import { RiGitPullRequestFill } from "react-icons/ri";
import { setSelectedHeaderIndex } from "../../../Redux/features/adminSlice";
import { BiShoppingBag } from "react-icons/bi";
import { SlNote } from "react-icons/sl";

const Header = () => {
  const { selectedHeaderIndex } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const headerContents = ["Dashboard", "users", "orders", "products"];
  return (
    <div className='p-8 bg-black'>
      <div className='max-w-xl flex items-center justify-between gap-8 mx-auto'>
        {headerContents.map((item, id) => {
          return (
            <div
              key={id}
              className={`${
                selectedHeaderIndex === id
                  ? "text-gray-50 font-bold"
                  : "text-gray-400"
              } capitalize flex flex-col items-center justify-center gap-2 transition hover:text-gray-300 cursor-pointer`}
              onClick={() => dispatch(setSelectedHeaderIndex(id))}
            >
              <i className='text-xl md:text-3xl'>
                {id === 0 ? (
                  <MdSpaceDashboard />
                ) : id === 1 ? (
                  <FaUsers />
                ) : id === 2 ? (
                  <SlNote />
                ) : id === 3 ? (
                  <BiShoppingBag />
                ) : (
                  <BiShoppingBag />
                )}
              </i>
              <h2 className='text-xs sm:text-sm select-none'>{item}</h2>{" "}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
