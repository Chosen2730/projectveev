import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { FaOpencart } from "react-icons/fa";
import { MdArrowBack, MdAttachMoney } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import Currency from "../Components/Configs/currency";
import Container from "../Components/Home/container";
import { sizes } from "../Utils/category";
import { addToCart, updateQty } from "../Redux/features/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import tag from "../images/tag.png";
import que from "../images/que.png";
import del from "../images/del.png";
import { login } from "../Redux/features/authSlice";

const Product = () => {
  const navigate = useNavigate();
  const { qty, allProducts, featuredProducts } = useSelector(
    (state) => state.product
  );
  const { token } = useSelector((state) => state.auth);
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
    status,
  } = singleProduct;
  const discount = (parseInt(discountValue || 0) / 100) * price;
  const newPrice = price - discount;
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
  const addToCartHandler = (id, qty, newPrice) => {
    if (token) {
      dispatch(addToCart({ navigate, id, qty, newPrice }));
    } else {
      alert(
        "You need to be logged in to perform this operation, you'll be redirected to login page"
      );
      dispatch(login());
    }
  };
  return (
    <div className='mx-auto max-w-6xl p-4'>
      <Link to='/shop'>
        <MdArrowBack className='text-3xl bg-black text-white p-1 rounded-full' />
      </Link>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 my-5'>
        <div>
          <img
            className='h-[400px] w-full object-cover'
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
          <h2 className='font-bold text-lg uppercase'>{title}</h2>
          <div className='flex text-xl my-2'>
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
          <div className='flex gap-2'>
            <h2 className='text-sm'>
              Availability: <span> {status}</span>{" "}
            </h2>
          </div>
          <div className='my-3'>
            <div className='flex justify-between'>
              <h2 className='uppercase font-bold text-sm'>Size</h2>
            </div>
            <select
              name=''
              className='w-full bg-gray-200 shadow-md p-4 my-4 rounded-md '
              id=''
            >
              {sizes.map((item, i) => {
                return <option key={i}>{item}</option>;
              })}
            </select>
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
              onClick={() => addToCartHandler(id, qty, newPrice)}
            >
              Add to Cart
              <FaOpencart className='text-2xl' />
            </button>
            <button
              className='font-medium flex items-center justify-center border-black border p-4 px-8 rounded-full gap-2 hover:scale-105 transition'
              onClick={() => addToCartHandler(id, qty, newPrice)}
            >
              Buy Now
              <MdAttachMoney className='text-2xl' />
            </button>
          </div>
          <div className='flex gap-2 my-5'>
            <a
              href='https://drive.google.com/drive/folders/1yFoLdBQWoiTVZxlQ4qmxYMLugoIHHcfv?pli=1'
              target={"__blank"}
              className='flex items-center gap-1'
            >
              <img src={tag} alt='' className='w-6' />
              <h2 className='text-xs'>Size Guide</h2>
            </a>
            <Link to='/return-policy' className='flex items-center gap-1'>
              <img src={del} alt='' className='w-6' />
              <h2 className='text-xs'>Delivery and Return</h2>
            </Link>
            <a
              href='https://wa.me/message/GCZSV3CRNB6SI1'
              target={"__blank"}
              className='flex items-center gap-1'
            >
              <img src={que} alt='' className='w-6' />
              <h2 className='text-xs'>Ask a Question</h2>
            </a>
          </div>
        </div>
      </div>
      <Container data={featuredProducts} name='related posts' />
    </div>
  );
};

export default Product;
