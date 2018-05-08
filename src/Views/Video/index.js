import React, { PureComponent } from 'react'
import YouTube    from 'react-youtube'

import './styles.css'

export default class Index extends PureComponent
{
  constructor( props )
  {
    super( props )

    this.state = {
        video:  null
      , active: false
    }

    this.handleOnClose = this.handleOnClose.bind( this )
  }

  componentWillReceiveProps( nextProps )
  {
    if( nextProps.video )
      this.setState({ video: nextProps.video, active: true })
  }

  handleOnClose()
  {
    this.setState({ active: null, video: null }, this.props.onClose )
  }

  render()
  {
    // var { width } = document.body.getBoundingClientRect()

    const videoOpts = {
        width:  854
      , height: 480
      , playerVars: { // https://developers.google.com/youtube/player_parameters
            autoplay: 1
          , controls: 1
          , showinfo: 0
          , rel:      0
          , modestbranding: 0
        }
    }

    return (
      <div className={`video ${ this.state.active ? 'video--active': ''}`}>
        <div className="video__close" onClick={this.handleOnClose} />
        { this.state.video && <YouTube videoId={this.state.video} opts={videoOpts} containerClassName="video__content" />}
      </div>
    )
  }
}
