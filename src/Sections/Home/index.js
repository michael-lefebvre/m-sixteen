import React, { Fragment } from 'react';
import { withApp } from 'Hoc';
import Hero from './Hero';
import Bkgd from './Bkgd';

const Home = ({ isMobile }) => (
  <Fragment>
    <Hero />
    {!isMobile && <div className="home-bkgd" />}
    {!isMobile && <Bkgd />}
  </Fragment>
);

const mapAppContextToProps = context => ({
  isMobile: context.context.device === 'mobile'
});

export default withApp(mapAppContextToProps)(Home);
