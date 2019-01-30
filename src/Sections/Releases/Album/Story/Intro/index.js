
import React, { Component } from 'react'
// import { Controller, config } from 'react-spring'
import { withApp } from 'Contexts/App'
import { Link } from "react-router-dom";
// import classNames from 'classnames'
import { ImagePath, PhotoPath/*, AnimatedDiv*/, roundToEven } from 'Utils'
// import Tracks from '../Tracks'
import './index.scss'

// const _setPosition = scrollTop => ({
//   translate: parseFloat(scrollTop * .7),
//   config: config.slow
// });

class SlideIntro extends Component {
  // controller = new Controller(_setPosition(0));
  // Life cycle
  // --------------------------------------------------

  // componentDidMount() {
  //   this.props.onMounted(this)
  // }


  // Helpers
  // --------------------------------------------------

  // setPosition(scrollTop) {
  //   this.controller.update(_setPosition(scrollTop))
  // }

  //
  // Renderers
  // --------------------------------------------------

  render() {
    const { height, left, width } = this.props;

    // const translate3d = this.controller.interpolations.translate.interpolate(
    //   x => `translate3d(0,${x}px,0) rotate(-180deg)`
    // )

    return (
      <div className="album__intro album--onmounted" style={{ left, height, width }}>
        {/*<div className="album__intro__title">
          <AnimatedDiv
            className="album__title_1"
            // style={{ transform: translate3d }}
          >
            self-titled<small>2007</small>
          </AnimatedDiv>
        </div>*/}
        <div className="album__intro__content">
          <img src={PhotoPath('album/img-1-md')} alt="" className="album__photo" />
          <div className="album__intro__title">
            <div
              className="album__title_1"
              // style={{ transform: translate3d }}
            >
              self-titled<small>2007</small>
            </div>
          </div>
          <p className="album__paragraph album__paragraph--intro">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dolor quam, dapibus sed risus eget, euismod dapibus massa. Cras sollicitudin auctor orci, eu sollicitudin erat viverra ut. Proin varius consectetur sapien id ornare. Proin a <Link className="click-through" to="/releases/split">Split</Link> nibh eu nisi feugiat pretium. </p>
          <p className="album__paragraph album__paragraph--intro">Ruismod dapibus massa. Cras sollicitudin auctor orci, eu sollicitudin erat viverra ut. Proin varius consectetur sapien id ornare. Proin a <Link className="click-through" to="/releases/split">Split</Link> nibh eu nisi feugiat pretium. </p>
          <div className="album__intro__labels">
            <p className="album__paragraph album__paragraph--labels album__labels">
              This record was released in France by <strong>STSnework</strong>, in Germany and UK by <strong>Fond Of Life</strong> and in Italia by <strong>Chorus Of One</strong>.
            </p>
            <div className="album__labels album__labels--logos">
              <img src={ImagePath('logo-sts.png')} alt="STSnework logo" className="img__label" />
              <img src={ImagePath('logo-coo.png')} alt="Chorus Of One logo" className="img__label" />
              <img src={ImagePath('logo-fol.png')} alt="Fond Of Life logo" className="img__label" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapAppContextToProps = (state, { offset, factor }) => {
  const { offsetWidth, offsetHeight } = state.getViewPort();

  return {
    left: roundToEven(offsetWidth * offset),
    height: offsetHeight
  }
};

export default withApp(mapAppContextToProps)(SlideIntro);
