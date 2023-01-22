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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
      },
      (error) => setError(error)
    );
    return unsubscribe;
  }, [dispatch]);

  return (
    <>
      <Hero />
      <div className='max-w-6xl mx-auto p-8 relative z-10'>
        <Slide data={category} />
        <Container
          name='new & featured'
          loading={loading}
          data={featuredProduct}
        />
        <Container name='trending' loading={loading} data={trendingProduct} />
        <Testimonial />
        <Subscribe />
      </div>
    </>
  );
};

export default Home;
