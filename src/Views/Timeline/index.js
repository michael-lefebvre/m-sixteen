import React, { Component } from 'react'
// import TrackVisibility          from 'react-on-screen'
// import { findDOMNode }          from 'react-dom'
// import classNames               from 'classnames'
// import Inertia                  from 'wheel-inertia'

import Debug                     from 'Views/Debug'
// import Image                     from 'Views/Image'
import Landing                   from 'Views/Landing'
import Headers                  from 'Views/Headers'
// import Home                   from 'Views/Home'
// import Page                   from 'Views/Page'
import Pages                    from 'Views/Pages'
import Video                    from 'Views/Video'

import './styles.css'


class Index extends Component
{
  constructor( props )
  {
    super( props )

    this.handleOnResize       = this.handleOnResize.bind( this )
    this.handleOnNavigate     = this.handleOnNavigate.bind( this )
    this.handleOnHeaderReady  = this.handleOnHeaderReady.bind( this )
    this.handleOnLandingReady = this.handleOnLandingReady.bind( this )
    this.handleOnOpenVideo    = this.handleOnOpenVideo.bind( this )
    this.handleOnCloseVideo   = this.handleOnCloseVideo.bind( this )

    this.state = {
        currentView:    0
      , previousView:   null
      , backgroundView: null
      , landingVideo:   null
      , screenHeight:   null
      , screenWidth:    null
      , screenRatio:    null
      , lineLandscape:  null
      , linePortrait:   null
      , imgLandscape:   null
      , imgPortrait:    null
      , video:          null
    }
  }

  //
  // Life cycle
  // --------------------------------------------------

  componentWillMount()
  {
    window.scrollTo(0, 0)

    this._setHeight()
  }

  componentDidMount()
  {
    window.addEventListener('resize', this.handleOnResize, { passive: true } )

    // window.scrollTo(0, 0)
    // this.setState({ appReady: true })
  }

  //
  // Helpers
  // --------------------------------------------------

  _setHeight()
  {
    var { height, width } = document.body.getBoundingClientRect()

    if( width > 1280 )
      width = 1280

    width = width - 40 // container margin*2

    var roundToEven = n => ( 2 * Math.round( n / 2 ) )

    var lineLandscapeHeight = roundToEven( ( 400 / 600 ) * ( width * 0.5 ) )
      , linePortraitHeight  = roundToEven( ( 600 / 400 ) * ( width * 0.33 ) )
      , imgLandscapeWidth   = roundToEven( lineLandscapeHeight * 1.5 )
      , imgPortraitWidth    = roundToEven( linePortraitHeight * 0.75 )

    var lineLandscape = { height: lineLandscapeHeight }
      , linePortrait  = { height: linePortraitHeight }
      , imgLandscape  = { height: lineLandscapeHeight, width: imgLandscapeWidth }
      , imgPortrait   = { height: linePortraitHeight, width: imgPortraitWidth }
      , screenHeight  = roundToEven( height * 1.01 )
      , screenWidth   = width
      , screenRatio   = width/height

    this.setState({ screenHeight, screenWidth, screenRatio, lineLandscape, linePortrait, imgLandscape, imgPortrait })
  }

  _setLandingVideo( status )
  {
    const { landingVideo } = this.state

    if( !landingVideo )
      return

    landingVideo[ status ? 'playVideo' : 'pauseVideo' ]()
  }

  //
  // Handlers
  // --------------------------------------------------

  handleOnResize( e )
  {
    this._setHeight()
  }

  handleOnNavigate( pageId, isVisible )
  {
    const { currentView, previousView } = this.state

    var nextState = null

    if( isVisible )
      nextState = { currentView: pageId, previousView: currentView, backgroundView: currentView }
    else
    {
      if( pageId === previousView )
        return

      if( pageId === currentView )
        nextState = { currentView: previousView, previousView: pageId, backgroundView: pageId }
    }

    if( !nextState )
      return

    this._setLandingVideo( nextState.currentView === 0 )

    this.setState( nextState )
  }

  handleOnHeaderReady()
  {
    this.setState({ backgroundView: null })
  }

  handleOnLandingReady({ target })
  {
    this.setState({ landingVideo: target })
  }

  handleOnOpenVideo( video )
  {
    this.setState({ video })
  }

  handleOnCloseVideo()
  {
    this.setState({ video: null })
  }

  //
  // Render
  // --------------------------------------------------

  render()
  {
    const { currentView, backgroundView, video } = this.state

    return (
      <div className="site">
        <Debug {...this.state} />
        <Landing currentView={currentView} onReady={this.handleOnLandingReady} />
        <Headers currentView={currentView} backgroundView={backgroundView} onReady={this.handleOnHeaderReady} />
        <Pages {...this.state} onNavigate={this.handleOnNavigate} openVideo={this.handleOnOpenVideo} />
        <Video video={video} onClose={this.handleOnCloseVideo} />
      </div>
    )
  }
}

export default Index
