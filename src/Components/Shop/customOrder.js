import Input from "../Form/input";
import React from "react";
import { useState } from "react";

const CustomOrder = () => {
  const [fabricImages, setFabricImages] = useState([]);
  const [styleImages, setStyleImages] = useState([]);
  const [orderItems, setOrderItems] = useState(Object);
  const uploadFabric = (e) => {
    setFabricImages(e.target.files);
    console.log(fabricImages);
  };
  const uploadStyles = (e) => {
    setStyleImages(e.target.files);
  };
  const handleInputChange = (e) => {
    setOrderItems({
      ...orderItems,
      [e.target.name]: e.target.value,
      // allImages,
    });
    console.log(orderItems);
  };
  const handleDeleteImage = () => {};
  return (
    <div>
      <h2 className='uppercase text-xl font-bold'>Make Your Custom Orders</h2>
      <p className='text-sm my-4'>
        We don't have a style that appeals to you in our store? You can let
        still order your preferred style and we will take care of it.
      </p>
      <h2 className='font-medium'>Hints/Guides:</h2>
      <div className='ml-4'>
        <li className='list-disc my-3'>
          You can choose from the list of available fabrics in our store,
          screenshot and upload
        </li>
        <li className='list-disc my-3'>
          You can upload your own fabrics and style (not more than three images)
        </li>
        <li className='list-disc my-3'>
          Drop your active social media handles so we can connect with you after
          your order is recieved
        </li>
      </div>
      <form action='' className='text-sm'>
        <div className='border my-4 p-4 rounded-md'>
          <label
            htmlFor='imagePicker'
            className='cursor-pointer font-bold block my-2'
          >
            Upload Fabric
          </label>
          <input
            type='file'
            placeholder='Browse to upload your file'
            id='imagePicker'
            accept='image/*'
            multiple
            onChange={uploadFabric}
          />
          <div className='preview_img grid place-items-center my-5 grid-cols-5'>
            {fabricImages &&
              Array.from(fabricImages).map((image, i) => {
                return (
                  <div key={i} className='relative'>
                    <img
                      src={URL.createObjectURL(image)}
                      alt=''
                      className='w-20 h-20 object-contain'
                    />
                    <div
                      className='absolute top-0 -right-2 font-bold text-red-700 cursor-pointer'
                      onClick={() => {
                        handleDeleteImage(image);
                      }}
                    >
                      x
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className='border my-4 p-4 rounded-md'>
          <h2 className='my-2 font-bold'>Measurement in Inches</h2>
          <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
            <Input
              title='Top Length'
              id='top'
              input
              type='number'
              setItem={handleInputChange}
            />
            <Input
              title='Arm Length'
              id='arm'
              input
              type='number'
              setItem={handleInputChange}
            />
            <Input
              title='Trouser/Skirt'
              id='trouser-skirt'
              input
              type='number'
              setItem={handleInputChange}
            />
            <Input
              title='Back'
              id='back'
              input
              type='number'
              setItem={handleInputChange}
            />
            <Input
              title='Neck'
              id='neck'
              input
              type='number'
              setItem={handleInputChange}
            />
          </div>
        </div>
        <div className='border my-4 p-4 rounded-md'>
          <label
            htmlFor='imagePicker'
            className='cursor-pointer font-bold block my-2'
          >
            Upload Styles
          </label>
          <input
            type='file'
            placeholder='Browse to upload your file'
            id='imagePicker'
            accept='image/*'
            multiple
            onChange={uploadStyles}
          />
          <div className='preview_img grid place-items-center my-5 grid-cols-5'>
            {styleImages &&
              Array.from(styleImages).map((image, i) => {
                return (
                  <div key={i} className='relative'>
                    <img
                      src={URL.createObjectURL(image)}
                      alt=''
                      className='w-20 h-20 object-contain'
                    />
                    <div
                      className='absolute top-0 -right-2 font-bold text-red-700 cursor-pointer'
                      onClick={() => {
                        handleDeleteImage(image);
                      }}
                    >
                      x
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className='border my-4 p-4 rounded-md'>
          <Input
            id='quatity'
            type='number'
            title='Quantity'
            input
            setItem={handleInputChange}
          />
        </div>
        <button className='bg-black rounded-xl px-8 py-4 text-white'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CustomOrder;
