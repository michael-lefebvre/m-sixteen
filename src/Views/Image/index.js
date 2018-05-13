import React, { Component, Fragment } from 'react'
import { findDOMNode }                from 'react-dom'
import PropTypes                      from 'prop-types'
import TrackVisibility                from 'react-on-screen'
import classNames                     from 'classnames'

import { withApp }                    from 'Views/Provider'

import './styles.css'

export class Image extends Component
{
  static propTypes = {
      path:      PropTypes.string.isRequired
    , isVisible: PropTypes.bool.isRequired
    , extension: PropTypes.oneOf(['jpg', 'png'])
  };

  static defaultProps = {
      isVisible:   false
    , extension:   'jpg'
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
    const { path, extension } = this.props

    var imgSmall = `${process.env.PUBLIC_URL}/static/photos/${path}-sm.${extension}`
      , imgMedium = `${process.env.PUBLIC_URL}/static/photos/${path}-md.${extension}`

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
        { this.props.isVisible && <img src={this.state.imgMedium} className="page__image page__image__medium" ref="medium" alt="" onLoad={this.handleOnMediumLoaded} onClick={this.handleOnClick} /> }
        <img src={this.state.imgSmall} className="page__image page__image__small" ref="small" alt="" onLoad={this.handleOnSmallLoaded} />
        { this.props.legend && <legend className="page__img__legend">{this.props.legend}</legend>}
      </Fragment>
    )
  }
}

const Index = ({ className, transparent = false, portrait = false, small = false, style = {}, ...props }) =>
{
  const cx = classNames('page__img', className, {
      'page__img--transparent':    transparent
    , 'page__img--small':          !portrait && small
    , 'page__img--portrait':       portrait && !small
    , 'page__img--portrait-small': portrait && small
    , 'page__img--video':          props.video && typeof props.video === 'string'
  })

  return (
    <TrackVisibility className={cx} partialVisibility={true} style={style} once>
      <Image {...props} extension={ transparent ? 'png' : 'jpg' } />
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
