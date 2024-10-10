import React, { Component } from 'react';
import { withApp } from 'Hoc';

const _hasVideo = ({ context: { device, orientation }, value }) =>
  ['idle', 'mounted'].indexOf(value.ready.home) === -1 &&
  ['desktop', 'laptop'].indexOf(device) !== -1 &&
  orientation === null;

const _videoState = ({
  context: {
    section: { current }
  }
}) => (current === 'home' ? 'playVideo' : 'pauseVideo');

const getInitialContext = () => ({
  // isHome: false,
  hasVideo: false,
  // homeState: 'idle',
  // bkgdState: 'idle',
  // playerIsReady: false,
  videoState: null,
  videoCurrentTime: null,
  posterDisplayed: false
});

export const BkgdContext = React.createContext(getInitialContext());

export const { Provider, Consumer } = BkgdContext;

let _PLAYER = null;

const _getPlayerCurrentTime = () => {
  if (!_PLAYER || !_PLAYER.getCurrentTime) return null;
  return Math.round(_PLAYER.getCurrentTime());
};

class Bkgd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // ...getInitialContext(),
      // isHome: props.isHome,
      hasVideo: props.hasVideo,
      videoState: props.videoState,
      videoCurrentTime: null,
      posterDisplayed: false,
      // homeState: props.homeState,
      // bkgdState: props.bkgdState,
      onPlayerReady: this.handleOnPlayerReady,
      onVideoPlay: this.handleOnPlay,
      onVideoPause: this.handleOnPause,
      onPosterRest: this.handleOnPosterRest
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { hasVideo, videoState } = nextProps;
    const videoCurrentTime =
      videoState === 'pauseVideo' && prevState.videoCurrentTime === null
        ? _getPlayerCurrentTime()
        : prevState.videoCurrentTime;
    // : prevState.posterDisplayed ? prevState.videoCurrentTime : null;

    // console.log({videoCurrentTime})
    // const hasVideo = _hasVideo(nextProps)
    // const { homeState, bkgdState, isHome } = nextProps;
    // const playerIsReady = hasVideo && prevState.playerIsReady
    // const videoState = _videoState(nextProps)

    if (hasVideo !== prevState.hasVideo || videoState !== prevState.videoState)
      return {
        videoCurrentTime,
        videoState,
        hasVideo
      };

    return null;
  }

  //
  // Life cycle
  // --------------------------------------------------

  //
  // Helpers
  // --------------------------------------------------

  _hasNext = () => this.props.getNextEvents().indexOf('HERO.NEXT') !== -1;

  //
  // Events Handlers
  // --------------------------------------------------

  handleOnNext = () => {
    if (this._hasNext()) {
      console.log('_HASNEXT');
      this.props.onSend('HERO.NEXT');
    }
  };

  handleOnPosterRest = () => {
    console.log('handleOnPosterRest', !this.state.posterDisplayed);
    this.setState(({ posterDisplayed }) => ({
      posterDisplayed: !posterDisplayed
    }));
  };

  handleOnPlayerReady = ({ target }) => {
    target.mute();
    _PLAYER = target;
    // this.setState({ playerIsReady: true })
  };

  handleOnPlay = () => {
    console.log('handleOnPlay');
    if (this.state.videoCurrentTime !== null)
      this.setState({ videoCurrentTime: null }, this.handleOnNext);
    //   console.log('handleOnPlay ELSE')
    else this.handleOnNext();
    // }
  };

  handleOnPause = ({ videoCurrentTime }) => {
    console.log('handleOnPause');
    // if (this.state.videoCurrentTime === null)
    //   this.setState({ videoCurrentTime, videoState: 'pauseVideo' })
  };

  //
  // Renderers
  // --------------------------------------------------

  render() {
    // console.log(this.props)
    // console.log(this.state)
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

const mapAppContextToProps = context => ({
  videoState: _videoState(context),
  hasVideo: _hasVideo(context)
  // isHome: context.context.section.current === 'home',
  // homeState: context.value.ready.home.hero,
  // bkgdState: context.value.ready.home.bkgd,
  // device: context.context.device,
  // orientation: context.context.orientation,
});

export default withApp(mapAppContextToProps)(Bkgd);
