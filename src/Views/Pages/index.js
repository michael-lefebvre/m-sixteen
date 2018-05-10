import React from 'react'

import Image                     from 'Views/Image'
import Page from 'Views/Page'
import Home from 'Views/Home'
import Album from './Album'
// import Split from './Split'
// import Ep    from './Ep'

import './styles.css'

const Index = props =>
{
  const { screenHeight, screenRatio, lineLandscape, linePortrait, imgLandscape, imgPortrait, onNavigate } = props

  return (
    <div className="pages">
      <Page id="0" screenRatio={screenRatio} screenHeight={screenHeight} onNavigate={onNavigate}>
        <Home screenHeight={screenHeight} />
      </Page>
      <Album {...props} />
      <Page id="2" screenRatio={screenRatio} screenHeight={screenHeight} onNavigate={onNavigate}>
        <div className="page">
          <div className="page__line" style={lineLandscape}>
            <Image path="split/band-1" style={imgLandscape} />
          </div>
          <div className="page__line" style={linePortrait}>
            <Image path="album/img-2" style={imgPortrait} />
          </div>
          <div className="page__line" style={lineLandscape}>
            <Image path="album/video-1" video style={imgLandscape} />
          </div>
        </div>
      </Page>
      <Page id="3" screenRatio={screenRatio} screenHeight={screenHeight} onNavigate={onNavigate}>
        <div className="page">
          <div className="page__line" style={lineLandscape}>
            <Image path="ep/band-1" style={imgLandscape} />
          </div>
        </div>
      </Page>
    </div>
  )
}

export default Index
