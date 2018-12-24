
import React, { PureComponent, Fragment } from 'react'
import { Spring, animated } from 'react-spring'
import classNames from 'classnames'
import { getReleaseStateFromProps } from 'Utils'
// import animatedScrollTo from 'Utils/Scroll'
import Figure    from 'Views/Image'
import Text      from 'Views/PageText'

import './index.scss'

class ReleasesAlbum extends PureComponent {
  state = {
    ...getReleaseStateFromProps(this.props, 'album'),
    displayStory: false,
    bgScroll: 0,
  };

  _bkgd = React.createRef();
  _scrollLock = true;

  static getDerivedStateFromProps(nextProps, prevState) {
    const { active, off, back, viewPort } = getReleaseStateFromProps(nextProps, 'album');
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
        displayStory: active === true
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

  handleOnCoverAnimationEnd = () => {
    // if(this.state.active && this.state.bgScroll === 0)
    //   return animatedScrollTo({ element: this._bkgd.current, to: this.state.viewPort.offsetWidth * .5, duration: 600, callback: () => {
    //     this._scrollLock = false
    //     this.props.onReady()
    //   }})

    return this.setState({ bgScroll: 0 }, () => {
      this._scrollLock = true
      this.props.onReady()
    })
  };

  handleOnScroll = (e) => {
    // if(this._scrollLock) return
    const { viewPort } = this.state;
    const {
      currentTarget: { scrollTop }
    } = e;
    const scrollMax = (3 * viewPort.offsetWidth);
    const bgScroll = Math.floor(((scrollTop * .7) * (viewPort.offsetHeight / 2)) / scrollMax)
    // console.log({scrollTop, scrollMax, bgScroll })
    this.setState({ bgScroll })
  }

  //
  // Renderers
  // --------------------------------------------------

  storyRenderer() {
    const { active, back, displayStory, viewPort } = this.state;

    if( !active && !back )
      return null;

    const transition = {
      active: {
        from: { opacity: 0 },
        to: { opacity: 1 }
      },
      notactive: {
        from: { opacity: 1 },
        to: { opacity: 0 }
      }
    }[displayStory ? 'active' : 'notactive']

    return (
      <Spring
        native
        config={{ delay: active ? 600 : 0 }}
        {...transition}
        >
        {style => (
        <animated.div className="releases__story releases__story--album" style={style}>
          <div className="releases__story__content" style={{ paddingTop: viewPort.offsetWidth * .8}} onScroll={this.handleOnScroll} ref={this._bkgd}>
            <div className="slides" style={{ columnWidth: viewPort.offsetHeight }}>
              <div className="slide">
                <div>
                  <Figure path="album/img-1" />
                  <p>{JSON.stringify(viewPort, null, 2)}</p>
                  <Text
                   className="page__text--album1"
                   title="self-entitled, 2007"
                   paragraphs={[
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dolor quam, dapibus sed risus eget, euismod dapibus massa. Cras sollicitudin auctor orci, eu sollicitudin erat viverra ut. Proin varius consectetur sapien id ornare. Proin a nibh eu nisi feugiat pretium.',
                    'Integer ut sodales nunc, pellentesque interdum metus. Suspendisse tristique ipsum condimentum malesuada volutpat. Donec leo sapien, ultricies sed lobortis ut, tristique sed est. Cras maximus vulputate congue. Aenean sit amet congue dui. Integer ut consectetur tortor, at congue velit.'
                   ]} />
                </div>
              </div>{/* /.slide */}
              <div className="slide">
                <div>
                  <Figure path="album/img-2" />
                  <Text
                   className="page__text--album1"
                   title="self-entitled, 2007"
                   paragraphs={[
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dolor quam, dapibus sed risus eget, euismod dapibus massa. Cras sollicitudin auctor orci, eu sollicitudin erat viverra ut. Proin varius consectetur sapien id ornare. Proin a nibh eu nisi feugiat pretium.',
                    'Integer ut sodales nunc, pellentesque interdum metus. Suspendisse tristique ipsum condimentum malesuada volutpat. Donec leo sapien, ultricies sed lobortis ut, tristique sed est. Cras maximus vulputate congue. Aenean sit amet congue dui. Integer ut consectetur tortor, at congue velit.',
                    'Integer ut sodales nunc, pellentesque interdum metus. Suspendisse tristique ipsum condimentum malesuada volutpat. Donec leo sapien, ultricies sed lobortis ut, tristique sed est. Cras maximus vulputate congue. Aenean sit amet congue dui. Integer ut consectetur tortor, at congue velit.'
                   ]} />
                </div>
              </div>{/* /.slide */}
              <div className="slide">
                <div>
                  {/*<Figure path="album/img-2" />*/}
                  <Text
                   className="page__text--album1"
                   title="self-entitled, 2007"
                   paragraphs={[
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dolor quam, dapibus sed risus eget, euismod dapibus massa. Cras sollicitudin auctor orci, eu sollicitudin erat viverra ut. Proin varius consectetur sapien id ornare. Proin a nibh eu nisi feugiat pretium.',
                    'Integer ut sodales nunc, pellentesque interdum metus. Suspendisse tristique ipsum condimentum malesuada volutpat. Donec leo sapien, ultricies sed lobortis ut, tristique sed est. Cras maximus vulputate congue. Aenean sit amet congue dui. Integer ut consectetur tortor, at congue velit.',
                    'Integer ut sodales nunc, pellentesque interdum metus. Suspendisse tristique ipsum condimentum malesuada volutpat. Donec leo sapien, ultricies sed lobortis ut, tristique sed est. Cras maximus vulputate congue. Aenean sit amet congue dui. Integer ut consectetur tortor, at congue velit.'
                   ]} />
                </div>
              </div>{/* /.slide */}
            </div>
          </div>
        </animated.div>
        )}
      </Spring>
    )
  }

  render() {
    const { active, off, back, bgScroll } = this.state;

    const className = classNames('releases__cover releases__cover--album', {
        'releases__cover--album--in':   active || back
      , 'releases__cover--current':     active
      , 'releases__cover--previous':    back
      , 'releases__cover--album--out':  off
    })

    return (
      <Fragment>
        <div className={className}>
          <div className="releases__cover--album__cover" onAnimationEnd={this.handleOnCoverAnimationEnd}>
            <div style={{ transform: `translateX(-${bgScroll}px)` }} />
          </div>
          {/*<div className="releases__cover--album__bkgd" />*/}
        </div>
        {this.storyRenderer()}
      </Fragment>
    );
  }
}

export default ReleasesAlbum;
