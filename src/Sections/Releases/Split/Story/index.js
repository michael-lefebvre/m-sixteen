
import React, { PureComponent } from 'react'
import { Link } from "react-router-dom";
import { animated } from 'react-spring'
import { PhotoPath } from 'Utils'

import Video from 'Views/PageVideo'
import './index.scss'

// const getInitialState = (props) => ({
//   displayStory: props.displayStory,
//   opacity: 0,
//   paddingTop: props.paddingTop / (props.displayStory ? 2 : 1)
// })

class ReleaseSplitStory extends PureComponent {
  // state = getInitialState(this.props);
  // _story = React.createRef();

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   const { paddingTop, displayStory } = nextProps
  //   if(
  //     prevState.paddingTop !== paddingTop ||
  //     prevState.displayStory !== displayStory )
  //     return {
  //       opacity: displayStory ? 1 : 0,
  //       paddingTop: paddingTop / (displayStory ? 2 : 1),
  //       displayStory,
  //     }

  //   return null;
  // }

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
    const { translate, opacity } = this.props;

    return (
      <animated.div className="release__story release__story--split" style={{ opacity: opacity.interpolate(o => o) }}>
        <div
          className="release__story__container"
        >
          <animated.div
            className="release__story__content"
            style={{ transform:  translate.interpolate(t => `translateY(${t}px)`) }}
          >
            <div>
              <img className="split__img" src={PhotoPath('split/band-1-md')} width="400" alt="" />
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dolor quam, dapibus sed risus eget, euismod dapibus massa. Cras sollicitudin auctor orci, eu sollicitudin erat viverra ut. Proin varius consectetur sapien id ornare. Proin a nibh eu nisi feugiat pretium.</p>
              <p>Integer ut sodales nunc, pellentesque interdum metus. Suspendisse <Link to="/releases/album">Album</Link> tristique ipsum condimentum malesuada volutpat. Donec leo sapien, ultricies sed lobortis ut, tristique sed est. Cras maximus vulputate congue. Aenean sit amet congue dui. Integer ut consectetur tortor, at congue velit.</p>
            </div>
            <div>
              <img className="split__img" src={PhotoPath('split/band-1-md')} width="300" alt="" />
              <img className="split__img" src={PhotoPath('furia/img-1-md')} width="300" alt="" />
              <Video videoId="K9yGAYd_Jjk" className="page__video--small" opts={{ width: 320, height: 214 }} />
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dolor quam, dapibus sed risus eget, euismod dapibus massa. Cras sollicitudin auctor orci, eu sollicitudin erat viverra ut. Proin varius consectetur sapien id ornare. Proin a nibh eu nisi feugiat pretium.</p>
              <p>Integer ut sodales nunc, pellentesque interdum metus. Suspendisse tristique ipsum condimentum malesuada volutpat. Donec leo sapien, ultricies sed lobortis ut, tristique sed est. Cras maximus vulputate congue. Aenean sit amet congue dui. Integer ut consectetur tortor, at congue velit.</p>
            </div>
          </animated.div>
        </div>
      </animated.div>
    );
  }
}

export default ReleaseSplitStory;
