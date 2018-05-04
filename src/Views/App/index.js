import React, { PureComponent, Fragment } from 'react'
import Inertia                            from 'wheel-inertia'

import Background                         from 'Views/Background'
import Home                               from 'Views/Home'
import Record                             from 'Views/Record'

import './styles.css'

class App extends PureComponent
{
  constructor( props )
  {
    super( props )

    this.handleOnPlayerReady  = this.handleOnPlayerReady.bind( this )
    this.handleOnResize       = this.handleOnResize.bind( this )
    this.handleOnKeyDown      = this.handleOnKeyDown.bind( this )
    this.handleOnScroll       = this.handleOnScroll.bind( this )
    this.handleOnWheelInertia = this.handleOnWheelInertia.bind( this )
    this.handleOnNavigation   = this.handleOnNavigation.bind( this )


    Inertia.addCallback( this.handleOnScroll )

    this.state = {
        finalHeight:  null
      , finalWidth:   null
      , screenHeight: null
      , style:        {}
      , isScrolling:  false
      , currentView:  0
      , previousView: 0
      , homeVideo:    null
    }
  }

  //
  // Life cycle
  // --------------------------------------------------

  componentWillMount()
  {
    window.addEventListener('resize', this.handleOnResize, { passive: true } )
    document.addEventListener('keydown', this.handleOnKeyDown, { passive: true } )
    window.addEventListener('DOMMouseScroll', this.handleOnWheelInertia, false ) // for Firefox
    window.addEventListener('mousewheel', this.handleOnWheelInertia, false )     // for everyone else
  }

  componentDidMount()
  {
    this._setHeight()
  }

  //
  // Helpers
  // --------------------------------------------------

  _setHeight()
  {
    var { width, height } = document.body.getBoundingClientRect()

    var finalHeight = width
      , finalWidth  = 2 * finalHeight
      , style       = {
            width:      finalHeight + 1
          , maxHeight:  finalWidth
          , paddingTop: finalHeight
          , transform:  `rotate(90deg) translateY(-${finalHeight}px)`
        }

    this.setState({ finalHeight, finalWidth, style, screenHeight: height }, () => this._scrollToView( this.state.currentView ))
  }

  _scrollToView( view )
  {
    // var currentView = view
      // , scrollTop   = currentView * this.state.finalHeight
    setTimeout( () => this.setState({ isScrolling: false }), 800 )
    // ScrollTo({
    //     element:  findDOMNode( this.refs.app )
    //   , callback: () => setTimeout( ()  => this.setState({ isScrolling: false, currentView }), 100 )
    //   // , callback: () => this.setState({ isScrolling: false, currentView })
    //   , duration: 500
    //   , to:       scrollTop
    // })
  }

  _setHomeVideo( status )
  {
    const { homeVideo } = this.state

    if( !homeVideo )
      return

    homeVideo[ status ? 'playVideo' : 'pauseVideo' ]()
  }

  //
  // Handlers
  // --------------------------------------------------

  handleOnResize()
  {
    this._setHeight()
  }

  handleOnWheelInertia( e )
  {
    var delta = e.wheelDelta || e.detail

    //Update inertia with mousewheel.delta
    Inertia.update( delta )
  }

  handleOnScroll( deltaY )
  {
    const { currentView } = this.state
        , view            = deltaY > 0 ? ( currentView - 1 ) : ( currentView + 1 )

    if( this.state.isScrolling || ( view < 0 || view > 3 ) )
      return false

    this._setHomeVideo( view === 0 )

    return this.setState({ isScrolling: true, currentView: view, previousView: currentView }, () => this._scrollToView( view ) )
  }

  handleOnKeyDown({ keyCode })
  {
    if( [ 38, 40 ].indexOf( keyCode ) === -1 )
      return

    this.handleOnScroll( keyCode === 38 ? 1 : -1 )
  }

  handleOnNavigation({ currentTarget: { dataset } })
  {
    var view = +dataset.index

    const { currentView, isScrolling } = this.state

    if( isScrolling || currentView === view )
      return

    return this.setState({ isScrolling: true, currentView: view, previousView: currentView }, () => this._scrollToView( view ) )
  }

  handleOnPlayerReady({ target })
  {
    this.setState({ homeVideo: target })
  }

  //
  // Render
  // --------------------------------------------------

  slidesRenderer()
  {
    var { finalHeight } = this.state

    if( !finalHeight )
      return null

    var style = {
        width:  finalHeight
      , height: finalHeight
    }
    // const videoOpts = {
    //     height: 390
    //   , width:  640
    //   , playerVars: { // https://developers.google.com/youtube/player_parameters
    //         autoplay: 0
    //       , controls: 0
    //       , showinfo: 0
    //       , rel:      0
    //       , modestbranding: 0
    //     }
    // }


    return (
      <Fragment>
        <div className="app__slide" style={style}>
          {/*<YouTube videoId="AymtEvBubmQ" opts={videoOpts} containerClassName="app__slide__video" />
          <YouTube videoId="Fj8WOeQamvw" opts={videoOpts} containerClassName="app__slide__video" />*/}
        </div>
        <div className="app__slide app__slide--album app__slide--album--1" style={style}><div className="app__slide__cover app__slide__cover--1" /></div>
        <div className="app__slide app__slide--album app__slide--album--2" style={style}><div className="app__slide__cover app__slide__cover--2" /></div>
        <div className="app__slide app__slide--album app__slide--album--3" style={style}><div className="app__slide__cover app__slide__cover--3" /></div>
      </Fragment>
    )
  }

  render()
  {
    return (
      <div className="app" ref="app">
        <Home onReady={this.handleOnPlayerReady} />
        <Background currentView={this.state.currentView} previousView={this.state.previousView}>
          <Record currentView={this.state.currentView} isScrolling={this.state.isScrolling} />
        </Background>
        <div className="navigation">
          <div className="navigation__link" onClick={this.handleOnNavigation} data-index="1">Album</div>
          <div className="navigation__link" onClick={this.handleOnNavigation} data-index="2">Split</div>
          <div className="navigation__link" onClick={this.handleOnNavigation} data-index="3">EP</div>
        </div>
      </div>
    )
  }
}

export default App
