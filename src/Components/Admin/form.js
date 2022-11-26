import React, { useState } from "react";
import upload from "../../images/upload.png";
import Input from "../Form/input";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setProductModalShown } from "../../Redux/features/adminSlice";
import { addProduct } from "../../Utils/functions";
const Form = () => {
  const category = ["Men", "Women", "Kids", "Fabrics", "Custom"];
  const statusList = ["In Stock", "Featured", "On Sale", "Out of Stock"];
  const { isProductModalShown } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  // const { isLoggedIn, user: { name, img, admin } } = useSelector((state) => state.auth);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [price, setPrice] = useState()
  const [percentageDiscount, setPercentageDiscount] = useState(0)
  const [catg, setCatg] = useState('')
  const [status, setStatus] = useState('In Stock')
  const [image, setImage] = useState()
  const [featured, setFeatured] = useState(true);
  const [trending, setTrending] = useState(true);


  const uploadProduct = async (e) => {
    e.preventDefault()
    const data = { title, desc, price, percentageDiscount, category: catg, status, featured, trending }
    const addProductRef = await addProduct(isLoggedIn, data, image)
    console.log(addProductRef);
  }

  return (
    <div
      className={`${isProductModalShown ? "category" : "category hider"
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
          <Input type='text' input id='title' title='Name of Product' setItem={setTitle} value={title} />
          <Input textarea id='desc' title='Product Description' setItem={setDesc} value={desc} />
          <Input type='number' input id='price' title='Price' setItem={setPrice} value={price} />
          <Input type='number' input id='percentageDiscount' title='Percentage Discount' setItem={setPercentageDiscount} value={percentageDiscount} />
          <Input
            dropdown
            data={category}
            id='category'
            title='Select Category'
            setItem={setCatg} 
            value={catg}
          />
          <Input dropdown data={statusList} id='status' title='Product Status' setItem={setStatus} value={status} />
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
                  onChange={(e) => { console.log(e.target.files[0]); setImage(e.target.files[0]) }}
                />
                " Browse to upload your file"
                <h4>Image uploaded</h4>
              </label>
            </div>
            <div className="preview_img grid place-items-center my-5">
              {image && <img src={URL.createObjectURL(image)} alt="" width={100} />}
            </div>
          </div>
          <button
            className='bg-black text-white rounded-md text-sm md:text-base py-4 px-8 font-normal tracking-wider w-full my-2'
            onClick={uploadProduct}
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
