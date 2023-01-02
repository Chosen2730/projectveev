import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { FaOpencart } from "react-icons/fa";
import { MdArrowBack, MdAttachMoney } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import Currency from "../Components/Configs/currency";
import Container from "../Components/Home/container";
import { arr } from "../Redux/features/productSlice";
import { sizes } from "../Utils/category";
import { featured } from "../Utils/products";
import { addToCart, updateQty } from "../Redux/features/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Product = () => {
  const navigate = useNavigate();
  const { qty, allProducts, featuredProducts } = useSelector(
    (state) => state.product
  );
  const { productId: id } = useParams();
  const singleProduct = allProducts.find((product) => product.productId === id);
  const {
    desc,
    imageURLS,
    price,
    title,
    discountValue,
    fabricName,
    length,
    colors,
  } = singleProduct;
  const discount = (parseInt(discountValue || 0) / 100) * price;
  const newPrice = price - discount;

  const [selectedSizeIndex, setSelectedSizeIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const imageUrl = (imageURLS && imageURLS[activeIndex].url) || "";
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setActiveIndex((n) => {
        const newIndex = n + 1;
        if (newIndex > imageURLS.length - 1) {
          return 0;
        } else return newIndex;
      });
    }, 3000);
    return () => clearInterval(t);
  }, [activeIndex]);
  console.log(singleProduct);

  return (
    <div className='mx-auto max-w-6xl p-4'>
      <Link to='/shop'>
        <MdArrowBack className='text-3xl bg-black text-white p-1 rounded-full' />
      </Link>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 my-5'>
        <div>
          <img
            className='h-[500px] w-full object-cover'
            src={imageUrl}
            alt={title}
          />
          <div className='grid grid-cols-3 gap-4 my-3'>
            {imageURLS?.slice(0, 3).map(({ url }, i) => {
              return (
                <img
                  onClick={() => setActiveIndex(i)}
                  className={`${
                    activeIndex === i ? "border-4 border-green-500" : ""
                  } w-full h-32 rounded-md transition object-cover`}
                  key={i}
                  src={url}
                  alt='image'
                />
              );
            })}
          </div>
        </div>
        <div>
          <h2 className='font-bold text-2xl uppercase'>{title}</h2>
          <div className='flex text-4xl my-2'>
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
          </div>
          <div className='my-3'>
            <Currency className='font-bold my text-lg' amount={newPrice} />
            <Currency
              className='font-medium line-through text-gray-500 text-xs'
              amount={price}
            />
            <h2 className='my-2 text-sm'>{desc}</h2>
          </div>
          {fabricName && (
            <div className='my-5'>
              <h2 className='uppercase text-sm'>
                <span className='font-bold capitalize'>Fabric name:</span>{" "}
                {fabricName}
              </h2>
              <h2 className='text-sm capitalize'>
                <span className='font-bold'>Length:</span> {length}
              </h2>
              <h2 className='text-sm uppercase my-2'>
                <span className='font-bold capitalize'>Colors:</span> {colors}
              </h2>
            </div>
          )}

          <div className='my-3'>
            <h2 className='uppercase font-bold text-sm'>Size</h2>
            <div className='flex gap-4 my-2'>
              {sizes.slice(sizes.length - 4, sizes.length).map((item, i) => (
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
          </div>
          <div className='grid grid-cols-1 xl:flex gap-6'>
            <div className='flex gap-5 justify-center w-fit items-center border border-black'>
              <h2
                className='p-2 cursor-pointer select-none text-2xl font-medium'
                onClick={() => dispatch(updateQty({ qty, action: "DEC" }))}
              >
                -
              </h2>
              <h2 className='font-medium text-xl'>{qty}</h2>
              <h2
                className='p-2 cursor-pointer select-none text-2xl font-medium'
                onClick={() => dispatch(updateQty({ qty, action: "INC" }))}
              >
                +
              </h2>
            </div>
            <button
              className='font-medium flex items-center justify-center text-white p-4 px-8 rounded-full bg-black gap-2 hover:scale-105 transition'
              onClick={() =>
                dispatch(addToCart({ navigate, id, qty, newPrice }))
              }
            >
              Add to Cart
              <FaOpencart className='text-2xl' />
            </button>
            <button className='font-medium flex items-center justify-center border-black border p-4 px-8 rounded-full gap-2 hover:scale-105 transition'>
              Buy Now
              <MdAttachMoney className='text-2xl' />
            </button>
          </div>
        </div>
      </div>
      <Container data={featuredProducts} name='related posts' />
    </div>
  );
};

export default Product;
