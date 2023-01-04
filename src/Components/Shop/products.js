import React, { useEffect, useState } from "react";
import { MdFilterList } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import SideFilter from "./SideFilter";
import { hideFilter, setAllProduct } from "../../Redux/features/productSlice";
import ProductContainer from "./productContainer";
import { getAllProducts } from "../../Utils/functions";
import CustomOrder from "./customOrder";

const Products = () => {
  const dispatch = useDispatch();
  const { filterShown, allProducts, activeCategory } = useSelector(
    (state) => state.product
  );
  const [error, setError] = useState("");
  const [listProducts, setListProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = getAllProducts(
      (querySnapshot) => {
        const updatedItems = querySnapshot.docs.map((docSnapshot) => ({
          productId: docSnapshot.id,
          ...docSnapshot.data(),
        }));
        dispatch(setAllProduct(updatedItems));
        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, [dispatch]);
  useEffect(() => {
    let products;
    if (activeCategory === 0) {
      products = allProducts.filter(
        (product) => product.category === "Ready-To-Wear"
      );
    } else if (activeCategory === 1) {
      products = allProducts.filter((product) => product.category === "Women");
    } else if (activeCategory === 2) {
      products = allProducts.filter((product) => product.category === "Men");
    } else if (activeCategory === 3) {
      products = allProducts.filter((product) => product.category === "Kids");
    } else if (activeCategory === 4) {
      products = allProducts.filter(
        (product) => product.category === "Fabrics"
      );
    }
    setListProducts(products);
  }, [allProducts, activeCategory]);
  return (
    <div className='flex justify-center max-w-7xl mx-auto my-4 gap-8 p-2'>
      {filterShown && <SideFilter />}

      <div className='md:w-[75%] mx-auto p-5'>
        <div
          className='hidden lg:flex gap-2 items-center ml-auto w-fit cursor-pointer'
          onClick={() => dispatch(hideFilter())}
        >
          <h1 className='font-bold'>
            {filterShown ? "Hide Filter" : "Show Filter"}
          </h1>
          <MdFilterList className='text-2xl' />
        </div>

        {activeCategory === 5 ? (
          <CustomOrder />
        ) : (
          <ProductContainer data={listProducts} loading={loading} />
        )}
      </div>
    </div>
  );
};

export default Products;
