import React from 'react'
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
import Hero from "./Hero";
import Navigation from './Navigation';
import Speakers from './Speakers';
import Earphones from './Earphones';
const Home = () => {
  return (
    <>
      <Navigation />
      <Hero />
      <Speakers />
      <Earphones />
    
    </>
  )
}

export default Home
