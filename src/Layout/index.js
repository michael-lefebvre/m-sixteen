import React, { PureComponent, Fragment } from 'react'
import { withApp } from 'Contexts/App'
import Home from 'Sections/Home'
import Releases from 'Sections/Releases'
import Videos from 'Sections/Videos'
import FontFaceObserver from 'fontfaceobserver';

class Layout extends PureComponent {

  state = {
    fontsLoaded: false
  };

  //
  // Life cycle
  // --------------------------------------------------

  componentDidMount() {
    const fonts = [];
    const families = [
      {
        name: 'Open Sans',
        weight: 400
      },
      {
        name: 'Open Sans',
        weight: 700
      },
      {
        name: 'Open Sans',
        weight: 800
      },
      {
        name: 'Open Sans',
        weight: 900
      },
      {
        name: 'Rubik',
        weight: 500
      },
    ]

    families.forEach(({name, weight}) => {
      const font = new FontFaceObserver(name, { weight });
      fonts.push(font.load(null, 5000));
    });

    Promise.all(fonts).then(this.handleFontsLoaded, () => {
      console.log('Font is not available');
    });
  }

  //
  // Helpers
  // --------------------------------------------------


  //
  // Events Handlers
  // --------------------------------------------------

  handleFontsLoaded = () => {
    this.setState({ fontsLoaded: true })
  };

  //
  // Renderers
  // --------------------------------------------------

  render() {
    if(!this.state.fontsLoaded) return null

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
