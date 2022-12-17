import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
// import { allProducts } from "../../Redux/features/adminSlice";
import Currency from "../Configs/currency";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import Form from "./form";
import { useDispatch, useSelector } from "react-redux";
import { setProductModalShown } from "../../Redux/features/adminSlice";
import {
  deleteProduct,
  getAllProducts,
  updateProductStatus,
} from "../../Utils/functions";
const Products = () => {
  const productHeader = [
    "product",
    "date",
    "description",
    "price",
    "status",
    "actions",
  ];
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [allProducts, setAllProducts] = useState([]);
  const [limit, setLimit] = useState(20);
  const [lastVisibleItem, setLastVisibleItem] = useState();

  useEffect(() => {
    const fetch = async () => {
      const res = await getAllProducts(limit);
      setAllProducts(res.data);
      setLastVisibleItem(res.lastVisibleItem);
    };
    fetch();
  }, [limit]);

  const updateStatus = (productId) => {
    var value = "In stock";
    updateProductStatus(isLoggedIn, productId, value);
  };

  return (
    <div className=''>
      <div className='flex flex-col my-4 gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <h2 className='text-xl font-bold'>
          All Products ({allProducts.length})
        </h2>
        <button
          className='flex items-center justify-center text-white p-4 px-8 rounded-md bg-black gap-2 hover:scale-105 transition w-fit'
          onClick={() => dispatch(setProductModalShown())}
        >
          Upload Product
          <IoMdAdd className='text-2xl' />
        </button>
      </div>
      <div className='overflow-x-scroll'>
        <div className='grid'>
          <div className='grid gridLayout my-5 bg-gray-100 rounded-md p-5 '>
            {productHeader?.map((item, index) => {
              return (
                <h2 className='capitalize font-bold text-base' key={index}>
                  {item}
                </h2>
              );
            })}
          </div>
          <div className=''>
            {allProducts?.map(
              (
                { productId, title, imageUrl, price, desc, imageStoragePATH },
                index
              ) => {
                return (
                  <div
                    key={index}
                    className='grid gridLayout px-5 py-2 text-xs items-center'
                  >
                    <div className='flex gap-2 items-center'>
                      <img
                        className='w-10 h-10 rounded-md object-cover'
                        src={imageUrl}
                        alt={title}
                      />
                      <h2 className='font-medium'>{title}</h2>
                    </div>
                    <h2 className='capitalize'>02/04/22</h2>
                    <h2 className='capitalize'>{desc.slice(0, 50)}...</h2>
                    <Currency amount={price} className='font-medium' />
                    <h2 className='capitalize'>In stock</h2>
                    <div className='flex justify-between gap-2 text-xl'>
                      <AiOutlineDelete
                        className='bg text-red-500 cursor-pointer rounded-md'
                        onClick={async () => {
                          await deleteProduct(
                            isLoggedIn,
                            productId,
                            imageStoragePATH
                          );
                        }}
                      />
                      <AiOutlineEdit className='bg- text-blue-500 cursor-pointer rounded-md' />
                      <AiOutlineEye className='bg-g text-gray-500 cursor-pointer rounded-md' />
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
      <Form />
    </div>
  );
};

export default Products;
