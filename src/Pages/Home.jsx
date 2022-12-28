import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Slide from "../Components/Home/categorySlide";
import Container from "../Components/Home/container";
import Hero from "../Components/Home/hero";
import Subscribe from "../Components/Home/subscribe";
import Testimonial from "../Components/Home/testimonial";
import { setAllProduct, setFeatProduct } from "../Redux/features/productSlice";
import { category } from "../Utils/category";
import { getAllProducts } from "../Utils/functions";

const Home = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  const [trendingProduct, setTrendingProduct] = useState([]);
  const [featuredProduct, setFeaturedProduct] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetch = async () => {
      var limit = 100;
      const res = await getAllProducts(limit);
      dispatch(setAllProduct(res.data));
      const feat = res?.data?.filter((product) => product.featured === "on");
      const trend = res?.data?.filter((product) => product.trending === "on");
      setTrendingProduct(trend);
      setFeaturedProduct(feat);
    };
    fetch();
  }, []);

  return (
    <>
      <Hero />
      <div className='max-w-6xl mx-auto p-8'>
        <Slide data={category} />
        <Container name='new & featured' data={featuredProduct} />
        <Container name='trending' data={trendingProduct} />
        <Testimonial />
        <Subscribe />
      </div>
    </>
  );
};

export default Home;
