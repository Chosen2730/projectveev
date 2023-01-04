import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Slide from "../Components/Home/categorySlide";
import Container from "../Components/Home/container";
import Hero from "../Components/Home/hero";
import AboutHero from "../Components/About/hero";
import Subscribe from "../Components/Home/subscribe";
import Testimonial from "../Components/Home/testimonial";
import { setAllProduct, setFeatProduct } from "../Redux/features/productSlice";
import { category } from "../Utils/category";
import { getAllProducts } from "../Utils/functions";
import { Link } from "react-router-dom";
import HeroSwiper from "../Utils/heroSwiper";

const Home = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  const [trendingProduct, setTrendingProduct] = useState([]);
  const [featuredProduct, setFeaturedProduct] = useState([]);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = getAllProducts(
      (querySnapshot) => {
        const updatedItems = querySnapshot.docs.map((docSnapshot) => ({
          productId: docSnapshot.id,
          ...docSnapshot.data(),
        }));
        dispatch(setAllProduct(updatedItems));
        const feat = updatedItems?.filter(
          (product) => product.featured === "on"
        );
        const trend = updatedItems?.filter(
          (product) => product.trending === "on"
        );
        setTrendingProduct(trend);
        setFeaturedProduct(feat);
      },
      (error) => setError(error)
    );
    return unsubscribe;
  }, [dispatch]);
  error && console.log(error);

  return (
    <>
      <Hero />
      <div className='max-w-6xl mx-auto p-8 relative z-10'>
        <Slide data={category} />
        <div className='shadow-md p-5 md:p-8'>
          <AboutHero />
          <Link to='/about'>
            <button className='bg-black text-white px-6 py-3 rounded-xl my-4'>
              Read More
            </button>
          </Link>
        </div>
        <Container name='new & featured' data={featuredProduct} />
        <Container name='trending' data={trendingProduct} />
        <Testimonial />
        <Subscribe />
        {/* <HeroSwiper /> */}
      </div>
    </>
  );
};

export default Home;
