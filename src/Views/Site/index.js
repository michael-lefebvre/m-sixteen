import React, { PureComponent } from 'react'
import { findDOMNode }          from 'react-dom'
import classNames               from 'classnames'
import Inertia                  from 'wheel-inertia'

import Home                     from 'Views/Home'
import Headers                  from 'Views/Headers'
import Pages                    from 'Views/Pages'
import Video                    from 'Views/Video'

import './styles.css'

const Debug = ({ currentView, previousView, isScrollable, scrollTop, scrollBottom, scrollDirection, pageScrollable, lineHeight }) => (
  <ul className="site__debug">
    <li>current: {currentView}</li>
    <li>previous: {previousView}</li>
    <li>scrollable: {isScrollable ? 'yes' : 'no'}</li>
    <li>pageScrollable: {pageScrollable ? 'yes' : 'no'}</li>
    <li>scrollTop: {scrollTop}</li>
    <li>scrollBottom: {scrollBottom}</li>
    <li>scrollDirection: {scrollDirection}</li>
    <li>lineHeight: {lineHeight}</li>
  </ul>
)

export default class Index extends PureComponent
{
  constructor( props )
  {
    super( props )

    this.handleOnResize         = this.handleOnResize.bind( this )
    this.handleOnScroll         = this.handleOnScroll.bind( this )
    this.handleOnKeyDown        = this.handleOnKeyDown.bind( this )
    this.handleOnPageScroll     = this.handleOnPageScroll.bind( this )
    this.handleOnResetScroll    = this.handleOnResetScroll.bind( this )
    this.handleOnPageRendered   = this.handleOnPageRendered.bind( this )
    this.handleOnViewNavigation = this.handleOnViewNavigation.bind( this )
    this.handleOnPlayerReady    = this.handleOnPlayerReady.bind( this )
    this.handleOnHeaderReady    = this.handleOnHeaderReady.bind( this )
    this.handleOnGoNext         = this.handleOnGoNext.bind( this )
    this.handleOnGoPrev         = this.handleOnGoPrev.bind( this )
    this.handleOnOpenVideo      = this.handleOnOpenVideo.bind( this )
    this.handleOnCloseVideo     = this.handleOnCloseVideo.bind( this )

    this.state = {
        screenHeight:    null
      , lineHeight:      null
      , isScrollable:    true
      , scrollTop:       null
      , scrollBottom:    null
      , scrollDirection: null
      , currentView:     0
      , previousView:    null
      , homeVideo:       null
      , pageScrollable:  false
      , video:           null
    }
  }

  //
  // Life cycle
  // --------------------------------------------------

  componentWillMount()
  {
    this._setHeight()
  }

  componentDidMount()
  {
    //Add callback
    Inertia.addCallback( this.handleOnViewNavigation )

    document.addEventListener( 'keydown',      this.handleOnKeyDown, { passive: true } )
    window.addEventListener( 'resize',         this.handleOnResize, { passive: true } )
    window.addEventListener( 'DOMMouseScroll', this.handleOnScroll, false ) // for Firefox
    window.addEventListener( 'mousewheel',     this.handleOnScroll, false ) // for everyone else
  }

  //
  // Helpers
  // --------------------------------------------------

  _setHeight()
  {
    var { height, width } = document.body.getBoundingClientRect()

    if( width > 1280 )
      width = 1280

    width = width - 40

    var baseImg    = width * 0.55
      , lineHeight = ( 2 * Math.round( ( ( 200 / 300 ) * baseImg ) / 2 ) ) + 10

    this.setState({ screenHeight: height, lineHeight })
  }

  //
  // Handlers
  // --------------------------------------------------

  handleOnResize( e )
  {
    this._setHeight()
  }

  handleOnScroll( e )
  {
    var delta = e.wheelDelta || ( e.detail * -1 )

    if( !this.state.isScrollable )
      return

    //Update inertia with mousewheel.delta
    Inertia.update( delta )
  }

  handleOnKeyDown({ keyCode })
  {
    if( [ 38, 40 ].indexOf( keyCode ) === -1 )
      return

    this.handleOnViewNavigation( keyCode === 38 ? 1 : -1 )
  }

  handleOnViewNavigation( direction )
  {
    if( !this.state.isScrollable )
      return

    var { currentView } = this.state
      , nextView        = 0

    if( direction < 0 && currentView < 3 )
      nextView = currentView + 1

    if( direction > 0 && currentView >= 0 )
      nextView = currentView - 1

    if( nextView < 0 )
      return

    if( currentView === 3 && nextView === 0 )
      return

    this.setState({ scrollDirection: direction, currentView: nextView, previousView: currentView, isScrollable: ( nextView === 0 ), pageScrollable: false }) //, scrollTop: 0, scrollBottom: null }) //, () => findDOMNode( this.refs.site ).scrollTop = 0 )
  }

  handleOnPlayerReady({ target })
  {
    this.setState({ homeVideo: target })
  }

  handleOnHeaderReady()
  {
    // if( this.state.scrollDirection > 0 )
    //   return setTimeout(() => this.setState({ previousView: null, isScrollable: true }), 300)

    this.setState({ previousView: null })
  }

  handleOnResetScroll()
  {
    findDOMNode( this.refs.site ).scrollTop = 0
  }

  handleOnGoNext()
  {
    this.handleOnResetScroll()
    this.setState({ isScrollable: true }, () => this.handleOnViewNavigation(-1))
  }

  handleOnGoPrev()
  {
    this.handleOnResetScroll()
    this.setState({ isScrollable: true, scrollBottom: null, scrollTop: 0, pageScrollable: false }, () => this.handleOnViewNavigation(1))
  }

  handleOnPageScroll({ target: { scrollTop } })
  {
    var scrollDirection = scrollTop > this.state.scrollTop ? 1 : -1

    if( scrollTop === 0 )
      return this.setState({ isScrollable: true, scrollBottom: null, scrollTop: 0, pageScrollable: false }, this.handleOnResetScroll )
      // return this.handleOnGoPrev()

    if( scrollTop >= this.state.scrollBottom && this.state.currentView < 3 )
      return this.setState({ isScrollable: true, scrollBottom: null, scrollTop: 0, pageScrollable: false }, this.handleOnResetScroll )
      // return this.setState({ isScrollable: true }, this.handleOnResetScroll )
      // return this.handleOnGoNext()
      // return this.handleOnViewNavigation(-1)

    this.setState({ scrollTop, scrollDirection })
  }

  handleOnPageRendered( scrollBottom )
  {
    this.setState({ scrollBottom, pageScrollable: true })
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
    const { isScrollable, currentView, previousView, screenHeight, lineHeight, pageScrollable } = this.state

    return (
      <div className={classNames('site', { 'site--scroll': pageScrollable })} ref="site" onScroll={this.handleOnPageScroll}>
        <Home onReady={this.handleOnPlayerReady} />
        <Headers currentView={currentView} previousView={previousView} onReady={this.handleOnHeaderReady} />
        <Pages {...this.state} onReady={this.handleOnPageRendered} resetScroll={this.handleOnResetScroll} onClickVideo={this.handleOnOpenVideo} />
        <Video video={this.state.video} onClose={this.handleOnCloseVideo} />
        <Debug {...this.state} />
      </div>
    )
  }
}
