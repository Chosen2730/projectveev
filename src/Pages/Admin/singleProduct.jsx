import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Currency from "../../Components/Configs/currency";

const SingleProduct = () => {
  const { productID } = useParams();
  console.log(productID);
  const { allProducts } = useSelector((state) => state.admin);
  const [product, setProduct] = useState({});
  useEffect(() => {
    setProduct(() =>
      allProducts.find((product) => product.productId === productID)
    );
    console.log(product);
  }, [productID]);
  const {
    category,
    desc,
    featured,
    imageStoragePATH,
    imageUrl,
    discountValue,
    percentageDiscount,
    price,
    status,
    title,
    trending,
  } = product && product;
  return (
    <div className='p-4'>
      <Link to='/admin' className='flex items-center gap-2 font-medium'>
        <i>
          <MdOutlineArrowBackIos />
        </i>
        <h2>Back</h2>
      </Link>
      <h2 className='font-bold my-4 text-2xl'>Product Details</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:items-center shadow-lg p-8'>
        <div>
          <img
            src={imageUrl}
            className='w-full md:h-[300px] object-contain'
            alt=''
          />
        </div>
        <div>
          <h2 className='font-bold text-xl capitalize'>
            Product Name:
            <span className='capitalize font-medium'> {title}</span>
          </h2>
          <h2 className='font-bold my-2'>
            Category: <span className='capitalize font-medium'>{category}</span>
          </h2>
          <h2 className='font-bold my-2'>
            Product Description:{" "}
            <span className='capitalize font-medium'>{desc}</span>
          </h2>
          <h2 className='font-bold my-2'>
            Discount:
            <span className='capitalize font-medium'> {discountValue}%</span>
          </h2>
          <h2 className='font-bold my-2'>
            Price:
            <Currency amount={price} />
          </h2>
          <h2 className='font-bold my-2'>
            Featured:
            <span className='capitalize font-medium'>
              {" "}
              {featured ? "Yes" : "No"}
            </span>
          </h2>
          <h2 className='font-bold my-2'>
            Trending:
            <span className='capitalize font-medium'>
              {" "}
              {trending ? "Yes" : "No"}
            </span>
          </h2>
          <h2 className='font-bold my-2'>
            Availability Status:
            <span className='capitalize font-medium'> {status}</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
