import React, { PureComponent } from 'react'
import classNames from 'classnames'
import YouTube from 'react-youtube'
import { withApp } from 'Hoc'
import { HOME_BKGD_VIDEOID } from 'Constants'

import './index.scss'

class HomeBkgd extends PureComponent {

  state = {
    bkgdCanPlay: this.props.bkgdCanPlay(),
    showPlayer: this.props.hasVideoHeader(),
  };

  _player = null;

  _sendNext = false;

  static getDerivedStateFromProps(nextProps, prevState) {
    const showPlayer = nextProps.hasVideoHeader();
    const bkgdCanPlay = nextProps.bkgdCanPlay();

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
    if (this.props.state === "mounted" && !this._sendNext) {
      console.log('_shouldForceOnReady')
      this._sendNext = true
      this.props.onSend('HERO.NEXT')
    }
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

    if(!this.props.isIdle && !this._sendNext){
      // console.log('onSend')
      this._sendNext = true;
      this.props.onSend('HERO.NEXT')
    }
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
      this._sendNext = false;
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
       videoId={HOME_BKGD_VIDEOID}
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

const mapAppContextToProps = context => ({
  isIdle: context.matches('ready.home.bkgd.idle'),
  state: context.value.ready.home.bkgd
  // bkgdCanPlay: state.bkgdCanPlay(),
  // showPlayer: state.hasVideoHeader(),
  // showPlayer: false,
});

export default withApp(mapAppContextToProps)(HomeBkgd);

