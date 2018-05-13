import React       from 'react'

import { withApp } from 'Views/Provider'
import Album       from './Album'
import Split       from './Split'
import Ep          from './Ep'

import './styles.css'

const Index = ({ currentView, backgroundView, headerReady }) =>
{
  const AlbumActive = currentView === 'album'
      , AlbumBack   = backgroundView === 'album'
      , AlbumOff    = currentView === 'home' && backgroundView === 'album'
      , SplitActive = currentView === 'split'
      , SplitBack   = backgroundView === 'split'
      , EpActive    = currentView === 'ep'
      , EpBack      = backgroundView === 'ep'
      , EpOff       = false //currentView === 4 && backgroundView === 3

  return (
    <div className="headers">
      <Album active={AlbumActive} back={AlbumBack} off={AlbumOff} onReady={headerReady} />
      <Split active={SplitActive} back={SplitBack} onReady={headerReady} />
      <Ep active={EpActive} back={EpBack} off={EpOff} onReady={headerReady} />
    </div>
  )
}

export default withApp( Index )
