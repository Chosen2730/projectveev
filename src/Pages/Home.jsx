import React from "react";
import Slide from "../Components/Home/categorySlide";
import Hero from "../Components/Home/hero";
import Shared from "../Components/Shared";
import { category } from "../Utils/category";

const Home = () => {
  return (
    <Shared>
      <Hero />
      <Slide data={category} />
    </Shared>
  );
};

export default Home;
