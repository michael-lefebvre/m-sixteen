import React, { PureComponent } from 'react'
import { Spring, animated, config } from 'react-spring'
import classNames from 'classnames'
import YouTube    from 'react-youtube'
import { withRouter } from "react-router";
import { HotKeys } from "react-hotkeys";
import { getParams, isSectionActive } from 'Utils'
import { withApp } from 'Views/Provider'

import './index.scss'

// const _DEBUG = false;

const getInitialState = (props) => {
  const { id } = getParams(props)
  return {
    wasActive: false,
    prevId: null,
    isActive: isSectionActive(props, 'videos'),
    id: id || null,
    ready: false,
    videoState: 'pause',
  }
}

class Videos extends PureComponent {
  state = getInitialState(this.props);

  _video = null;

  static getDerivedStateFromProps(nextProps, prevState) {
    const isActive = isSectionActive(nextProps, 'videos')
    const { id } = getParams(nextProps)
    if(isActive !== prevState.isActive || id !== prevState.id)
      return {
        wasActive: prevState.isActive,
        prevId: prevState.id,
        id: id || null,
        isActive,
        ready: !isActive ? false : prevState.ready
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
    if(snapshot)
      this._video = null;
  }

  //
  // Helpers
  // --------------------------------------------------

  //
  // Events Handlers
  // --------------------------------------------------

  handleOnClose = () => {
    // if(this.state.videoState === 'play') console.log('pause')
    this.props.history.push('/')
  };

  handleOnReady = ({ target }) => {
    console.log('handleOnReady')
    this._video = target
    this.setState({ ready: true, videoState: 'pause' })
  };

  handleOnClick = () => {
    if(!this._video) return;

    this.setState(({videoState}) => ({ videoState: videoState === 'pause' ? 'play' : 'pause' }))
    // this._video[ this.state.state === 'pause' ? 'playVideo' : 'pauseVideo']()
  };

  //
  // Renderers
  // --------------------------------------------------

  render() {
    const { id/*, prevId*/, isActive, wasActive, ready } = this.state;

    const className = classNames('videos', {
      'videos--active': isActive,
      'videos--closing': wasActive,
      'videos--ready': ready
    })
    // var { width } = document.body.getBoundingClientRect()

    const videoOpts = {
      width:  854,
      height: 480,
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0,        // Auto-play the video on load
        disablekb: 1,
        controls: 1,        // Hide pause/play buttons in player
        showinfo: 0,        // Hide the video title
        modestbranding: 1,  // Hide the Youtube Logo
        loop: 0,            // Run the video in a loop
        fs: 0,              // Hide the full screen button
        autohide: 0,         // Hide video controls when playing
        rel: 0,
        enablejsapi: 1
      }
    }

    const videoId = {
      rouge: 'Fj8WOeQamvw',
      nevers: 'AymtEvBubmQ',
    }[id];

    const legend = {
      rouge: {
        title: '"Rouge" video',
        note: 'A never finished/published video'
      },
      nevers: {
        title: 'Live at Nevers, France',
        note: 'Shooted in october 2008'
      },
    }[id];

    const style = videoId ? { backgroundImage: `url(/static/photos/videos/${id}-md.jpg)` } : {}
// console.log({videoId})
    return (
      <HotKeys
        focused={isActive}
        attach={window}
        keyMap={{
          esc: "esc"
        }}
        handlers={{
          esc: this.handleOnClose
        }}
      >
        <Spring
          native
          config={config[ isActive ? 'slow' : 'stiff']}
          from={{ o: 1, t: 100 }}
          to={{ o: isActive ? 1 : 0, t: isActive ? 0 : 100 }}
          >
          {({ o, t }) => (
            <animated.div className={className}  style={{ opacity: o.interpolate(o => o), transform: t.interpolate(t => `translateY(${t}%)`) }}>
              <div className="videos__close" onClick={this.handleOnClose} />
                <div className="videos__content">
                  <div className="videos__thumb" style={style} onClick={this.handleOnClick}>
                    {isActive && <div className="videos__spinner"><div /><div /><div /><div /></div>}
                  </div>
                  {videoId && (
                    <YouTube
                      containerClassName="videos__player"
                      videoId={videoId}
                      opts={videoOpts}
                      onReady={this.handleOnReady}
                      />
                  )}
                  <div className="videos__legend">
                    <h3>{isActive && legend.title}</h3>
                    <h4>{isActive && legend.note}</h4>
                  </div>
              </div>
            </animated.div>
          )}
        </Spring>
      </HotKeys>
    )
  }
}

export default withRouter(withApp(Videos))
