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

    this.props.onNavigate( id, isVisible )
  }

  render()
  {
    return this.props.children
  }
}

const Page = ({ id, screenRatio, screenHeight, onNavigate, children }) =>
  <TrackVisibility partialVisibility={true}>
    <ComponentToTrack id={id} screenRatio={screenRatio} onNavigate={onNavigate}>
      { id !== 'home' && (
        <div className={`page page--${id}`}>
          <div style={{ height: screenHeight * .5 }} />
          {children}
          <div style={{ height: screenHeight }} />
        </div>
      )}
      { id === 'home' && children }
    </ComponentToTrack>
  </TrackVisibility>

export default withApp( Page )
