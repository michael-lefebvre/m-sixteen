import React, { PureComponent } from 'react'

import Spinner from 'Views/Spinner'
import Album from './Album'
// import Split from './Split'
// import Ep    from './Ep'

import './styles.css'

export default class Index extends PureComponent
{
  constructor( props )
  {
    super( props )

    this._pageRef = null

    this.state = { loading: true }
  }

  componentWillReceiveProps( nextProps )
  {
    if( nextProps.currentView !== this.props.currentView )
      this.setState({ loading: true }, this.props.resetScroll )
  }

  componentDidUpdate( prevProps )
  {
    if( this.props.currentView !== 0 && prevProps.currentView !== this.props.currentView && this.state.loading )
    {
      const { lineHeight, screenHeight } = this.props

      var pageBottom = ( lineHeight * 2 ) + ( lineHeight * 1.5 ) + screenHeight

      this.setState({ loading: false }, () => this.props.onReady( pageBottom ) )
    }
  }

  render()
  {
    const { currentView, isScrollable, screenHeight, lineHeight } = this.props

    if( currentView === 0 )
      return null

    if( currentView < 1 && !isScrollable )
      return null

    var style = { padding: `${screenHeight}px 0`}

    return (
      <div className="page" ref="page" style={style}>
        { this.state.loading && <div className="page__loading"><Spinner /></div> }
        { currentView === 1 && <Album lineHeight={lineHeight} pageRef={ ref => this._pageRef = ref } /> }
        { currentView === 2 && <Album lineHeight={lineHeight} pageRef={ ref => this._pageRef = ref } /> }
        { currentView === 3 && <Album lineHeight={lineHeight} pageRef={ ref => this._pageRef = ref } /> }
      </div>
    )
  }
}

