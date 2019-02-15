import React, { PureComponent } from 'react'
import classNames from 'classnames'
import YouTube from 'react-youtube'
import { withApp } from 'Hoc'
import { HOME_BKGD_VIDEOID } from 'Constants'

import './index.scss'

const getInitialState = ({ state }) => {

  const showPlayer = ['idle', 'mounted'].indexOf(state) === -1;

  return {
    playerState: showPlayer ? state : null,
    showPlayer
  }
};

class HomeBkgd extends PureComponent {

  state = getInitialState(this.props);

  _player = null;

  static getDerivedStateFromProps(nextProps, prevState) {
    const { showPlayer, playerState } = getInitialState(nextProps);

    if(showPlayer !== prevState.showPlayer || playerState !== prevState.playerState )
      return {
        playerState,
        showPlayer
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
    this._shouldForceOnReady()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(this._player)
    if (snapshot === true)
      return this._togglePlayer()

    this._shouldForceOnReady()
  }

  //
  // Helpers
  // --------------------------------------------------

  _shouldForceOnReady() {
    if (this.props.state === "mounted" && this._hasNext()) {
      this.props.onSend('HERO.NEXT')
    }
  }

  _togglePlayer() {
    const { playerState } = this.state

    if (!this._player || !playerState) return

    try {
      this._player[playerState]()
    }
    catch( e ) {
      // console.log({snapshot, playerState})
      // console.log(this._player)
      console.log(e)
    }
  }

  _hasNext = () => this.props.getNextEvents().indexOf('HERO.NEXT') !== -1;

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

    if(this.state.playerState !== 'playVideo')
      this._player.pauseVideo()

    if(this._hasNext()){
      this.props.onSend('HERO.NEXT')
    }
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
    if(this.props.state === 'idle')
      return null

    const {showPlayer, playerState } = this.state;

    const className = classNames('home-video', {
      'home-video--mobile': !showPlayer,
      'home-video--paused': playerState === 'pauseVideo'
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
  state: context.value.ready.home.bkgd
});

export default withApp(mapAppContextToProps)(HomeBkgd);

