import React      from 'react'

import Album from './Album'
import Split from './Split'
import Ep    from './Ep'

import './styles.css'

const Index = ({ currentView, previousView, onReady }) =>
{
  // const InPage  = getPage( currentView )
  //     , OutPage = getPage( previousView )

  // const on = currentView !== 0

  const AlbumActive = currentView === 1
      , AlbumBack   = previousView === 1
      , AlbumOff    = currentView === 0 && previousView === 1
      , SplitActive = currentView === 2
      , SplitBack   = previousView === 2
      , EpActive    = currentView === 3
      , EpBack      = previousView === 3

  return (
    <div className="headers" data-current={currentView} data-previous={previousView}>
      <Album active={AlbumActive} back={AlbumBack} off={AlbumOff} onReady={onReady} />
      <Split active={SplitActive} back={SplitBack} onReady={onReady} />
      <Ep active={EpActive} back={EpBack} onReady={onReady} />
    </div>
  )
}

export default Index
