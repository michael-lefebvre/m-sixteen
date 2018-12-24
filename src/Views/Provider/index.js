import React, { PureComponent } from 'react'

const Context = React.createContext({
    Desktop: false
})

export function withApp( ComponentToWrap )
{
  return function AppComponent( props )
  {
    return (
      <Context.Consumer>
      { App => <ComponentToWrap {...props} {...App} />}
      </Context.Consumer>
    )
  }
}

export default class Index extends PureComponent
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
        isDesktop:      props.Desktop
      , homeReady:      !props.Desktop ? true : false
      , currentView:    'home'
      , previousView:   null
      , backgroundView: null
      , landingVideo:   null
      , screenHeight:   null
      , screenWidth:    null
      , screenRatio:    null
      , lineLandscape:  null
      , linePortrait:   null
      , lineFlyer:      null
      , imgLandscape:   null
      , imgPortrait:    null
      , imgFlyer:       null
      , videoId:        null
      , onNavigate:     this.handleOnNavigate
      , openVideo:      this.handleOnOpenVideo
      , closeVideo:     this.handleOnCloseVideo
      , headerReady:    this.handleOnHeaderReady
      , landingReady:   this.handleOnLandingReady
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
  }

  componentWillReceiveProps( nextProps )
  {
    this._setHeight()
    this.setState({ isDesktop: nextProps.Desktop })
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
      , lineFlyerHeight     = roundToEven( ( 400 / 300 ) * ( width * 0.3 ) )
      , imgLandscapeWidth   = roundToEven( lineLandscapeHeight * 1.5 )
      , imgPortraitWidth    = roundToEven( linePortraitHeight * 0.75 )
      , imgFlyerWidth       = roundToEven( lineFlyerHeight * .71 )

    var lineLandscape = { height: lineLandscapeHeight }
      , linePortrait  = { height: linePortraitHeight }
      , lineFlyer     = { height: lineFlyerHeight }
      , imgLandscape  = { height: lineLandscapeHeight, width: imgLandscapeWidth }
      , imgPortrait   = { height: linePortraitHeight, width: imgPortraitWidth }
      , imgFlyer      = { height: lineFlyerHeight, width: imgFlyerWidth }
      , screenHeight  = roundToEven( height * 1.01 )
      , screenWidth   = width
      , screenRatio   = width/height

    this.setState({ screenHeight, screenWidth, screenRatio, lineLandscape, linePortrait, lineFlyer, imgLandscape, imgPortrait, imgFlyer })
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

    this._setLandingVideo( nextState.currentView === 'home' )

    if( nextState.currentView !== 'home' )
      document.body.className = `body-${ nextState.currentView }`
    else
      document.body.className = ''

    this.setState( nextState )
  }

  handleOnHeaderReady()
  {
    this.setState({ backgroundView: null })
  }

  handleOnLandingReady({ target })
  {
    this.setState({ landingVideo: target, homeReady: true })
  }

  handleOnOpenVideo( videoId )
  {
    document.body.style.overflow = 'hidden'
    this.setState({ videoId })
  }

  handleOnCloseVideo()
  {
    document.body.style.overflow = 'auto'
    this.setState({ videoId: null })
  }

  render()
  {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }
}
