import React       from 'react'

import { withApp } from 'Views/Provider'
import Album       from './Album'
import Split       from './Split'
import Ep          from './Ep'

import './styles.css'

const Index = ({ currentView, backgroundView, headerReady }) =>
{
  const AlbumActive = currentView === 1
      , AlbumBack   = backgroundView === 1
      , AlbumOff    = currentView === 0 && backgroundView === 1
      , SplitActive = currentView === 2
      , SplitBack   = backgroundView === 2
      , EpActive    = currentView === 3
      , EpBack      = backgroundView === 3
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
