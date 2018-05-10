import React, { Component, Fragment } from 'react'
import { findDOMNode }                from 'react-dom'
import PropTypes                      from 'prop-types'
import TrackVisibility                from 'react-on-screen'
import classNames                     from 'classnames'

import { withApp }                    from 'Views/Provider'

import './styles.css'

class Image extends Component
{
  static propTypes = {
      path:      PropTypes.string.isRequired
    , isVisible: PropTypes.bool.isRequired
  };

  static defaultProps = {
    isVisible:   false
  };

  constructor( props )
  {
    super( props )

    this.state = {
        isVisible: false
      , imgSmall:  null
      , imgMedium: null
    }

    this.handleOnSmallLoaded  = this.handleOnSmallLoaded.bind( this )
    this.handleOnMediumLoaded = this.handleOnMediumLoaded.bind( this )
    this.handleOnClick        = this.handleOnClick.bind( this )
  }

  //
  // Life cycle
  // --------------------------------------------------

  componentWillMount()
  {
    const { path } = this.props

    var imgSmall = `/static/photos/${path}-sm.jpg`
      , imgMedium = `/static/photos/${path}-md.jpg`

    this.setState({ imgSmall, imgMedium })
  }

  componentWillReceiveProps( nextProps )
  {
    if( nextProps.isVisible && !this.state.isVisible )
      this.setState({ isVisible: true })
  }

  shouldComponentUpdate( nextProps )
  {
    return !this.state.isVisible
  }

  //
  // Handlers
  // --------------------------------------------------

  handleOnSmallLoaded()
  {
    findDOMNode( this.refs.small ).classList.add('page__image__loaded')
  }

  handleOnMediumLoaded()
  {
    findDOMNode( this.refs.medium ).classList.add('page__image__loaded')
  }

  handleOnClick()
  {
    if( !this.props.video )
      return

    this.props.openVideo( this.props.video )
  }

  //
  // Render
  // --------------------------------------------------

  render()
  {
    return (
      <Fragment>
        <img src={this.state.imgSmall} className="page__image__small" ref="small" alt="" onLoad={this.handleOnSmallLoaded} />
        { this.props.isVisible && <img src={this.state.imgMedium} ref="medium" alt="" onLoad={this.handleOnMediumLoaded} onClick={this.handleOnClick} /> }
      </Fragment>
    )
  }
}

const Index = (p) =>
{
  // console.log(p)
  const { className, portrait, flyer, imgPortrait, imgLandscape, imgFlyer, ...props } = p

  const cx = classNames('page__image', className, {
      'page__image--portrait': portrait
    , 'page__image--flyer':    flyer
    , 'page__image--video':    props.video && typeof props.video === 'string'
  })

  const style = ( !portrait && !flyer )
                ? imgLandscape
                : portrait
                  ? imgPortrait
                  : imgFlyer

  return (
    <TrackVisibility className={cx} partialVisibility={true} style={style} once>
      <Image {...props} />
    </TrackVisibility>
  )
}


Index.propTypes = {
    path:      PropTypes.string.isRequired
  , portrait:  PropTypes.bool
  , flyer:     PropTypes.bool
  , video:     PropTypes.oneOfType([ PropTypes.bool, PropTypes.string ])
  , className: PropTypes.string
  , style:     PropTypes.object
}

Index.defaultProps = {
    portrait:  false
  , flyer:     false
  , video:     false
  , className: ''
  , style:     {}
}

export default withApp( Index )
