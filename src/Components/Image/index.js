import React, { PureComponent, Fragment } from 'react';
import { caf, raf, getPhotoUrl } from 'Utils';
import './index.scss';

const getImages = ({ src, extension }) => ({
  imgSmall: getPhotoUrl(`${src}-sm.${extension}`),
  imgMedium: getPhotoUrl(`${src}-md.${extension}`)
});

export default class Image extends PureComponent {
  static defaultProps = {
    extension: 'jpg',
    className: '',
    offset: 0,
    partialVisibility: true
  };

  state = {
    isVisible: false,
    ...getImages(this.props)
  };

  _refs = {
    small: React.createRef(),
    medium: React.createRef()
  };

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
    if (!this.state.isVisible) this._rafRef = raf(this._isComponentVisible);
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    if (this._rafRef !== null) caf(this._rafRef);
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
    if (
      !this._refs.small.current ||
      !this._refs.small.current.getBoundingClientRect
    )
      return;

    const html = document.documentElement;
    const boundingClientRect = this._refs.small.current.getBoundingClientRect();
    const windowWidth = window.innerWidth || html.clientWidth;
    const windowHeight = window.innerHeight || html.clientHeight;

    const isVisible = this._isVisible(
      boundingClientRect,
      windowWidth,
      windowHeight
    );

    if (!isVisible) this._rafRef = raf(this._isComponentVisible);
    else {
      this._rafRef = null;
      this.setState({ isVisible });
    }
  };

  //
  // Handlers
  // --------------------------------------------------

  handleOnLoad = ref => () => {
    this._refs[ref].current.classList.add('figure__img--loaded');
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
    } = this.props;

    return (
      <Fragment>
        {this.state.isVisible && (
          <img
            ref={this._refs.medium}
            className={`figure__img figure__img--medium ${className}`}
            // className="figure__img figure__img--medium"
            src={this.state.imgMedium}
            onLoad={this.handleOnLoad('medium')}
            alt=""
            {...rest}
          />
        )}
        <img
          ref={this._refs.small}
          src={this.state.imgSmall}
          className={`figure__img figure__img--small  ${className}`}
          // className="figure__img figure__img--small"
          onLoad={this.handleOnLoad('small')}
          alt=""
          {...rest}
        />
      </Fragment>
    );
  }
}
