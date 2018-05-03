import React, { PureComponent, Fragment } from 'react'
// import { findDOMNode }                    from 'react-dom'
// import classNames                         from 'classnames'
import YouTube                            from 'react-youtube'
import Inertia                            from 'wheel-inertia'
// import debounce                           from 'lodash.debounce'

// import ScrollTo                           from 'Utils/Scroll'

import Background from 'Views/Background'
import Record from 'Views/Record'

import './styles.css'

class App extends PureComponent
{
  constructor( props )
  {
    super( props )

    this.handleOnResize       = this.handleOnResize.bind( this )
    this.handleOnKeyDown      = this.handleOnKeyDown.bind( this )
    this.handleOnScroll       = this.handleOnScroll.bind( this )
    this.handleOnWheelInertia = this.handleOnWheelInertia.bind( this )
    this.handleOnNavigation   = this.handleOnNavigation.bind( this )
    // this.handleOnScroll = debounce( this.handleOnScroll.bind( this ), 150, { leading: true, trailing: false } )
    // this._scrollToView  = debounce( this._scrollToView.bind( this ), 500, { leading: false, trailing: true } )


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
    window.addEventListener( 'resize', this.handleOnResize, { passive: true } )
    document.addEventListener( 'keydown', this.handleOnKeyDown, { passive: true } )
    // document.body.addEventListener('DOMMouseScroll', this.handleOnWheelInertia, false ) // for Firefox
    window.addEventListener('DOMMouseScroll', this.handleOnWheelInertia, false ) // for Firefox
    window.addEventListener('mousewheel', this.handleOnWheelInertia, false )     // for everyone else
  }

  componentDidMount()
  {
    // findDOMNode( this.refs.app ).focus()
    this._setHeight()
  }

  // componentDidUpdate( prevProps )
  // {
  //   // if( prevProps.isHistoryOpen && !this.props.isHistoryOpen )
  //   //   findDOMNode( this.refs.app ).focus()
  // }

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
//     , () =>
//     {
//       // findDOMNode(this.refs.app).scrollTop = (height - 100)
// setTimeout( () =>
//       ScrollTo({
//           element:  findDOMNode( this.refs.app )
//         , callback: () => console.log('callback') //this.setState({ isScrolling: false, currentView })
//         , to:       finalHeight
//       }), 5000 )
//     })
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
    // if(  )
    //   this.state.homeVideo.pauseVideo()
    // else
    //   this.state.homeVideo.playVideo()

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
    // const { style, currentView } = this.state
    // const { currentView } = this.state
    //     , isView1                = currentView === 1
    //     , isView2                = currentView === 2
    //     , isView3                = currentView === 3


    // https://codebushi.com/react-youtube-background/
    const videoOptions = {
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        controls: 0,
        rel: 0,
        showinfo: 0,
        loop: 1
      }
    }

    const _onReady = ( e ) => {
    // access to player in all event handlers via event.target
    // event.target.mute();
      this.setState({ homeVideo: e.target })
    }

    const _onEnd = ( e ) => {
      e.target.playVideo()
    }

 // style={style}>
    return (
      <div className="app" ref="app">
        {/*this.slidesRenderer()*/}
        <div className="home">
          <div className="home__content">
            <div>
              <h1>m-sixteen</h1>
              <p>paris punk rock, 2001-2008</p>
            </div>
          </div>
          <div className="home__background">
            <div className="home__background__foreground">
              <YouTube
               videoId="Pdni_p27l_0"
               opts={videoOptions}
               className="home__background__foreground__iframe"
               onReady={_onReady}
               onEnd={_onEnd} />
            </div>
          </div>
        </div>
        <Background currentView={this.state.currentView} previousView={this.state.previousView}>
          <Record currentView={this.state.currentView} isScrolling={this.state.isScrolling} />
        </Background>
        {/*<div className={classNames('bkgd', { 'bkgd--1': isView1, 'bkgd--2': isView2, 'bkgd--3': isView3 })} />*/}
        {/*<div className={classNames('views', { 'views--1': isView1, 'views--2': isView2, 'views--3': isView3 })}>
          <div className="view view--1">
            <div className="view__content">view 1</div>
            <div className="view__bkgd" />
          </div>
          <div className="view view--2">
            <div className="view__content">view 2</div>
            <div className="view__bkgd" />
          </div>
          <div className="view view--3">
            <div className="view__content">view 3</div>
            <div className="view__bkgd" />
          </div>
        </div>*/}
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
