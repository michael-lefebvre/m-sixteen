import React, { PureComponent } from 'react'
import YouTube    from 'react-youtube'

import { withApp } from 'Views/Provider'

import './styles.css'

export default withApp( class Index extends PureComponent
{
  constructor( props )
  {
    super( props )

    this.state = {
        videoId: null
      , active:  false
    }

    this.handleOnClose = this.handleOnClose.bind( this )
  }

  componentWillReceiveProps( nextProps )
  {
    if( nextProps.videoId )
      this.setState({ videoId: nextProps.videoId, active: true })
  }

  handleOnClose()
  {
    this.setState({ active: null }, this.props.closeVideo )
  }

  render()
  {
    // var { width } = document.body.getBoundingClientRect()

    const videoOpts = {
        width:  854
      , height: 480
      , playerVars: { // https://developers.google.com/youtube/player_parameters
            autoplay: 0
          , controls: 1
          , showinfo: 0
          , rel:      0
          , modestbranding: 0
        }
    }

    return (
      <div className={`video ${ this.state.active ? 'video--active': ''}`}>
        <div className="video__close" onClick={this.handleOnClose} />
        {/*<div className="video__content" />*/}
        { this.state.videoId && <div className="video__content" style={{ backgroundImage: 'url(https://i9.ytimg.com/vi_webp/Fj8WOeQamvw/hqdefault.webp?sqp=CLS9z9cF&rs=AOn4CLBjmsoqKX7ny9jw4C-O3HBVTbfXNw)' }}><YouTube videoId={this.state.videoId} opts={videoOpts} /></div>}
      </div>
    )
  }
})
