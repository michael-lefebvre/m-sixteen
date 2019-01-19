import React, { PureComponent } from 'react'
import classNames from 'classnames'
import YouTube    from 'react-youtube'
import Layer from 'Components/Layer';
import { withApp } from 'Contexts/App'

import './index.scss'

const getInitialState = ({ isActive, videoId }) => ({
  ready: false,
  videoState: 'pause',
  wasActive: false,
  prevId: null,
  isActive,
  videoId,
})

class Videos extends PureComponent {
  state = getInitialState(this.props);

  _player = null;

  _videoOpts = {
    width:  854,
    height: 480,
    playerVars: { // https://developers.google.com/youtube/player_parameters
      autoplay: 0,        // Auto-play the video on load
      disablekb: 1,
      controls: 0,                             // Hide pause/play buttons in player
      showinfo: 0,                             // Hide the video title
      modestbranding: 1,                       // Hide the Youtube Logo
      loop: 0,                                 // Run the video in a loop
      fs: 0,                                   // Hide the full screen button
      autohide: 0,                             // Hide video controls when playing
      rel: 0,
      enablejsapi: 1
    }
  };

  _videoIds = {
    rouge: 'Fj8WOeQamvw',
    nevers: 'AymtEvBubmQ',
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { videoId, isActive } = nextProps;
    if(isActive !== prevState.isActive || videoId !== prevState.videoId)
      return {
        prevId: prevState.videoId,
        wasActive: prevState.isActive,
        isActive,
        videoId,
      }

    return null;
  }

  //
  // Life cycle
  // --------------------------------------------------

  getSnapshotBeforeUpdate(prevProps, prevState) {
    return prevState.isActive && !this.state.isActive;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(snapshot) {
      this._player = null;
      this.setState(getInitialState({videoId: null, isActive: false }))
    }
  }

  //
  // Helpers
  // --------------------------------------------------

  _getId() {
    const { videoId, prevId, isActive, wasActive } = this.state;
    if(!isActive && !wasActive) return null;
    return isActive ? videoId : prevId;
  }

  //
  // Events Handlers
  // --------------------------------------------------

  handleOnClose = () => {
    this.props.history.push('/')
  };

  handleOnReady = ({ target }) => {
    console.log('handleOnReady')
    this._player = target
    this.setState({ ready: true, videoState: 'pause' })
  };

  handleOnClick = () => {
    if(!this._player) return;
    const videoState = this.state.videoState === 'pause' ? 'play' : 'pause';

    this.setState({videoState}, () => this._player[ videoState === 'pause' ? 'pauseVideo' : 'playVideo']());
  };

  //
  // Renderers
  // --------------------------------------------------

  playerRenderer() {
    const { videoId, isActive } = this.state;
    if(!isActive) return null;

    return (
      <YouTube
        containerClassName="videos__player"
        videoId={this._videoIds[videoId]}
        opts={this._videoOpts}
        onReady={this.handleOnReady}
        // onError={console.log}
        // onStateChange={console.log}
        // onPlaybackRateChange={console.log}
        // onPlaybackQualityChange={console.log}
        // onPlay={console.log}
      />
    );
  }

  thumbRenderer() {
    const { isActive, videoState } = this.state;
    const id = this._getId();
    if(!id) return null;
    const isPayling = videoState === 'play';
    const style = {
      backgroundImage: `url(/static/photos/videos/${id}-md.jpg)`,
      opacity: isPayling ? 0 : 1,
      pointerEvents: isPayling ? 'none' : 'auto'
    }

    return (
      <div className="videos__thumb" style={style} onClick={this.handleOnClick}>
        {isActive && <div className="videos__spinner"><div /><div /><div /><div /></div>}
      </div>
    )
  }

  render() {
    const { isActive, wasActive, ready } = this.state;

    const className = classNames('videos', {
      'videos--active': isActive,
      'videos--closing': wasActive,
      'videos--ready': ready
    })

    return (
      <Layer section="videos">
        <div className={className}>
          <div className="videos__close" onClick={this.handleOnClose} />
          <div className="videos__content">
            {this.thumbRenderer()}
            {this.playerRenderer()}
          </div>
        </div>
      </Layer>
    )
  }
}

const mapContextToProps = state => ({
  ready: state.isReady(),
  isActive: state.currentSection === "videos",
  videoId: state.currentId,
  history: state.getHistory()
});

export default withApp(mapContextToProps)(Videos);

