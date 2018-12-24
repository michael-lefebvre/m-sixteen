import React, { PureComponent } from 'react'
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
  }
}

class Videos extends PureComponent {
  state = getInitialState(this.props);

  static getDerivedStateFromProps(nextProps, prevState) {
    const isActive = isSectionActive(nextProps, 'videos')
    const { id } = getParams(nextProps)
    if(isActive !== prevState.isActive || id !== prevState.id)
      return {
        wasActive: prevState.isActive,
        prevId: prevState.id,
        id: id || null,
        isActive,
      }
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

  handleOnClose = () => {
    this.props.history.push('/')
  };

  //
  // Renderers
  // --------------------------------------------------

  render() {
    const { id, prevId, isActive, wasActive } = this.state;

    const className = classNames('videos', {
      'videos--active': isActive,
      'videos--closing': wasActive,
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
    }[id || prevId];
// console.log({videoId})
    return (
      <HotKeys
        focused={isActive}
        attach={window}
        className={className}
        // style={{ backgroundImage: `url(/static/photos/videos/${id}-md.jpg)` }}
        keyMap={{
          esc: "esc"
        }}
        handlers={{
          esc: this.handleOnClose
        }}
      >
        <div className="videos__close" onClick={this.handleOnClose} />
        { videoId && (
          <div className="videos__content" style={{ backgroundImage: `url(/static/photos/videos/${id}-md.jpg)` }}>
            <YouTube videoId={videoId} opts={videoOpts} />
          </div>
        )}
      </HotKeys>
    )
  }
}

export default withRouter(withApp(Videos))
