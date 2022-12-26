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
  getAllProducts,
  getAllTrendingProducts,
} from "../Utils/functions";
import { featured, trending } from "../Utils/products";

const Home = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  const [allProducts, setAllProducts] = useState([]);
  const [trendingProduct, setTrendingProduct] = useState([]);
  const [featuredProduct, setFeaturedProduct] = useState([]);

  
  useEffect(() => {
    const fetch = async () => {
      var limit = 100;
      const res = await getAllProducts(limit);
      const feat = await getAllFeaturedProducts(limit);
      const trend = await getAllTrendingProducts(limit);
      res.data && setAllProducts(res.data);
      trend.data && setTrendingProduct(trend.data);
      feat.data && setFeaturedProduct(feat.data);
  
    };
    fetch();
  }, []);
  console.log({allProducts, featuredProduct, trendingProduct});

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
