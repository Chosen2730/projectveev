import React, { useEffect, useState } from "react";
import Slide from "../Components/Home/categorySlide";
import Container from "../Components/Home/container";
import Hero from "../Components/Home/hero";
import Subscribe from "../Components/Home/subscribe";
import Testimonial from "../Components/Home/testimonial";
import Shared from "../Components/Shared";
import { category } from "../Utils/category";
import { getAllFeaturedProducts, getAllTrendingProducts } from "../Utils/functions";
import { featured, trending } from "../Utils/products";

const Home = () => {
  // const [featured, setFeatured] = useState(null)
  // const [trending, setTrending] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      const f = await getAllFeaturedProducts()
      const t = await getAllTrendingProducts()
      console.log({f,t});
    }
  
    fetch()
  }, [])
  
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
