import React, { PureComponent } from 'react';
import YouTube from 'react-youtube';
import classNames from 'classnames';
import { HOME_BKGD_VIDEOID } from 'Constants';

class HomeBkgdVideo extends PureComponent {
  state = {
    videoTimeOnPause: 0,
    videoState: this.props.videoState
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { videoTimeOnPause, videoState } = nextProps;

    if (
      videoTimeOnPause !== prevState.videoTimeOnPause &&
      videoTimeOnPause !== null
    )
      return {
        videoTimeOnPause,
        videoState
      };

    if (videoState !== prevState.videoState)
      return {
        videoState
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

  handleOnEnd = e => {
    e.target.playVideo();
  };

  handleOnReady = ({ target }) => {
    target.mute();
    this.props.onReady(target);
  };

  //
  // Renderers
  // --------------------------------------------------

  render() {
    const { videoState, videoPosterDisplayed } = this.props;

    if (videoState !== 'playVideo' && videoPosterDisplayed) {
      // console.log('RESET PLAYER')
      return null;
    }

    // https://codebushi.com/react-youtube-background/
    // https://developers.google.com/youtube/player_parameters
    const videoOptions = {
      playerVars: {
        // start: 16,
        start: this.state.videoTimeOnPause,
        autoplay: videoState === 'playVideo' ? 1 : 0, // Auto-play the video on load
        // autoplay: 1, // Auto-play the video on load
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

    // console.log({start: videoOptions.playerVars.start, autoplay: videoOptions.playerVars.autoplay})
    const className = classNames('home-video', {
      'home-video--ready': true
      // 'home-video--mobile': !showPlayer,
      // 'home-video--paused': playerState === 'pauseVideo'
    });

    return (
      <div className={className}>
        <div className="home-video__background">
          <YouTube
            videoId={HOME_BKGD_VIDEOID}
            opts={videoOptions}
            className="home-video__background__foreground__iframe"
            onPlay={this.props.onPlay}
            onPause={this.props.onPause}
            onReady={this.handleOnReady}
            onEnd={this.handleOnEnd}
            onError={console.log}
            // onStateChange={console.log}
            // onPlaybackRateChange={console.log}
            // onPlaybackQualityChange={console.log}
          />
        </div>
      </div>
    );
  }
}

export default HomeBkgdVideo;
