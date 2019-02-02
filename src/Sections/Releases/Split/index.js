import React, { PureComponent, Fragment } from 'react';
import IdleTimer from 'react-idle-timer'
import { Keyframes, animated/*, config*/ } from 'react-spring'
import delay from 'delay'
import withRelease from 'Hoc/Release';
import Cover from './Cover';
import Story from './Story';
import ReleasesNav from '../Nav'
import { ReleasesScrollInvite } from '../index'
import { RELEASE_USER_EVENTS, RELEASE_IDLE_TIMEOUT, RELEASE_IDLE_THROTTLE } from 'Constants'

import './index.scss'

// console.log(`cssmask: ${window.Modernizr.cssmask ? 'supported' : 'not-supported'}`)

const Container = Keyframes.Spring({
  open: async (next, cancel) => {
    await next({ r: 0, from: { l: 0, r: 100, t: 0 } })
  },
  close: async (next, cancel, { onRest }) => {
    await delay(200)
    next({ l: 100, t: 100 })
    await delay(500)
    await onRest()
  },
})

class ReleaseSplit extends PureComponent {

  state = {
    displayStory: false,
    showScroller: false,
    stage: this.props.stage,
  };

  _idleTimer = null;

  static getDerivedStateFromProps(nextProps, prevState) {
    const { stage } = nextProps
    // if( stage === 'mounted' && prevState.stage === 'entering' )
    //   return {
    //     stage,
    //   }

    // if( stage === 'leaving' && prevState.stage !== 'leaving' )
    //   return {
    //     stage,
    //   }
    if( stage !== prevState.stage )
      return {
        showScroller: false,
        stage,
      }

    return null;
  }

  //
  // Life cycle
  // --------------------------------------------------

  componentDidMount() {}

  getSnapshotBeforeUpdate(
    prevProps,
    prevState
  ) {
    return prevProps.stage !== "mounted" && this.props.stage === "mounted"
  }

  componentDidUpdate(
    prevProps,
    prevState,
    snapshot
  ) {
    if (snapshot)
      this._idleTimer.reset()
  }

  //
  // Helpers
  // --------------------------------------------------

  //
  // Events Handlers
  // --------------------------------------------------

  handleOnRest = (el) => () => {
    const { stage } = this.state;
    const { onRest } = this.props;

    if(stage === 'entering' && el === 'bkgd')
      return onRest()
    if(stage === 'leaving' && el === 'container')
      return onRest()
  };

  handleOnAction = () => {
    if(this.state.displayStory) return
    this._idleTimer.pause()
    this.setState({ displayStory: true, showScroller: false })
  };

  handleOnIdle = (e) => {
    if(this.state.displayStory) return
    this.setState({ showScroller: true })
  };

  //
  // Renderers
  // --------------------------------------------------

  render() {
    const { displayStory, stage, showScroller } = this.state;

    const ContainerState = stage === 'leaving'  ? 'close' : displayStory ? 'story' : 'open'

    return (
      <Fragment>
        <IdleTimer
          ref={ref => { this._idleTimer = ref }}
          element={document}
          onIdle={this.handleOnIdle}
          onAction={this.handleOnAction}
          startOnMount={false}
          throttle={RELEASE_IDLE_THROTTLE}
          events={RELEASE_USER_EVENTS}
          timeout={RELEASE_IDLE_TIMEOUT} />
        <ReleasesScrollInvite show={showScroller} />
        <ReleasesNav isMounted={stage === 'mounted'} />
        <Container
          native
          state={ContainerState}
          onRest={this.handleOnRest('container')}
        >
          {({ l, r, t }) => (
            <animated.div
              className="split"
              style={{
                right: r.interpolate(r => `${r}%`),
                left: l.interpolate(l => `${l}%`),
              }}
            >
              <animated.div
                className="split__root split-container"
                style={{
                  transform: t.interpolate(p => `translateX(-${p}%)`),
                }}
              >
                <Story
                  displayStory={displayStory}
                  stage={stage}
                />
                <Cover
                  displayStory={displayStory}
                  stage={ContainerState}
                  onRest={this.handleOnRest}
                />
              </animated.div>{/* ./split__root */}
            </animated.div>
          )}
        </Container>
      </Fragment>
    )
  }
}

export default withRelease(ReleaseSplit, { id: 'split' });
