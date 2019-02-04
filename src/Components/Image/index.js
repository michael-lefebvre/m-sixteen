import React, { PureComponent, Fragment } from 'react'
import { caf, raf, getPhotoUrl } from 'Utils'
// import './styles.scss'

const getImages = ({src, extension}) => ({
  imgSmall: getPhotoUrl(`${src}-sm.${extension}`),
  imgMedium: getPhotoUrl(`${src}-md.${extension}`)
})

export default class Image extends PureComponent {
  static defaultProps = {
    extension: 'jpg',
    className: '',
    offset: 0,
    partialVisibility: true,
  };

  state = {
    isVisible: false,
    ...getImages(this.props)
  };

  _imgSmall = React.createRef();
  _imgMedium  = React.createRef();

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   const { isVisible } = nextProps
  //   if(prevState.isVisible !== isVisible )
  //     return {
  //       isVisible,
  //     }

  //   return null;
  // }

  //
  // Life cycle
  // --------------------------------------------------

  componentDidMount() {
    if(!this.state.isVisible)
      this._rafRef = raf(this._isComponentVisible)
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
    if(this._rafRef !== null)
      caf(this._rafRef)
  }

  //
  // Helpers
  // --------------------------------------------------

  _isVisible = (
    { top, left, bottom, right, width, height },
    windowWidth,
    windowHeight
  ) => {
    const { offset, partialVisibility } = this.props;

    if (top + right + bottom + left === 0) {
      return false;
    }

    const topThreshold = 0 - offset;
    const leftThreshold = 0 - offset;
    const widthCheck = windowWidth + offset;
    const heightCheck = windowHeight + offset;

    return partialVisibility
      ? top + height >= topThreshold &&
          left + width >= leftThreshold &&
          bottom - height <= heightCheck &&
          right - width <= widthCheck
      : top >= topThreshold &&
          left >= leftThreshold &&
          bottom <= heightCheck &&
          right <= widthCheck;
  };

  _isComponentVisible = () => {
    // isComponentVisible might be called from componentDidMount, before component ref is assigned
    if (!this._imgSmall.current || !this._imgSmall.current.getBoundingClientRect) return;

    const html = document.documentElement;
    const boundingClientRect = this._imgSmall.current.getBoundingClientRect();
    const windowWidth = window.innerWidth || html.clientWidth;
    const windowHeight = window.innerHeight || html.clientHeight;

    const isVisible = this._isVisible(
      boundingClientRect,
      windowWidth,
      windowHeight
    );

    if(!isVisible)
      this._rafRef = raf(this._isComponentVisible)
    else {
      this._rafRef = null
      this.setState({ isVisible })
    }
  };

  //
  // Handlers
  // --------------------------------------------------

  handleOnSmallLoaded = () => {
    this._imgSmall.current.style.opacity = 1;
  };

  handleOnMediumLoaded = () => {
    this._imgMedium.current.style.opacity = 1;
    this._imgSmall.current.style.display = 'none';
  };

  handleOnClick = () => {
    // if( !this.props.video )
    //   return

    // this.props.openVideo( this.props.video )
  };

  //
  // Render
  // --------------------------------------------------

  render() {
    const {
      className,
      extension,
      src,
      offset,
      partialVisibility,
      ...rest
    } = this.props

    return (
      <Fragment>
        { this.state.isVisible && (
          <img
            ref={this._imgMedium}
            className={`page__image page__image__medium ${className}`}
            src={this.state.imgMedium}
            onLoad={this.handleOnMediumLoaded}
            style={{ opacity: 0 }}
            alt=""
            {...rest}
          />
        )}
        <img
          ref={this._imgSmall}
          src={this.state.imgSmall}
          className={`page__image page__image__small ${className}`}
          onLoad={this.handleOnSmallLoaded}
          style={{ opacity: 0 }}
          alt=""
          {...rest}
        />
      </Fragment>
    )
  }
}
