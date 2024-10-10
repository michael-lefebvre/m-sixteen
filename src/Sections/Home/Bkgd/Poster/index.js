import React, { PureComponent } from 'react';
import { Keyframes, animated } from 'react-spring';
import { getHomeUrl } from 'Utils';

const Poster = Keyframes.Spring({
  playVideo: { opacity: 0 },
  pauseVideo: { opacity: 1 }
});

class HomeBkgdPoster extends PureComponent {
  state = {
    videoTimeOnPause: this.props.videoTimeOnPause
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { videoTimeOnPause } = nextProps;

    if (
      videoTimeOnPause !== null &&
      videoTimeOnPause !== prevState.videoTimeOnPause
    )
      return {
        videoTimeOnPause
      };

    return null;
  }

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
    const { videoState, videoTimeOnPause: timeOnPause } = this.props;
    const { videoTimeOnPause } = this.state;

    const style = {
      backgroundImage: videoTimeOnPause
        ? `url(${getHomeUrl(`bkgd/${videoTimeOnPause}.jpg`)})`
        : 'none',
      // position: 'static',
      // height: 100,
      // width: 100,
      zIndex: 0
    };

    const posterState =
      videoState === 'playVideo' && timeOnPause === null
        ? 'playVideo'
        : 'pauseVideo';
    // console.log({posterState, timeOnPause, videoState, videoTimeOnPause})
    return (
      <Poster native state={posterState} onRest={this.props.onPosterRest}>
        {({ opacity }) => (
          <animated.div
            className="home-video home-video--ready home-video--paused"
            style={{
              opacity: opacity.interpolate(o => o),
              ...style
            }}
          />
        )}
      </Poster>
    );
  }
}

export default HomeBkgdPoster;
