import React, { Fragment, PureComponent } from 'react';
import { withApp } from 'Hoc';
import { Large, Medium, Small } from './Hero';
import { Poster, Video } from './Bkgd';

let _PLAYER = null;

const getPlayerCurrentTime = () => {
  if (!_PLAYER || !_PLAYER.getCurrentTime) return null;
  return Math.round(_PLAYER.getCurrentTime());
};

class Home extends PureComponent {
  state = {
    machineState: this.props.machineState,
    isMounted: this.props.screenCategory !== 'Large',
    videoState: this.props.videoState,
    screenCategory: this.props.screenCategory,
    videoPosterDisplayed: false,
    videoTimeOnPause: null
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { machineState, screenCategory, videoState } = nextProps;
    const videoPaused =
      prevState.videoState === 'playVideo' && videoState === 'pauseVideo';
    if (_PLAYER && videoPaused) {
      try {
        _PLAYER.pauseVideo();
      } catch (e) {
        console.log(e);
      }
    }
    const videoTimeOnPause = videoPaused
      ? getPlayerCurrentTime()
      : prevState.videoTimeOnPause;

    if (
      machineState !== prevState.machineState ||
      videoState !== prevState.videoState ||
      screenCategory !== prevState.screenCategory ||
      videoTimeOnPause !== prevState.videoTimeOnPause
    )
      return {
        videoTimeOnPause,
        screenCategory,
        videoState,
        machineState
      };

    return null;
  }

  //
  // Life cycle
  // --------------------------------------------------

  // getSnapshotBeforeUpdate(prevProps, prevState) {
  //   return prevState.videoState === 'playVideo' && this.state.videoState === 'pauseVideo'
  // }

  componentDidMount() {
    // console.log('COMPONENTDIDMOUNT', this.state)
    // this.props.onSend('HERO.NEXT');
    this._forceMount();

    // if(this.state.machineState === 'entering' && this.state.screenCategory === 'Large') {
    //   console.log('Trigger send HOME.NEXT')
    //   this.props.onSend('HERO.NEXT');
    // }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log('COMPONENTDIDUPDATE', this.state)
    // this.props.onSend('HERO.NEXT');

    // if (snapshot === true) return this._pauseVideo();

    this._forceMount();
  }

  //
  // Helpers
  // --------------------------------------------------

  _forceMount = () => {
    if (
      this.state.machineState === 'entering' &&
      this.state.screenCategory !== 'Large'
    ) {
      // console.log('_forceMount, Trigger send HOME.NEXT')
      this.props.onSend('HERO.NEXT');
    }
  };

  // _pauseVideo = () => {
  //   const { videoState } = this.state;

  //   if (!_PLAYER || videoState !== 'pauseVideo') return;

  //   try {
  //     _PLAYER.pauseVideo();
  //   } catch (e) {
  //     console.log(e)
  //   }
  //   // console.log('Video Paused')
  // };

  //
  // Events Handlers
  // --------------------------------------------------

  handleOnHeroRest = () => {
    // console.log('handleOnHeroRest')
    this.setState({ isMounted: true }, () => this.props.onNext());
  };

  handleOnPosterRest = () => {
    // console.log('handleOnPosterRest', !this.state.videoPosterDisplayed)
    this.setState(({ videoPosterDisplayed }) => ({
      videoPosterDisplayed: !videoPosterDisplayed
    }));
  };

  handleOnVideoPlay = ({ target }) => {
    console.log('handleOnVideoPlay');
    if (this.state.machineState === 'entering') {
      // console.log('Trigger send HOME.NEXT')
      return this.props.onSend('HERO.NEXT');
    }
    if (
      this.state.videoPosterDisplayed &&
      this.state.videoTimeOnPause !== null
    ) {
      // console.log('reset poster')
      return this.setState({ videoTimeOnPause: null });
    }

    if (this.state.videoState !== 'playVideo') {
      console.log('force pauseVideo');
      target.pauseVideo();
    }
  };

  handleOnVideoPause = () => {
    console.log('handleOnVideoPause');
  };

  handleOnVideoReady = target => {
    console.log('handleOnVideoReady');

    _PLAYER = target;
  };

  handleOnVideoError = () => {
    // console.log('handleOnVideoError')
  };

  //
  // Renderers
  // --------------------------------------------------

  heroRenderer() {
    const {
      machineState: state,
      isMounted: mounted,
      screenCategory
    } = this.state;
    const { onNext } = this.props;

    const props = {
      mounted,
      state,
      onNext,
      onMounted: this.handleOnHeroRest
    };

    switch (screenCategory) {
      case 'Large':
        return <Large {...props} />;
      case 'Medium':
        return <Medium {...props} />;
      default:
        return <Small {...props} />;
    }
  }

  videoRenderer() {
    const { videoState, videoPosterDisplayed, videoTimeOnPause } = this.state;

    return (
      <Video
        onPlay={this.handleOnVideoPlay}
        onPause={this.handleOnVideoPause}
        onReady={this.handleOnVideoReady}
        videoPosterDisplayed={videoPosterDisplayed}
        videoTimeOnPause={videoTimeOnPause}
        videoState={videoState}
      />
    );
  }

  posterRenderer() {
    const { videoState, videoTimeOnPause } = this.state;

    return (
      <Poster
        videoTimeOnPause={videoTimeOnPause}
        onPosterRest={this.handleOnPosterRest}
        videoState={videoState}
      />
    );
  }

  bkgdRenderer() {
    if (this.state.screenCategory !== 'Large') return null;

    return (
      <Fragment>
        {this.posterRenderer()}
        {this.videoRenderer()}
      </Fragment>
    );
  }

  render() {
    if (this.state.machineState === 'idle') return null;

    return (
      <Fragment>
        {this.heroRenderer()}
        {this.bkgdRenderer()}
      </Fragment>
    );
  }
}

const getScreenCategory = ({ device, orientation }) => {
  if (device === 'mobile') return 'Small';
  if (orientation === null && ['desktop', 'laptop'].indexOf(device) !== -1)
    return 'Large';
  return 'Medium';
};

const getVideoState = ({ ready: { home } }) => {
  if (
    ['entering', 'mounted', 'releases_out', 'videos_out'].indexOf(home) !== -1
  )
    return 'playVideo';
  if (['releases_in', 'videos_in'].indexOf(home) !== -1) return 'pauseVideo';
  return 'hideVideo';
};

const mapAppContextToProps = context => {
  const machineState = context.value.ready.home;
  const screenCategory = getScreenCategory(context.context);
  const videoState =
    screenCategory !== 'Large' ? 'hideVideo' : getVideoState(context.value);

  return {
    machineState,
    screenCategory,
    videoState
  };
};

export default withApp(mapAppContextToProps)(Home);
