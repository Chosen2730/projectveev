import React, { useEffect, useState } from "react";
import Slide from "../Components/Home/categorySlide";
import Container from "../Components/Home/container";
import Hero from "../Components/Home/hero";
import Subscribe from "../Components/Home/subscribe";
import Testimonial from "../Components/Home/testimonial";
import Shared from "../Components/Shared";
import { category } from "../Utils/category";
import {
  getAllFeaturedProducts,
  getAllTrendingProducts,
} from "../Utils/functions";
import { featured, trending } from "../Utils/products";

const Home = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  const [trendingProduct, setTrendingProduct] = useState([]);
  const [featuredProduct, setFeaturedProduct] = useState([]);

  const fetch = async () => {
    const feat = await getAllFeaturedProducts();
    const trend = await getAllTrendingProducts();
    setTrendingProduct(trend);
    setFeaturedProduct(feat);

    console.log(feat, trend);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      <Hero />
      <div className='max-w-6xl mx-auto p-8'>
        <Slide data={category} />
        <Container name='new & featured' data={featured} />
        <Container name='trending' data={trending} />
        <Testimonial />
        <Subscribe />
      </div>
    </>
  );
};

export default Home;
