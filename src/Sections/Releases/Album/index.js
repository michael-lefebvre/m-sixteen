import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { withRelease } from 'Hoc';
import Story from './Story/index';
import './index.scss';

class ReleaseAlbum extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      state: props.state,
      displayStory: props.story,
      displayBkgd: false
    };

    this._layers = [];
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { state, story: displayStory } = nextProps;

    if (displayStory && !prevState.displayStory)
      return {
        state,
        displayStory
      };

    if (state !== prevState.state)
      return {
        state
      };

    return null;
  }

  //
  // Life cycle
  // --------------------------------------------------

  //
  // Helpers
  // --------------------------------------------------

  _registerLayer = layer => {
    this._layers = this._layers.concat(layer);
  };

  //
  // Events Handlers
  // --------------------------------------------------

  handleOnRest = el => () => {};

  handleOnAnimationEnd = () => {
    const { onNext } = this.props;
    const { displayBkgd, state } = this.state;
    if (state === 'entering' && !displayBkgd)
      return this.setState({ displayBkgd: true }, onNext('entering')());

    if (state === 'leaving') return onNext('leaving')();
  };

  handleOnScroll = e => {
    if (!this.props.story) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    const {
      currentTarget: { scrollTop }
    } = e;

    this._layers.forEach(layer => {
      if (typeof layer.setPosition === 'function') layer.setPosition(scrollTop);
    });
  };

  //
  // Renderers
  // --------------------------------------------------

  render() {
    const { displayStory, displayBkgd, state } = this.state;

    const className = classNames('release__cover--album__cover', {
      'release__cover--album__cover--entering': state === 'entering',
      'release__cover--album__cover--leaving': state === 'leaving'
    });
    const classNameAlbum = classNames('release__cover release__cover--album', {
      'release__cover--album--mounted': displayStory
    });

    return (
      <div className={classNameAlbum}>
        <div onAnimationEnd={this.handleOnAnimationEnd} className={className}>
          <Story
            onMounted={this._registerLayer}
            onScroll={this.handleOnScroll}
            onRest={this.props.onNext}
            displayBkgd={displayBkgd}
            displayStory={displayStory}
          />
        </div>
      </div>
    );
  }
}

export default withRelease(ReleaseAlbum, { release: 'album' });
