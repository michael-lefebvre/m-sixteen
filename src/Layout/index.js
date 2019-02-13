import React, { PureComponent, Fragment } from 'react'
import { AppContext } from 'Contexts/App'
import Home from 'Sections/Home'
import Releases from 'Sections/Releases'
// import Videos from 'Sections/Videos'

export default class Layout extends PureComponent {
  static contextType = AppContext;

  //
  // Life cycle
  // --------------------------------------------------

  //
  // Helpers
  // --------------------------------------------------


  //
  // Events Handlers
  // --------------------------------------------------

  //
  // Renderers
  // --------------------------------------------------

  render() {
    if(!this.context.matches('ready'))
      return null

    return (
      <Fragment>
        <Home />
        <Releases />
        {/*<Videos />*/}
      </Fragment>
    )
  }
}
