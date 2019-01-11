
import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { getReleaseStateFromProps } from 'Utils'

// import Figure    from 'Views/Image'
// import Text      from 'Views/PageText'

import './index.scss'

const getInitialState = (props) => ({
  ...getReleaseStateFromProps(props, 'split'),
  hasScrolled: false,
  backgroundPosition: '0px center',
  backgroundPositionCover: '0px center, 0 center',
  opacity: 1,
  opacityContent: 0,
  paddingTop: props.viewPort.offsetHeight
})

class ReleasesSplit extends PureComponent {
  state = getInitialState(this.props);
  _story = React.createRef();

  static getDerivedStateFromProps(nextProps, prevState) {
    const { active, off, back, viewPort } = getReleaseStateFromProps(nextProps, 'split');
    if(
      prevState.active !== active ||
      prevState.off !== off ||
      prevState.back !== back ||
      prevState.viewPort !== viewPort
    )
      return {
        active,
        off,
        back,
        viewPort,
        opacityContent: active && prevState.hasScrolled ? 1 : 0,
      }

    return null;
  }

  //
  // Life cycle
  // --------------------------------------------------

  getSnapshotBeforeUpdate(prevProps, prevState) {
    return prevState.off && !this.state.off;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(snapshot)
      this.setState(getInitialState(this.props), () => {
        this._story.current.scrollTop = 0
      })
  }

  //
  // Helpers
  // --------------------------------------------------

  //
  // Events Handlers
  // --------------------------------------------------

  handleOnCoverAnimationEnd = () => {
    this.props.onReady()
  };

  handleOnScroll = (e) => {
    const {
      currentTarget: { scrollTop }
    } = e;

    if(!this.state.hasScrolled && scrollTop > 0)
      this.setState({
        hasScrolled: true,
        backgroundPosition: '400px center',
        backgroundPositionCover: '400px center, 0 center',
        opacity: 0,
        opacityContent: 1,
        // paddingTop: this.props.viewPort.offsetHeight * .4
      })
  };

  //
  // Renderers
  // --------------------------------------------------

  render() {
    // const { viewPort } = this.props;
    const {
      active,
      off,
      back,
      backgroundPosition,
      backgroundPositionCover,
      // opacity,
      hasScrolled,
      opacityContent,
      paddingTop
    } = this.state;

    const className = classNames('releases__cover releases__cover--split', {
        'releases__cover--split--in':   active || back
      , 'releases__cover--current':     active
      , 'releases__cover--previous':    back
      , 'releases__cover--split--out':  off
    })

    // const backgroundPosition = `${hasScrolled ? 400 : 0}px center`;
    // const backgroundPositionCover = `${hasScrolled ? 400 : 0}px center, 0 center`;
    const opacity = active ? hasScrolled ? 0 : 1 : 0;
    // const opacityContent = active && hasScrolled ? 1 : 0;
    // const paddingTop = viewPort.offsetHeight * (hasScrolled ? .5 : 1)

    return (
      <div className={className}>
        <div className="releases__cover--split__container">
          <div className="releases__cover--split__bkgd" style={{ backgroundPosition }} />
          <div className="releases__cover--split__cover" style={{ backgroundPosition: backgroundPositionCover }} onTransitionEnd={this.handleOnCoverAnimationEnd} />
          <div className="releases__cover--split__face" style={{ opacity }} />
          <div className="releases__story releases__story--split" style={{ opacity: opacityContent }}>
            <div className="releases__story__container" onScroll={this.handleOnScroll} ref={this._story}>
              <div className="releases__story__content" style={{ paddingTop }}>
                <div>
                  <img className="split__img" src={`${process.env.PUBLIC_URL}/static/photos/split/band-1-md.jpg`} width="400" alt="" />
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dolor quam, dapibus sed risus eget, euismod dapibus massa. Cras sollicitudin auctor orci, eu sollicitudin erat viverra ut. Proin varius consectetur sapien id ornare. Proin a nibh eu nisi feugiat pretium.</p>
                  <p>Integer ut sodales nunc, pellentesque interdum metus. Suspendisse tristique ipsum condimentum malesuada volutpat. Donec leo sapien, ultricies sed lobortis ut, tristique sed est. Cras maximus vulputate congue. Aenean sit amet congue dui. Integer ut consectetur tortor, at congue velit.</p>
                </div>
                <div>
                  <img className="split__img" src={`${process.env.PUBLIC_URL}/static/photos/split/band-1-md.jpg`} width="300" alt="" />

                  <img className="split__img" src={`${process.env.PUBLIC_URL}/static/photos/furia/img-1-md.jpg`} width="300" alt="" />

                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dolor quam, dapibus sed risus eget, euismod dapibus massa. Cras sollicitudin auctor orci, eu sollicitudin erat viverra ut. Proin varius consectetur sapien id ornare. Proin a nibh eu nisi feugiat pretium.</p>
                  <p>Integer ut sodales nunc, pellentesque interdum metus. Suspendisse tristique ipsum condimentum malesuada volutpat. Donec leo sapien, ultricies sed lobortis ut, tristique sed est. Cras maximus vulputate congue. Aenean sit amet congue dui. Integer ut consectetur tortor, at congue velit.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReleasesSplit;
