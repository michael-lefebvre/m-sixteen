import React, { Component } from 'react'
import HomeContext from 'Contexts/Home';
import Hero from './Hero'
import Bkgd from './Bkgd'

class Home extends Component {
  render() {
    // console.log(this.props)
    return (
      <HomeContext>
        <Hero />
        <Bkgd />
      </HomeContext>
    )
  }
}

export default Home;
