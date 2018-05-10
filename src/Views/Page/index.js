import React, { Component } from 'react'
import TrackVisibility          from 'react-on-screen'

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

const Page = ({ id, screenRatio, screenHeight, onNavigate, children }) =>
  <TrackVisibility partialVisibility={true}>
    <ComponentToTrack id={id} screenRatio={screenRatio} onNavigate={onNavigate}>
      { id !== '0' && <div style={{ height: screenHeight }} />}
      {children}
      { id !== '0' && <div style={{ height: screenHeight }} />}
    </ComponentToTrack>
  </TrackVisibility>

export default Page
