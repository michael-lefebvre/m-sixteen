import React, { PureComponent, Fragment } from 'react';
import { Keyframes, animated } from 'react-spring';
import classNames from 'classnames';
import YouTube from 'react-youtube';
import { withApp } from 'Hoc';
import { getHomeUrl } from 'Utils';
import { HOME_BKGD_VIDEOID } from 'Constants';

import './index.scss';

const _DEBUG = true;

const Poster = Keyframes.Spring({
  playVideo: { opacity: 0 },
  pauseVideo: { opacity: 1 }
});

const getInitialState = ({ state }) => {
  const showPlayer = ['idle', 'mounted'].indexOf(state) === -1;

  return {
    videoPlaying: false,
    posterDisplayed: false,
    wasPlaying: false,
    currentTime: null,
    ready: false,
    playerState: showPlayer ? state : null,
    showPlayer
  };
};

class HomeBkgd extends PureComponent {
  state = getInitialState(this.props);

  _player = null;

  static getDerivedStateFromProps(nextProps, prevState) {
    const { showPlayer, playerState } = getInitialState(nextProps);

    if (
      showPlayer !== prevState.showPlayer ||
      playerState !== prevState.playerState
    )
      return {
        wasPlaying: prevState.playerState === 'playVideo',
        // currentTime: playerState === 'playVideo' && prevState.playerState === 'pauseVideo' ? null : prevState.currentTime,
        playerState,
        showPlayer
      };

    return null;
  }

  //
  // Life cycle
  // --------------------------------------------------

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // console.log({getSnapshotBeforeUpdate: this._getCurrentTime()})
    return prevState.playerState !== this.state.playerState;
  }

  componentDidMount() {
    this._shouldForceOnReady();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot === true) return this._togglePlayer();

    this._shouldForceOnReady();
  }

  //
  // Helpers
  // --------------------------------------------------

  _getCurrentTime() {
    if (!this._player || !this._player.getCurrentTime) return null;
    return Math.round(this._player.getCurrentTime());
  }

  _shouldForceOnReady() {
    if (this.props.state === 'mounted' && this._hasNext()) {
      this.props.onSend('HERO.NEXT');
    }
  }

  _togglePlayer() {
    const { playerState } = this.state;

    if (!this._player || !playerState) return;

    try {
      this._player[playerState]();
    } catch (e) {
      // console.log(e)
    }
  }

  _hasNext = () => this.props.getNextEvents().indexOf('HERO.NEXT') !== -1;

  //
  // Events Handlers
  // --------------------------------------------------

  handleOnEnd = e => {
    e.target.playVideo();
  };

  handleOnReady = ({ target }) => {
    target.mute();
    this._player = target;
    // this.setState({ ready: true });
  };

  handleOnPlay = ({ target }) => {
    this._player = target;

    if (this.state.playerState !== 'playVideo') this._player.pauseVideo();

    if (this._hasNext()) {
      this.props.onSend('HERO.NEXT');
      // target.pauseVideo()
    }
    if (!this.state.ready) {
      this.setState({ ready: true });
    }
  };

  handleOnPause = () => {
    this.setState({ currentTime: this._getCurrentTime() });
  };

  //
  // Renderers
  // --------------------------------------------------

  playerRenderer() {
    const { showPlayer, currentTime, posterDisplayed } = this.state;

    // if (!showPlayer) {
    if (!showPlayer || posterDisplayed) {
      this._player = null;
      return null;
    }

    // https://codebushi.com/react-youtube-background/
    // https://developers.google.com/youtube/player_parameters
    const videoOptions = {
      playerVars: {
        // start: 16,
        start: currentTime || 0,
        autoplay: 1, // Auto-play the video on load
        disablekb: 1,
        controls: 0, // Hide pause/play buttons in player
        showinfo: 0, // Hide the video title
        modestbranding: 1, // Hide the Youtube Logo
        loop: 1, // Run the video in a loop
        fs: 0, // Hide the full screen button
        autohide: 0, // Hide video controls when playing
        rel: 0,
        enablejsapi: 1
      }
    };
    // console.log({currentTime})
    return (
      <YouTube
        videoId={HOME_BKGD_VIDEOID}
        opts={videoOptions}
        className="home-video__background__foreground__iframe"
        // onStateChange={this.handleOnStateChange('onStateChange')}
        // onPlaybackRateChange={this.handleOnStateChange('onPlaybackRateChange')}
        // onPlaybackQualityChange={this.handleOnStateChange('onPlaybackQualityChange')}
        onPlay={this.handleOnPlay}
        onPause={this.handleOnPause}
        // onError={this.handleOnStateChange('onError')}
        onReady={this.handleOnReady}
        onEnd={this.handleOnEnd}
      />
    );
  }

  miniDebugRenderer() {
    if (!_DEBUG) return null;

    return (
      <div className="mini-debug">
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
      </div>
    );
  }

  posterRenderer() {
    const { videoPlaying, currentTime, playerState, ready } = this.state;

    // if( !currentTime || videoPlaying ) return null;

    // const playerCurrentTime = this._getCurrentTime()
    const style = {
      backgroundImage: currentTime
        ? `url(${getHomeUrl(`bkgd/${currentTime}.jpg`)})`
        : 'none',
      zIndex: 0
    };

    const posterDisplayed = currentTime && playerState === 'pauseVideo';

    console.log({
      playerState,
      currentTime,
      posterDisplayed,
      ready,
      _player: this._player && this._player.getPlayerState()
    });

    // const state = !currentTime && playerState === 'playVideo' ?

    return (
      <Poster
        native
        state={playerState}
        onRest={() => this.setState({ posterDisplayed })}
      >
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

  render() {
    if (this.props.state === 'idle') return this.miniDebugRenderer();

    const { showPlayer, playerState, ready } = this.state;

    const className = classNames('home-video', {
      'home-video--ready': !showPlayer || ready,
      'home-video--mobile': !showPlayer
      // 'home-video--paused': playerState === 'pauseVideo'
    });

    return (
      <Fragment>
        {this.posterRenderer()}
        <div className={className}>
          <div className="home-video__background">{this.playerRenderer()}</div>
        </div>
        {this.miniDebugRenderer()}
      </Fragment>
    );
  }
}

const mapAppContextToProps = context => ({
  state: context.value.ready.home.bkgd
});

export default withApp(mapAppContextToProps)(HomeBkgd);
