import React, { PureComponent, Fragment } from 'react'
import classNames from 'classnames'
import withRelease from '../Release';
import { ReleasesNav } from '../index';
import Cover from './Cover';
import Story from './Story';
import './index.scss'

const STRIPES_WIDTH = 42;
const M_LETTER_BASE = 68;

class ReleaseAlbum extends PureComponent {
  state = {
    stage: this.props.stage,
    displayStory: false,
    displayBkgd: false,
  };

  _refs = {
    _cover: React.createRef(),
    _stripes: React.createRef(),
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { stage } = nextProps;
    if(
      stage === 'leaving' && prevState.displayStory
    )
      return {
        displayStory: false
      }

    return null;
  }

  //
  // Life cycle
  // --------------------------------------------------

  // componentDidMount() {}

  //
  // Helpers
  // --------------------------------------------------

  //
  // Events Handlers
  // --------------------------------------------------

  handleOnRest = (el) => () => {
    if(this.props.stage === 'leaving' && el === 'story')
      this.setState({ displayBkgd: false })
  };

  handleOnScroll = ({scrollTop, offsetWidth }) => {
    const stripesRatio = offsetWidth / 4;
    const y = ( scrollTop * STRIPES_WIDTH ) / stripesRatio
    const stripes_hidden = y < STRIPES_WIDTH;
    const letterPos = !stripes_hidden ? ( ( y * 1.2 ) - M_LETTER_BASE ) : 0
    const letterOpacity = !stripes_hidden ? 1 - ((scrollTop - stripesRatio) / (stripesRatio * .95)) : 1
    this._refs._stripes.current.style.transform = `translateY(-${stripes_hidden ? y : STRIPES_WIDTH}px)`
    this._refs._cover.current.style.transform = `translate(-${letterPos}px, -${letterPos}px)`
    this._refs._cover.current.style.opacity = letterOpacity >= 0 ? letterOpacity : 0
  };

  handleOnAnimationEnd = () => {
    const { stage, onRest } = this.props;
    const { displayBkgd, displayStory } = this.state;
    if( stage === 'entering' && !displayBkgd )
      return this.setState({ displayBkgd: true, displayStory: true }, onRest)
    if( stage === 'leaving' && !displayStory )
      return onRest()
  }

  //
  // Renderers
  // --------------------------------------------------

  render() {
    const { displayStory, displayBkgd } = this.state;
    const { stage } = this.props;

    const className = classNames('release__cover--album__cover', {
      'release__cover--album__cover--entering': stage === 'entering',
      'release__cover--album__cover--leaving': stage === 'leaving' && !displayStory
    })

    return (
      <Fragment>
        <ReleasesNav isMounted={stage === 'mounted'} onClose={this.props.onClose} />
        <div className="release__cover release__cover--album">
          <div className={className} onAnimationEnd={this.handleOnAnimationEnd}>
            <Cover displayBkgd={displayBkgd} onRest={this.handleOnRest} ref={this._refs} />
          </div>
          <Story displayBkgd={displayBkgd} displayStory={displayStory} onRest={this.handleOnRest} onScroll={this.handleOnScroll} />
        </div>
      </Fragment>
    )
  }
};

export default withRelease(ReleaseAlbum, { id: 'album' });
