import React, { PureComponent } from 'react';
import { Controller, config } from 'react-spring';
import { AnimatedDiv } from 'Utils';
import Cover from '../Cover';
import Intro from './Intro';
import Record from './Record';
import Tracks from './Tracks';

import './index.scss';

const TOTAL_SLIDES = 5;
const SLIDES_ARR = Array(TOTAL_SLIDES)
  .fill()
  .map((x, i) => i);
const SLIDES_SPEED = 0.7;

const _setPosition = scrollTop => ({
  translate: parseFloat(-(scrollTop * SLIDES_SPEED)),
  config: config.slow
});

class ReleaseAlbumStory extends PureComponent {
  controller = new Controller(_setPosition(0));

  static getDerivedStateFromProps(nextProps, prevState) {
    const { displayStory, displayBkgd } = nextProps;
    if (
      prevState.displayBkgd !== displayBkgd ||
      prevState.displayStory !== displayStory
    )
      return {
        displayBkgd,
        displayStory
      };

    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      displayStory: props.displayStory,
      displayBkgd: props.displayBkgd
    };
  }

  //
  // Life cycle
  // --------------------------------------------------

  componentDidMount() {
    this.props.onMounted(this);
  }

  //
  // Helpers
  // --------------------------------------------------

  setPosition(scrollTop) {
    this.controller.update(_setPosition(scrollTop));
  }

  //
  // Events Handlers
  // --------------------------------------------------

  // handleOnScroll = (e) => {
  //   const {
  //     currentTarget: { scrollTop }
  //   } = e;
  //   // const to = scrollTop / this.props.width
  //   this.controller.update(_setPosition(scrollTop))
  //   // this.props.onScroll( scrollTop )
  // };

  //
  // Renderers
  // --------------------------------------------------

  render() {
    const { displayBkgd /*displayStory, width, height*/ } = this.state;

    if (!displayBkgd) return null;

    const translate3d = this.controller.interpolations.translate.interpolate(
      x => `translate3d(${x}px,0,0)`
    );

    return (
      <div className="release__story release__story--album">
        <div
          className="release__story__scroller"
          // ref={this._scroller}
          onScroll={this.props.onScroll}
        >
          <div className="slides">
            {SLIDES_ARR.map((s, i) => (
              <div className="slide" key={`album__scroller_slide__${i}`} />
            ))}
          </div>
        </div>
        <AnimatedDiv
          className="release__story__content"
          style={{ transform: translate3d }}
        >
          <Cover onRest={this.props.onRest} factor={0.8} />
          <Intro onMounted={this.props.onMounted} factor={0.6} offset={0.8} />
          <Record offset={1} />
          <Tracks />
        </AnimatedDiv>
      </div>
    );
  }
}

export default ReleaseAlbumStory;
