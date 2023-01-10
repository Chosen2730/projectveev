import Input from "../Form/input";
import React from "react";
import { useState } from "react";
import { createCustomOrder } from "../../Utils/createFunctions";
import Spinner from "../Configs/spinner";

const CustomOrder = () => {
  const defaultOrderItems = {
    name: '',
    email: '',
    tel: '',
    social: '',
    text: '',
    shoulder: '',
    upper_waist: '',
    lower_waist: '',
    waist: '',
    thigh: '',
    dress_length: '',
    bust: '',
    top_length: '',
    cuff: '',
    full_hip: '',
    knee: '',
    tommy: '',
    sleeve_length: '',
    round_sleeve: '',
    skirt_trouser_length: '',
    ankle: '',
    message: '',
    quatity: '',
    imageUrls: [],
    _createdAt: new Date().toDateString(),
    _updatedAt: new Date().toDateString(),
  }
  // const [fabricImages, setFabricImages] = useState([]);
  const [styleImages, setStyleImages] = useState([]);
  const [orderItems, setOrderItems] = useState(defaultOrderItems);
  const [isLoading, setIsLoading] = useState(false);
  // const uploadFabric = (e) => {
  //   setFabricImages(e.target.files);
  //   console.log(fabricImages);
  // };
  const uploadStyles = (e) => {
    const newImage = Array.prototype.slice.call(e.target.files);
    const uploaded = [...styleImages];
    newImage.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
      }
      return 0;
    });
    setStyleImages(uploaded);
    // setStyleImages(e.target.files);
  };

  const handleInputChange = (e) => {
    setOrderItems({
      ...orderItems,
      [e.target.name]: e.target.value,
      // allImages,
    });
    // console.log(orderItems);
  };

  const handleDeleteImage = (image) => {
    const filteredImages = styleImages.filter((item) => item.name !== image.name);
    setStyleImages(filteredImages);
    console.log(filteredImages);
    if (filteredImages.length < 1) {
      document.getElementById("imagePicker").value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(orderItems);
    await createCustomOrder(orderItems, styleImages)
    setIsLoading(false);

  }

  return (
    <div>
      <h2 className='uppercase text-xl font-bold'>Custom Orders</h2>
      <p className='text-sm my-4'>
        Our custom order page allows you to request a design that suits a
        specific need. <br />
        <br />
        Our custom order page allows you to request a design that suits a
        specific need. <br />
        <br />
        After submitting your request, a member of the team will reach out to
        you for confirmations. This is to ensure that we satisfy your requests
        excellently. <br />
        <br />
        You can send your preferred fabric to our physical store, or you select
        from our stock. Pictures and videos of the final design will be sent to
        you before delivery. This is to enable us make any necessary adjustments
        if required.
        <br />
        <br /> Looking forward to receiving and creating custom designs for your
        special events.
      </p>
      <h2 className='font-bold text-sm '>
        Note: Changes cannot be made once production has commenced.
      </h2>
      <h2 className='my-3 text-sm'>
        Kindly fill the form below to place your order or contact us via
        info@veevclothiers.com or WhatsApp +2348067891075; +2349039878244
      </h2>

      <form action='' className='text-sm' onSubmit={(e) => { alert('hello') }}>
        <div>
          <h2>Personal Information</h2>
          <div className='grid grid-cols-2 gap-4'>
            <Input
              id='name'
              type='name'
              title='Name'
              input
              setItem={handleInputChange}
            />
            <Input
              id='email'
              type='email'
              title='Email Address'
              input
              setItem={handleInputChange}
            />
            <Input
              id='tel'
              type='tel'
              title='Tel No'
              input
              setItem={handleInputChange}
            />
            <Input
              id='social'
              type='text'
              title='Active Social Media Handle'
              input
              setItem={handleInputChange}
            />
            <Input
              id='text'
              type='text'
              title='What would you like to order? (Top, dressk 2-piece, etc.'
              input
              setItem={handleInputChange}
            />
          </div>
        </div>
        <>
          {/* <div className='border my-4 p-4 rounded-md'>
          <label
            htmlFor='imagePicker'
            className='cursor-pointer font-bold block my-2 text-lg'
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
        </div> */}
        </>
        <div className='border my-4 p-4 rounded-md'>
          <div className='flex gap-4 justify-between items-center'>
            <h2 className='my-2 font-bold text-lg'>Measurement in Inches</h2>
            <a
              href='https://drive.google.com/drive/folders/1yFoLdBQWoiTVZxlQ4qmxYMLugoIHHcfv?pli=1'
              target={"__blank"}
              className='text-sm italic underline text-blue-800 font-medium'
            >
              Check Size Chart
            </a>
          </div>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
            <Input
              title='Shoulder'
              id='shoulder'
              input
              type='number'
              setItem={handleInputChange}
            />
            <Input
              title='Upper Waist (women)'
              id='upper_waist'
              input
              type='number'
              setItem={handleInputChange}
            />
            <Input
              title='Lower Waist (women)'
              id='lower_waist'
              input
              type='number'
              setItem={handleInputChange}
            />
            <Input
              title='Waist'
              id='waist'
              input
              type='number'
              setItem={handleInputChange}
            />
            <Input
              title='Thigh'
              id='thigh'
              input
              type='number'
              setItem={handleInputChange}
            />
            <Input
              title='Dress Length'
              id='dress_length'
              input
              type='number'
              setItem={handleInputChange}
            />
            <Input
              title='Bust'
              id='bust'
              input
              type='number'
              setItem={handleInputChange}
            />
            <Input
              title='Top Length'
              id='top_length'
              input
              type='number'
              setItem={handleInputChange}
            />
            <Input
              title='Cuff'
              id='cuff'
              input
              type='number'
              setItem={handleInputChange}
            />
            <Input
              title='Full Hip'
              id='full_hip'
              input
              type='number'
              setItem={handleInputChange}
            />
            <Input
              title='Knee'
              id='knee'
              input
              type='number'
              setItem={handleInputChange}
            />
            <Input
              title='Tommy (Men)'
              id='tommy'
              input
              type='number'
              setItem={handleInputChange}
            />
            <Input
              title='Sleeve Length'
              id='sleeve_length'
              input
              type='number'
              setItem={handleInputChange}
            />
            <Input
              title='Round Sleeve'
              id='round_sleeve'
              input
              type='number'
              setItem={handleInputChange}
            />
            <Input
              title='Skirt/Trouser Length'
              id='skirt_trouser_length'
              input
              type='number'
              setItem={handleInputChange}
            />
            <Input
              title='Ankle'
              id='ankle'
              input
              type='number'
              setItem={handleInputChange}
            />
          </div>
        </div>
        <div className='border my-4 p-4 rounded-md'>
          <label
            htmlFor='imagePicker'
            className='cursor-pointer font-bold block my-2 text-lg'
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
        <div className='grid grid-cols-2 gap-4'>
          <Input
            id='message'
            type='text'
            title='Short Notes'
            textarea
            setItem={handleInputChange}
          />
          <Input
            id='quatity'
            type='number'
            title='Quantity'
            input
            setItem={handleInputChange}
          />
        </div>
        <button className='bg-black rounded-xl px-8 py-4 text-white' type="submit"
          onClick={(e) => { handleSubmit(e) }}>
          {isLoading ? (
            <Spinner loaderText={"Submiting"} />
          ) :
            "Submit"
          }
        </button>
      </form>
    </div>
  );
};

export default CustomOrder;
