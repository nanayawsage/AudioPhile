import React from "react";

import Hero from "./Hero";
import Product from "./Product";
import heroImage from "../hero-image.png";

const Home = () => {
  return (
    <>
      <Hero heroImage={heroImage} altText="XX99 Mark II Headphones" />
      <Product />
    </>
  );
};

export default Home;
