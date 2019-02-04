import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { withRelease } from 'Hoc'
import Story from './Story/index';
import './index.scss'

class ReleaseAlbum extends PureComponent {

  constructor( props ){
    super( props )

    this.state = {
      stage: props.state.toStrings()[0],
      displayStory: props.state.matches('mounted.story'),
      displayBkgd: false,
    };

    this._layers = [];
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { state } = nextProps
    const stage = state.toStrings()[0]
    const displayStory = state.matches('mounted.story')

    if(displayStory && !prevState.displayStory)
      return {
        stage,
        displayStory
      }

    if( stage !== prevState.stage)
      return {
        stage
      }

    return null;
  }

  //
  // Life cycle
  // --------------------------------------------------

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
  };

  handleOnAnimationEnd = () => {
    const { onNext } = this.props;
    const { displayBkgd, stage } = this.state;
    if( stage === 'entering' && !displayBkgd )
      return this.setState({ displayBkgd: true }, onNext('entering'))

    if( stage === 'leaving')
      return onNext('leaving.animate')
  };

  handleOnScroll = (e) => {
    if(!this.props.state.matches('mounted.story')) {
      e.preventDefault()
      e.stopPropagation();
      return false;
    }

    const {
      currentTarget: { scrollTop }
    } = e;

    this._layers.forEach(layer => {
      if( typeof layer.setPosition === 'function')
        layer.setPosition(scrollTop)
    })
  };

  //
  // Renderers
  // --------------------------------------------------

  render() {
    const { displayStory, displayBkgd, stage } = this.state;

    const className = classNames('release__cover--album__cover', {
      'release__cover--album__cover--entering': stage === 'entering',
      'release__cover--album__cover--leaving': stage === 'leaving'
    })
    const classNameAlbum = classNames('release__cover release__cover--album', {
      'release__cover--album--mounted': displayStory
    })

    return (
      <div
        className={classNameAlbum}
      >
        <div
          onAnimationEnd={this.handleOnAnimationEnd}
          className={className}
        >
          <Story
            onMounted={this._registerLayer}
            onScroll={this.handleOnScroll}
            onRest={this.props.onNext}
            displayBkgd={displayBkgd}
            displayStory={displayStory}
          />
        </div>
      </div>
    )
  }
};

export default withRelease(ReleaseAlbum, { release: 'album' });
