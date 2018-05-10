import React, { Component } from 'react'
import TrackVisibility      from 'react-on-screen'

import { withApp }          from 'Views/Provider'

import './styles.css'

class ComponentToTrack extends Component
{
  // componentWillReceiveProps( nextProps )

  shouldComponentUpdate( nextProps )
  {
    return ( nextProps.isVisible !== this.props.isVisible || nextProps.screenRatio !== this.props.screenRatio )
  }

  componentDidUpdate( prevProps )
  {
    const { id, isVisible } = this.props

    this.props.onNavigate( +id, isVisible )
  }

  render()
  {
    return this.props.children
  }
}

export const PageLine = withApp( ({ children, lineLandscape, linePortrait, lineFlyer, portrait = false, flyer = false }) =>
{
  const style = ( !portrait && !flyer )
                ? lineLandscape
                : portrait
                  ? linePortrait
                  : lineFlyer

  return (
    <div className="page__line" style={style}>
      {children}
    </div>
  )
})

const Page = ({ id, screenRatio, screenHeight, onNavigate, children }) =>
  <TrackVisibility partialVisibility={true}>
    <ComponentToTrack id={id} screenRatio={screenRatio} onNavigate={onNavigate}>
      { id !== '0' && <div style={{ height: screenHeight * .5 }} />}
      {children}
      { id !== '0' && <div style={{ height: screenHeight }} />}
    </ComponentToTrack>
  </TrackVisibility>

export default withApp( Page )
