import React, { useEffect, useState } from "react";
import { MdFilterList } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import SideFilter from "./SideFilter";
import { hideFilter, setAllProduct } from "../../Redux/features/productSlice";
import ProductContainer from "./productContainer";
import { getAllProducts } from "../../Utils/functions";

const Products = () => {
  const dispatch = useDispatch();
  const { filterShown, allProducts } = useSelector((state) => state.product);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = getAllProducts(
      (querySnapshot) => {
        const updatedItems = querySnapshot.docs.map((docSnapshot) => ({
          productId: docSnapshot.id,
          ...docSnapshot.data(),
        }));
        dispatch(setAllProduct(updatedItems));
      },
      (error) => setError(error)
    );
    return unsubscribe;
  }, [dispatch]);

  return (
    <div className='flex justify-center max-w-7xl mx-auto my-4 gap-8 p-2'>
      {filterShown && <SideFilter />}

      <div className='w-[75%] mx-auto'>
        <div
          className='hidden lg:flex gap-2 items-center ml-auto w-fit cursor-pointer'
          onClick={() => dispatch(hideFilter())}
        >
          <h1 className='font-bold'>
            {filterShown ? "Hide Filter" : "Show Filter"}
          </h1>
          <MdFilterList className='text-2xl' />
        </div>
        <ProductContainer data={allProducts} />
      </div>
    </div>
  );
};

export default Products;
