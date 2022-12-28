import React, { useEffect, useState } from "react";
import upload from "../../images/upload.png";
import Input from "../Form/input";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setProductModalShown } from "../../Redux/features/adminSlice";
import { addProduct } from "../../Utils/functions";
import { createProduct } from "../../Utils/createFunctions";
const Form = () => {
  const category = ["Select", "Men", "Women", "Kids", "Fabrics", "Custom"];
  const statusList = ["Select", "In Stock", "Out of Stock"];
  const discountValues = ["Set Discount", 10, 25, 50, 75, 100];
  const { isProductModalShown } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [image, setImage] = useState();
  const [discount, setDiscount] = useState(false);
  const [fabricInput, setFabricInput] = useState(false);
  const [currentItem, setCurrentItem] = useState({});

  const handleInputChange = (e) => {
    setCurrentItem({ ...currentItem, [e.target.name]: e.target.value, image });
    console.log(currentItem);
  };

  useEffect(() => {
    if (currentItem.category === "Fabrics") {
      setFabricInput(true);
    } else {
      setFabricInput(false);
    }
  }, [currentItem]);

  const uploadProduct = async (e) => {
    e.preventDefault();
    const {
      title,
      desc,
      price,
      discountValue,
      category,
      status,
      featured,
      trending,
    } = currentItem;
    const data = {
      title,
      desc,
      price,
      discountValue,
      category,
      status,
      featured,
      trending,
      _createdAt: new Date().getTime(),
      _updatedAt: new Date().getTime(),
    };
    const createProductRef = await createProduct(isLoggedIn, data, image);
    console.log(createProductRef);
  };

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
        <Input
          type='text'
          input
          id='title'
          title='Name of Product'
          setItem={handleInputChange}
          value={currentItem.title || ""}
        />
        <Input
          textarea
          id='desc'
          title='Product Description'
          setItem={handleInputChange}
          value={currentItem.desc || ""}
        />
        <Input
          dropdown
          data={category}
          id='category'
          title='Select Category'
          setItem={handleInputChange}
          value={currentItem.category || ""}
        />
        {fabricInput && (
          <div>
            <Input
              type='text'
              input
              id='fabricName'
              title='Fabric Name'
              setItem={handleInputChange}
              value={currentItem.fabricName || ""}
            />
            <Input
              type='text'
              input
              id='length'
              title='Length'
              setItem={handleInputChange}
              value={currentItem.length || ""}
            />
            <Input
              type='text'
              input
              id='colors'
              title='Colors'
              setItem={handleInputChange}
              value={currentItem.colors || ""}
            />
          </div>
        )}
        <Input
          dropdown
          data={statusList}
          id='status'
          title='Product Status'
          setItem={handleInputChange}
          value={currentItem.status || ""}
        />
        <div className='rounded-md border p-4 bg-gray-100'>
          <h2>Market Status</h2>
          <div className='flex gap-2 items-center'>
            <Input
              value={currentItem.featured || ""}
              check
              id='featured'
              title='Featured'
              setItem={handleInputChange}
            />
            <Input
              value={currentItem.trending || ""}
              check
              id='trending'
              title='Trending'
              setItem={handleInputChange}
            />
          </div>
        </div>
        <Input
          type='number'
          input
          id='price'
          title='Price'
          setItem={handleInputChange}
          value={currentItem.price || ""}
        />
        <Input
          setCheck={() => setDiscount(!discount)}
          check
          id='discount'
          title='Discount (%)'
          setItem={handleInputChange}
          value={currentItem.discount || ""}
        />
        {discount && (
          <Input
            dropdown
            data={discountValues}
            id='discountValue'
            setItem={handleInputChange}
            value={currentItem.discountValue || ""}
          />
        )}
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
                onChange={(e) => {
                  console.log(e.target.files[0]);
                  setImage(e.target.files[0]);
                }}
              />
              " Browse to upload your file"
              <h4>Image uploaded</h4>
            </label>
          </div>
          <div className='preview_img grid place-items-center my-5'>
            {image && (
              <img src={URL.createObjectURL(image)} alt='' width={100} />
            )}
          </div>
        </div>
        <button
          className='bg-black text-white rounded-md text-sm md:text-base py-4 px-8 font-normal tracking-wider w-full my-2'
          onClick={uploadProduct}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default Form;
