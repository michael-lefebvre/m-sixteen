import React, { PureComponent } from 'react';
import { Keyframes, animated, interpolate } from 'react-spring';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';
import classNames from 'classnames';
import { VideoContext } from 'Contexts';
import { getInitialContext } from 'Contexts/Video';
import { withApp } from 'Hoc';
import { VIDEOS } from 'Constants';
import Thumb from './Thumb';
import Legend from './Legend';
import NextLink from './Next';

import './index.scss';

const _defaultProps = { b: 500, s: 1, t: 5, o: 0 };
const _mountedProps = { b: 100, s: 1, t: 0, o: 1 };

const VideoSpring = Keyframes.Spring({
  idle: { immediate: true, from: _defaultProps, to: _defaultProps },
  entering: { to: _mountedProps, from: _defaultProps },
  // mounted: { s: 1, t: 0, o: 1 },
  leaving: _defaultProps
});

const getId = ({ current, next, previous }) =>
  current || previous || next || null;

const getInitialState = ({ state, videoId }) => ({
  ...getInitialContext(),
  videoId,
  state
});

class Videos extends PureComponent {
  state = getInitialState(this.props);

  _player = null;

  _videoOpts = {
    width: 854,
    height: 480,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0, // Auto-play the video on load
      disablekb: 1,
      controls: 0, // Hide pause/play buttons in player
      showinfo: 0, // Hide the video title
      modestbranding: 1, // Hide the Youtube Logo
      loop: 0, // Run the video in a loop
      fs: 0, // Hide the full screen button
      autohide: 2, // Hide video controls when playing
      rel: 0,
      enablejsapi: 1
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { videoId, state, isMounted } = nextProps;

    if (prevState.playerState === 'playVideo' && !isMounted)
      return getInitialState(nextProps);

    if (videoId !== prevState.videoId)
      return {
        playState: 'pauseVideo',
        videoId
      };
    // return getInitialState(nextProps)

    if (state !== prevState.state)
      return {
        state
      };

    return null;
  }

  //
  // Life cycle
  // --------------------------------------------------

  //
  // Helpers
  // --------------------------------------------------

  _setPlayerState = playerState => this.setState({ playerState });

  //
  // Events Handlers
  // --------------------------------------------------

  handleOnRest = () => {
    this.props.onNext();
  };

  handleOnReady = ({ target }) => {
    this._player = target;
    this.setState({ playerReady: true, playerState: 'pauseVideo' });
  };

  handleOnClick = () => {
    if (!this._player || !this.state.playerReady) return;

    this._player.playVideo();

    // const playerState = this.state.playerState === 'pauseVideo' ? 'playVideo' : 'pauseVideo';

    // this.setState({playerState}, () => this._player[playerState]());
  };

  handleOnPlay = () => {
    this._setPlayerState('playVideo');
  };

  handleOnPause = () => {
    this._setPlayerState('pauseVideo');
  };

  //
  // Renderers
  // --------------------------------------------------

  playerRenderer() {
    if (!this.props.isMounted) return null;

    return (
      <YouTube
        containerClassName="videos__player"
        videoId={VIDEOS[this.state.videoId].videoId}
        opts={this._videoOpts}
        onReady={this.handleOnReady}
        // onError={console.log}
        // onStateChange={console.log}
        // onPlaybackRateChange={console.log}
        // onPlaybackQualityChange={console.log}
        onPlay={this.handleOnPlay}
        onPause={this.handleOnPause}
      />
    );
  }

  render() {
    const { state, playerReady } = this.state;

    const className = classNames('videos', {
      'videos--mounted': this.props.isMounted,
      'videos--ready': playerReady
    });

    return (
      <VideoContext.Provider value={this.state}>
        <VideoSpring native state={state} onRest={this.handleOnRest}>
          {({ b, o, s, t }) => (
            <animated.div
              style={{ backgroundSize: b.interpolate(t => `${t}% ${t}%`) }}
              className={className}
            >
              <Link className="videos__close" to="/" />
              <animated.div
                className="videos__content"
                style={{
                  opacity: o.interpolate(o => o),
                  transform: interpolate(
                    [s, t],
                    (s, t) => `scale(${s}) translateY(${t}%)`
                  )
                }}
              >
                <Thumb onClick={this.handleOnClick} />
                {this.playerRenderer()}
                <div className="videos__legend">
                  <Legend />
                  <NextLink />
                </div>
              </animated.div>
            </animated.div>
          )}
        </VideoSpring>
      </VideoContext.Provider>
    );
  }
}

const mapContextToProps = context => ({
  isActive: !context.matches('ready.videos.idle'),
  isMounted: context.matches('ready.videos.mounted'),
  videoId:
    getId(context.context.section) === 'videos'
      ? getId(context.context.id)
      : null,
  state: context.value.ready.videos
});

export default withApp(mapContextToProps)(Videos);
