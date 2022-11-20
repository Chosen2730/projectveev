import React from "react";
import upload from "../../images/upload.png";
import Input from "../Form/input";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setProductModalShown } from "../../Redux/features/adminSlice";
const Form = () => {
  const category = ["Men", "Women", "Kids", "Fabrics", "Custom"];
  const status = ["In Stock", "Featured", "On Sale", "Out of Stock"];
  const { isProductModalShown } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  return (
    <div
      className={`${
        isProductModalShown ? "category" : "category hider"
      } overflow`}
    >
      <div className='bg-white shadow-md rounded-md p-4 overflow'>
        <IoClose
          className='bg-black text-white text-4xl p-2 ml-auto rounded-md'
          onClick={() => dispatch(setProductModalShown())}
        />
        <h1 className='text-center text-xl sm:text-2xl font-semibold my-3'>
          Upload A Product
        </h1>
        <form action='' className='sm:w-4/6 mx-auto'>
          <Input type='text' input id='title' title='Name of Product' />
          <Input textarea id='desc' title='Product Description' />
          <Input type='number' input id='price' title='Price' />
          <Input type='number' input id='oldPrice' title='Old Price' />
          <Input
            dropdown
            data={category}
            id='category'
            title='Select Category'
          />
          <Input dropdown data={status} id='status' title='Product Status' />
          <div className='text-center bg-gray-100 my-2 p-4'>
            <h2 className='font-semibold text-sm'>Upload Image</h2>
            <p className='text-sm my-2'>
              Upload the picture of the product. Accepted format : .jpg, .png,
              .jpeg
            </p>
            <div className='bg-gray-300 m-2 p-4 rounded-md'>
              <label htmlFor='image' className='cursor-pointer text-sm'>
                <img src={upload} className='mx-auto my-3 w-10' alt='' />
                <input
                  type='file'
                  placeholder='Browse to upload your file'
                  className='hidden'
                  id='image'
                  accept='image/*'
                  value={""}
                  onChange={(e) => console.log(e.target.files[0])}
                />
                " Browse to upload your file"
                <h4>Image uploaded</h4>
              </label>
            </div>
          </div>
          <button
            className='bg-black text-white rounded-md text-sm md:text-base py-4 px-8 font-normal tracking-wider w-full my-2'
            // onClick={addCat}
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
