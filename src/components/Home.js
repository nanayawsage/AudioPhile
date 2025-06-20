import React from 'react'
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import Hero from "./Hero";
import Navigation from './Navigation';
import Footer from './Footer';
import Product from './Product';

const Home = () => {
  return (
    <>
      <Navigation />
        <Product />
      {/* <Hero /> */}

    <Footer />
    </>
  )
}

export default Home
