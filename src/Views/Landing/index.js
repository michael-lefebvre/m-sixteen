import React from 'react'
import classNames from 'classnames'
import YouTube from 'react-youtube'
import { withApp } from 'Views/Provider'

import './styles.scss'

class Landing extends React.Component {

  //
  // Life cycle
  // --------------------------------------------------

  componentDidMount() {

    // const { isDesktop } = this.props;
  }

  shouldComponentUpdate() {
    return false
  }

  handleOnEnd = e => {
    e.target.playVideo()
  };

  handleOnReady = (e) => {
    e.target.mute()
  };

  handleOnPlay = ({ target }) => {
    // target.pauseVideo()

    if(typeof this.props.landingReady === 'function')
      return this.props.landingReady({ target })
  };

  handleOnStateChange = (evt) => (e) => {
    const { data } = e
    console.log({evt, data})
  };

  render() {
    const { isDesktop } = this.props;
    // https://codebushi.com/react-youtube-background/
    // https://developers.google.com/youtube/player_parameters
    const videoOptions = {
      playerVars: {
        autoplay: !!isDesktop,        // Auto-play the video on load
        disablekb: 1,
        controls: 0,        // Hide pause/play buttons in player
        showinfo: 0,        // Hide the video title
        modestbranding: 1,  // Hide the Youtube Logo
        loop: 1,            // Run the video in a loop
        fs: 0,              // Hide the full screen button
        autohide: 0,         // Hide video controls when playing
        rel: 0,
        enablejsapi: 1
      }
    }

    const className = classNames('landing', {
      'landing--mobile': !isDesktop
    })

    return (
      <div className={className}>
        <div className="landing__background">
        {isDesktop && (
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

export default withApp( Landing )
