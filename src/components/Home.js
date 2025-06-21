import React from 'react'
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
import Hero from "./Hero";
import Navigation from './Navigation';
import Footer from './Footer';
import Product from './Product';
import heroImage from '../hero-image.png';

const Home = () => {
  return (
    <>
      <Navigation />
       <Hero heroImage={heroImage} altText="XX99 Mark II Headphones" />
        <Product />

    <Footer />
    </>
  )
}

export default Home
