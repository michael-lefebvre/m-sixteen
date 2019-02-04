
import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { Link } from "react-router-dom";
import { Image } from 'Components';
import ImgLogos from './logos.png'
import './index.scss'

const getInitialState = ({displayStory, isMounted}) => ({
  displayStory,
  isMounted
})

class ReleaseSplitStory extends PureComponent {
  state = getInitialState(this.props);

  static getDerivedStateFromProps(nextProps, prevState) {
    const { displayStory } = nextProps
    if(prevState.displayStory !== displayStory )
      return {
        displayStory,
      }

    return null;
  }

  //
  // Life cycle
  // --------------------------------------------------

  getSnapshotBeforeUpdate(
    prevProps,
    prevState
  ) {
    return !prevProps.isMounted && this.props.isMounted
  }

  componentDidUpdate(
    prevProps,
    prevState,
    snapshot
  ) {
    if (snapshot)
      this.setState({ isMounted: true })
  }

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

    if(!this.state.isMounted)
      return null

    return (
      <div
        className={classNames('split__dotted-mother split__story', {
          'split__story--scroll': this.props.displayStory
        })}
      >
        <div
          className={classNames('split__story__content', {
            'split__story__content--active': this.props.displayStory
          })}
        >
          <div className="split__story__logos">
            <img src={ImgLogos} alt="" />
          </div>
          <div className="split__story__section">
            <Image className="split__photo split__photo--left" src='split/band-1' width="350" />
            <p className="split__story__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dolor quam, dapibus sed risus eget, euismod dapibus massa. Cras sollicitudin auctor orci, eu sollicitudin erat viverra ut. Proin varius consectetur sapien id ornare. Proin a nibh eu nisi feugiat pretium.</p>
            <p className="split__story__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dolor quam, dapibus sed risus eget, euismod dapibus massa. Cras sollicitudin auctor orci, eu sollicitudin erat viverra ut. Proin varius consectetur sapien id ornare. Proin a nibh eu nisi feugiat pretium.</p>
            <p className="split__story__text split__story__clear">Integer ut sodales nunc, pellentesque interdum metus. Suspendisse <Link to="/releases/album">Album</Link> tristique ipsum condimentum malesuada volutpat. Donec leo sapien, ultricies sed lobortis ut, tristique sed est. Cras maximus vulputate congue. Aenean sit amet congue dui. Integer ut consectetur tortor, at congue velit.</p>
          </div>
          <div className="split__story__section">
            <Image className="split__photo" src='split/m23' width="300" />
          </div>
          <div className="split__story__section">
            <Image className="split__photo split__photo--right" src='furia/img-1' width="250" />
            <h3 className="split__story__title">Recording</h3>
            <p className="split__story__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dolor quam, dapibus sed risus eget, euismod dapibus massa. Cras sollicitudin auctor orci, eu sollicitudin erat viverra ut. Proin varius consectetur sapien id ornare. Proin a nibh eu nisi feugiat pretium.</p>
            <p className="split__story__text">Integer ut sodales nunc, pellentesque interdum metus. Suspendisse tristique ipsum condimentum malesuada volutpat. Donec leo sapien, ultricies sed lobortis ut, tristique sed est. Cras maximus vulputate congue. Aenean sit amet congue dui. Integer ut consectetur tortor, at congue velit.</p>
          </div>
          {/*<div className="split__story__section">
            <Video videoId="K9yGAYd_Jjk" className="split__photo" opts={{ width: 320, height: 214 }} style={{ height: 244 }} />
          </div>*/}
          <div className="split__story__section">
            <div className="split__photo__full">
              <Image className="split__photo" src='split/band-1' />
            </div>
          </div>
          <div className="split__story__section">
            <p className="split__story__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dolor quam, dapibus sed risus eget, euismod dapibus massa. Cras sollicitudin auctor orci, eu sollicitudin erat viverra ut. Proin varius consectetur sapien id ornare. Proin a nibh eu nisi feugiat pretium.</p>
            <p className="split__story__text">Integer ut sodales nunc, pellentesque interdum metus. Suspendisse tristique ipsum condimentum malesuada volutpat. Donec leo sapien, ultricies sed lobortis ut, tristique sed est. Cras maximus vulputate congue. Aenean sit amet congue dui. Integer ut consectetur tortor, at congue velit.</p>
          </div>
          <div className="split__story__section">
            <div className="split__story__gallery">
              <Image className="split__photo" src='split/band-1' />
              <Image className="split__photo" src='furia/img-1' />
              <Image className="split__photo" src='split/recording-1' />
              <Image className="split__photo" src='split/band-1' />
              <Image className="split__photo" src='split/recording-1' />
              <Image className="split__photo" src='furia/img-1' />
            </div>
          </div>
        </div>{/* ./split__story__content */}
      </div>
    )
  }
}

export default ReleaseSplitStory;
