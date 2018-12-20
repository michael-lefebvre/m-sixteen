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
          autoplay: 0
        , controls: 0
        , showinfo: 0
        , loop:     1
        , rel:      0
      }
  }

  const _onEnd = e => {
    e.target.playVideo()
  }

  const handleOnReady = ({ target }) => {
//     if(typeof landingReady === 'function')
//       return landingReady({ target })
// console.log(target)
    // target.playVideo()
    // setTimeout(() => target.playVideo(), 1000)
  }

  return (
    <div className="landing">
      <div className="landing__background">
        <YouTube
         videoId="Pdni_p27l_0"
         opts={videoOptions}
         className="landing__background__foreground__iframe"
         onReady={handleOnReady}
         onEnd={_onEnd} />
      </div>
    </div>
  )
}

export default withApp( Index )
