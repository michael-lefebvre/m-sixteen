import React      from 'react'
import classNames from 'classnames'
import YouTube    from 'react-youtube'

import './styles.css'

const videoOpts = {
  //   height: 390
  // , width: 522
    height: 300
  , width: 400
  , playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      , controls: 1
      , showinfo: 0
      , rel:      0
      , modestbranding: 0
      , fs: 0
    }
}

const PageVideo = ({ className = '', videoId, style = {}, opts = {} }) =>
  <div className={classNames('page__video', className)} style={style}>
    <YouTube videoId={videoId} opts={{ ...videoOpts, ...opts }} />
  </div>

export default PageVideo
