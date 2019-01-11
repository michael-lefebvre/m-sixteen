import React, { Component }                 from 'react'
// import { Spring, animated, config } from 'react-spring'
import { withRouter } from "react-router";
import { HotKeys } from "react-hotkeys";
import { Link/*, Route, Switch*/ } from "react-router-dom";
import classNames from 'classnames'
import { withApp } from 'Views/Provider'
import { getParams, isSectionActive } from 'Utils'
import Album from './Album'
import Split from './Split'
import Ep from './Ep'
import './index.scss'

const _DEBUG = false;

const getViewport = () => {
  const { width, height } = document.body.getBoundingClientRect()
  return {
    offsetWidth: width,
    offsetHeight: height
  }
}

const getInitialState = (props) => {
  const { id } = getParams(props)
  return {
    wasActive: false,
    prevId: null,
    isActive: isSectionActive(props, 'releases'),
    id: id || null,
    viewPort: getViewport(),
  }
}

class Releases extends Component {
  state = getInitialState(this.props);

  static getDerivedStateFromProps(nextProps, prevState) {
    const isActive = isSectionActive(nextProps, 'releases')
    const { id } = getParams(nextProps)
    if(isActive !== prevState.isActive || id !== prevState.id)
      return {
        wasActive: prevState.isActive,
        prevId: prevState.id,
        id: id || null,
        isActive,
      }
    return null;
  }

  //
  // Life cycle
  // --------------------------------------------------

  // getSnapshotBeforeUpdate(prevProps, prevState) {
  //   return prevState.isTray !== this.state.isTray;
  // }

  componentDidMount() {
    window.addEventListener('resize', this.handleOnResize);
    this.handleOnResize()
  }

  // componentWillUnmount() {}

  // componentDidUpdate(prevProps, prevState, snapshot) {}

  //
  // Helpers
  // --------------------------------------------------

  //
  // Events Handlers
  // --------------------------------------------------

  handleOnCoverReady = () => {
    this.setState({ prevId: null })
  };

  handleOnResize = () => {
    this.setState({ viewPort: getViewport() })
  };

  handleOnEsc = () => {
    this.props.history.push('/')
  };

  //
  // Renderers
  // --------------------------------------------------

  render() {
    const { id, prevId, isActive, wasActive, viewPort } = this.state;

    const storyProps = { viewPort, id, prevId, wasActive }

    const className = classNames('releases', {
      'releases--active': isActive
    })

    return (
      <HotKeys
        focused={isActive}
        attach={window}
        className={className}
        keyMap={{
          esc: "esc"
        }}
        handlers={{
          esc: this.handleOnEsc
        }}
      >
        <div className="releases__nav">
          <Link to="/">Home</Link>
          <ul>
            <li>
              <Link to="/releases/album">Album</Link>
            </li>
            <li>
              <Link to="/releases/split">Split</Link>
            </li>
            <li>
              <Link to="/releases/ep">ep</Link>
            </li>
          </ul>
        </div>
        <Album {...storyProps} onReady={this.handleOnCoverReady} />
        <Split {...storyProps} onReady={this.handleOnCoverReady} />
        <Ep {...storyProps} onReady={this.handleOnCoverReady} />
        {_DEBUG && (
          <code className="releases__debug">
            <pre>
              {JSON.stringify(this.props.match.params, null, 2)}
            </pre>
            <pre>
              {JSON.stringify(this.state, null, 2)}
            </pre>
          </code>
        )}
      </HotKeys>
    )
  }
}

export default withRouter(withApp(Releases))
