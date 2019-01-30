import React, { Component } from 'react'
import classNames from 'classnames'
import YouTube from 'react-youtube'
import { withApp } from 'Contexts/App'

import './index.scss'

class HomeBkgd extends Component {

  state = {
    bkgdCanPlay: this.props.bkgdCanPlay,
    showPlayer: this.props.showPlayer,
  };

  _player = null;

  static getDerivedStateFromProps(nextProps, prevState) {
    const { showPlayer, bkgdCanPlay } = nextProps;
    if(showPlayer !== prevState.showPlayer || bkgdCanPlay !== prevState.bkgdCanPlay)
      return {
        bkgdCanPlay,
        showPlayer
      }

    return null;
  }

  //
  // Life cycle
  // --------------------------------------------------

  getSnapshotBeforeUpdate(prevProps, prevState) {
    return prevState.bkgdCanPlay !== this.state.bkgdCanPlay;
  }

  componentDidMount() {
    this._shouldForceOnReady()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot === true && this._player) {
      this._player[ this.state.bkgdCanPlay ? 'playVideo' : 'pauseVideo']()
      return
    }
    this._shouldForceOnReady()
  }

  //
  // Helpers
  // --------------------------------------------------

  _shouldForceOnReady() {
    if (this.state.showPlayer === false && this.props.isReady === false)
      this.props.handleOnReady()
  }

  //
  // Events Handlers
  // --------------------------------------------------

  handleOnEnd = e => {
    e.target.playVideo()
  };

  handleOnReady = ({ target }) => {
    target.mute()
    this._player = target
  };

  handleOnPlay = ({ target }) => {
    this._player = target

    if(this.state.bkgdCanPlay !== true)
      this._player.pauseVideo()

    if(!this.props.isReady)
      this.props.handleOnReady()
  };

  handleOnStateChange = (evt) => (e) => {
    const { data } = e
    console.log({evt, data})
  };

  //
  // Renderers
  // --------------------------------------------------

  playerRenderer() {
    const { showPlayer } = this.state;

    if(!showPlayer) {
      this._player = null;
      return null;
    }

    // https://codebushi.com/react-youtube-background/
    // https://developers.google.com/youtube/player_parameters
    const videoOptions = {
      playerVars: {
        autoplay: 1,       // Auto-play the video on load
        disablekb: 1,
        controls: 0,       // Hide pause/play buttons in player
        showinfo: 0,       // Hide the video title
        modestbranding: 1, // Hide the Youtube Logo
        loop: 1,           // Run the video in a loop
        fs: 0,             // Hide the full screen button
        autohide: 0,       // Hide video controls when playing
        rel: 0,
        enablejsapi: 1
      }
    }

    return (
      <YouTube
       videoId="Pdni_p27l_0"
       opts={videoOptions}
       className="home-video__background__foreground__iframe"
       // onStateChange={this.handleOnStateChange('onStateChange')}
       // onPlaybackRateChange={this.handleOnStateChange('onPlaybackRateChange')}
       // onPlaybackQualityChange={this.handleOnStateChange('onPlaybackQualityChange')}
       onPlay={this.handleOnPlay}
       // onError={this.handleOnStateChange('onError')}
       onReady={this.handleOnReady}
       onEnd={this.handleOnEnd} />
    )
  }

  render() {
    const { showPlayer, bkgdCanPlay } = this.state;

    const className = classNames('home-video', {
      'home-video--mobile': !showPlayer,
      'home-video--paused': showPlayer && !bkgdCanPlay
    })

    return (
      <div className={className}>
        <div className="home-video__background">
        {this.playerRenderer()}
        </div>
      </div>
    )
  }
}

const mapAppContextToProps = state => ({
  bkgdCanPlay: state.bkgdCanPlay(),
  showPlayer: state.hasVideoHeader(),
  // showPlayer: false,
  isReady: state.isReady(),
  handleOnReady: state.onReady,
});

export default withApp(mapAppContextToProps)(HomeBkgd);

