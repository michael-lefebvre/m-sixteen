import React, { Component } from 'react'
import classNames from 'classnames'
import YouTube from 'react-youtube'
import { withApp } from 'Contexts/App'
import { withHome } from 'Contexts/Home'

import './index.scss'

class HomeBkgd extends Component {

  state = {
    playerState: this.props.isReady,
    showPlayer: this.props.showPlayer,
  };

  _player = null;

  static getDerivedStateFromProps(nextProps, prevState) {
    const { showPlayer, playerState } = nextProps;
    if(showPlayer !== prevState.showPlayer || playerState !== prevState.playerState)
      return {
        showPlayer,
        playerState
      }

    return null;
  }

  //
  // Life cycle
  // --------------------------------------------------

  getSnapshotBeforeUpdate(prevProps, prevState) {
    return prevState.playerState !== this.state.playerState;
  }

  componentDidMount() {
    if (this.state.showPlayer === false && this.props.isReady === false)
      this.props.handleOnReady()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot === true && this._player) {
      this._player[ this.state.playerState ? 'playVideo' : 'pauseVideo']()
      return
    }
    if (this.state.showPlayer === false && this.props.isReady === false)
      this.props.handleOnReady()
  }

  //
  // Helpers
  // --------------------------------------------------

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
    // target.pauseVideo()
    this._player = target

    // if(!this.props.isReady)
      this.props.handleOnReady()
  };

  handleOnStateChange = (evt) => (e) => {
    const { data } = e
    console.log({evt, data})
  };

  //
  // Renderers
  // --------------------------------------------------

  render() {
    const { showPlayer, playerState } = this.state;

    // https://codebushi.com/react-youtube-background/
    // https://developers.google.com/youtube/player_parameters
    const videoOptions = {
      playerVars: {
        autoplay: (!!showPlayer && playerState), // Auto-play the video on load
        disablekb: 1,
        controls: 0,                             // Hide pause/play buttons in player
        showinfo: 0,                             // Hide the video title
        modestbranding: 1,                       // Hide the Youtube Logo
        loop: 1,                                 // Run the video in a loop
        fs: 0,                                   // Hide the full screen button
        autohide: 0,                             // Hide video controls when playing
        rel: 0,
        enablejsapi: 1
      }
    }

    const className = classNames('landing', {
      'landing--mobile': !showPlayer,
      'landing--paused': showPlayer && !playerState
    })

    return (
      <div className={className}>
        <div className="landing__background">
        {showPlayer && (
          <YouTube
           videoId="Pdni_p27l_0"
           opts={videoOptions}
           className="landing__background__foreground__iframe"
           // onStateChange={this.handleOnStateChange('onStateChange')}
           // onPlaybackRateChange={this.handleOnStateChange('onPlaybackRateChange')}
           // onPlaybackQualityChange={this.handleOnStateChange('onPlaybackQualityChange')}
           onPlay={this.handleOnPlay}
           // onError={this.handleOnStateChange('onError')}
           onReady={this.handleOnReady}
           onEnd={this.handleOnEnd} />
        )}
        </div>
      </div>
    )
  }
}

const mapAppContextToProps = state => ({
  // showPlayer: false, // state.hasVideoHeader(),
  showPlayer: state.hasVideoHeader(),
  isReady: state.isReady(),
  handleOnReady: state.onReady
});
const mapHomeContextToProps = ({ isCurrentSection }) => ({
  playerState: isCurrentSection
});

export default withApp(mapAppContextToProps)(withHome(mapHomeContextToProps)(HomeBkgd));

