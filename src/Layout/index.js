import React, { Component, Fragment } from 'react'
import { withApp } from 'Contexts/App'
import Home from 'Sections/Home'
import Releases from 'Sections/Releases'
import Videos from 'Sections/Videos'

class Layout extends Component {
  render() {
    // console.log(this.props)
    return (
      <Fragment>
        <Home />
        <Releases />
        <Videos />
      </Fragment>
    )
  }
}

const mapContextToProps = state => ({
  isReady: state.isReady(),
  device: state.device,
});

export default withApp(mapContextToProps)(Layout);
