import React   from 'react'
import YouTube from 'react-youtube'

import './styles.css'

const Index = ({ onReady }) =>
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

  // const _onReady = e => {
  // // access to player in all event handlers via event.target
  // // event.target.mute();
  //   this.setState({ homeVideo: e.target })
  // }

  const _onEnd = e => {
    e.target.playVideo()
  }

  return (
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
           onReady={onReady}
           onEnd={_onEnd} />
        </div>
      </div>
    </div>
  )
}

export default Index
