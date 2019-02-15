import React, { Fragment } from 'react';
import Hero from './Hero';
import Bkgd from './Bkgd';

const Home = () => (
  <Fragment>
    <Hero />
    <div className="home-bkgd" />
    <Bkgd />
  </Fragment>
);

export default Home;
