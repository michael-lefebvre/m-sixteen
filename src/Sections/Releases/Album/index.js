import React, { PureComponent } from 'react'
import IdleTimer from 'react-idle-timer'
import classNames from 'classnames'
import debounce from "lodash.debounce";
import withRelease from 'Hoc/Release';
import ReleasesNav from '../Nav'
import { ReleasesScrollInvite } from '../index'
import Story from './Story/index';
import { RELEASE_USER_EVENTS, RELEASE_IDLE_TIMEOUT, RELEASE_IDLE_THROTTLE } from 'Constants'
import './index.scss'

class ReleaseAlbum extends PureComponent {

  constructor( props ){
    super( props )

    this.state = {
      stage: props.stage,
      displayStory: false,
      displayBkgd: false,
      showScroller: false,
    };

    this._layers = [];
    this._idleTimer = null

    this.handleOnTransitionEnd = debounce(this.handleOnTransitionEnd, 300, { leading: true, trailing: false })
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { stage } = nextProps;
    // if(
    //   stage === 'leaving' && prevState.displayStory
    // )
    //   return {
    //     displayStory: false
    //   }

    if(
      stage !== prevState.stage
    )
      return {
        showScroller: false,
        stage
      }

    return null;
  }

  //
  // Life cycle
  // --------------------------------------------------

  // componentDidMount() {}

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

  _registerLayer = (layer) => {
    this._layers = this._layers.concat(layer)
  };

  //
  // Events Handlers
  // --------------------------------------------------

  handleOnRest = (el) => () => {
    // if(this.props.stage === 'leaving' && el === 'story')
    //   this.setState({ displayBkgd: false })
    // if(this.state.stage === 'entering' && el === 'cover')
    //   this.props.onRest()
  };

  handleOnTransitionEnd = () => {
    // const { stage, displayBkgd } = this.state;
    // console.log('handleOnTransitionEnd', { stage, displayBkgd})
    // if( this.props.stage === 'leaving')
    //   this.setState({ displayBkgd: false })
  };

  handleOnAnimationEnd = () => {
    const { stage, onRest } = this.props;
    const { displayBkgd/*, displayStory*/ } = this.state;
    if( stage === 'entering' && !displayBkgd )
      return this.setState({ displayBkgd: true/*, displayStory: true*/ }, onRest)
    // if( stage === 'leaving' && displayStory )
    //   return this.setState({ displayStory: false })
    if( stage === 'leaving') // && !displayStory )
      return onRest()
  };

  handleOnScroll = (e) => {
    const {
      currentTarget: { scrollTop }
    } = e;

    const updateLayers = () =>
      this._layers.forEach(layer => {
        if( typeof layer.setPosition === 'function')
          layer.setPosition(scrollTop)
      })

    if(this.state.stage !== "mounted") return;

    if(this.state.displayStory)
      return updateLayers()

    this._idleTimer.pause()

    this.setState({ displayStory: true, showScroller: false }, updateLayers)
  };

  handleOnIdle = (e) => {
    this.setState({ showScroller: true })
  };

  //
  // Renderers
  // --------------------------------------------------

  render() {
    const { displayStory, displayBkgd } = this.state;
    const { stage, showScroller } = this.state;
    const isMounted = stage === 'mounted'

    const className = classNames('release__cover--album__cover', {
      'release__cover--album__cover--entering': stage === 'entering',
      'release__cover--album__cover--leaving': stage === 'leaving' // && !displayStory// && !displayBkgd
    })
    const classNameAlbum = classNames('release__cover release__cover--album', {
      'release__cover--album--mounted': displayStory
    })
// console.log(this.state)

    return (
      <div
        // onTransitionEnd={this.handleOnTransitionEnd}
        className={classNameAlbum}
      >
        <IdleTimer
          ref={ref => { this._idleTimer = ref }}
          element={document}
          onIdle={this.handleOnIdle}
          startOnMount={false}
          throttle={RELEASE_IDLE_THROTTLE}
          events={RELEASE_USER_EVENTS}
          timeout={RELEASE_IDLE_TIMEOUT} />
        <ReleasesNav
          isMounted={isMounted}
        />
        <ReleasesScrollInvite show={showScroller} />
        <div
          onAnimationEnd={this.handleOnAnimationEnd}
          className={className}
        >
          <Story
            onMounted={this._registerLayer}
            onScroll={this.handleOnScroll}
            onRest={this.handleOnRest}
            displayBkgd={displayBkgd}
            displayStory={displayStory}
          />
        </div>
      </div>
    )
  }
};

export default withRelease(ReleaseAlbum, { id: 'album' });
