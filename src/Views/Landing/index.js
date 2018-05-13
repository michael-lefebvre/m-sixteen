import React from 'react'
import YouTube from 'react-youtube'
import { withApp } from 'Views/Provider'

import './styles.css'

const Index = ({ landingReady }) =>
{
  // https://codebushi.com/react-youtube-background/
  // https://developers.google.com/youtube/player_parameters
  const videoOptions = {
      playerVars: {
          autoplay: 1
        , controls: 0
        , showinfo: 0
        , loop:     1
        , rel:      0
      }
  }

  const _onEnd = e => {
    e.target.playVideo()
  }

  return (
    <div className="landing">
      <div className="landing__background">
        <YouTube
         videoId="Pdni_p27l_0"
         opts={videoOptions}
         className="landing__background__foreground__iframe"
         onReady={landingReady}
         onEnd={_onEnd} />
      </div>
    </div>
  )
}

export default withApp( Index )
