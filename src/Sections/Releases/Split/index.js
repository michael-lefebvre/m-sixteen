import React, { PureComponent } from 'react';
import { Keyframes, animated/*, config*/ } from 'react-spring'
import delay from 'delay'
import { withRelease } from 'Hoc'
import Cover from './Cover';
import Story from './Story';

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

const getStateFromProps = ({ state, story }) => ({
  displayStory: story,
  isLeaving: state === 'leaving',
  isMounted: state === 'mounted',
})

class ReleaseSplit extends PureComponent {

  state = getStateFromProps(this.props);

  static getDerivedStateFromProps(nextProps, prevState) {
    const { displayStory, isMounted, isLeaving } = getStateFromProps(nextProps);

    if( isMounted && !prevState.isMounted )
      return {
        isMounted
      }

    if( isLeaving && !prevState.isLeaving )
      return {
        isLeaving
      }

    if( displayStory && !prevState.displayStory )
      return {
        displayStory
      }

    return null;
  }

  //
  // Life cycle
  // --------------------------------------------------

  //
  // Helpers
  // --------------------------------------------------

  //
  // Events Handlers
  // --------------------------------------------------

  //
  // Renderers
  // --------------------------------------------------

  render() {
    const { displayStory, isLeaving, isMounted } = this.state;

    const ContainerState = isLeaving  ? 'close' : displayStory ? 'story' : 'open'

    return (
      <Container
        native
        state={ContainerState}
        onRest={this.props.onNext('leaving')}
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
                isMounted={isMounted}
              />
              <Cover
                displayStory={displayStory}
                stage={ContainerState}
                onRest={this.props.onNext('entering')}
              />
            </animated.div>{/* ./split__root */}
          </animated.div>
        )}
      </Container>
    )
  }
}

export default withRelease(ReleaseSplit, { release: 'split', assets: ['a'] });
