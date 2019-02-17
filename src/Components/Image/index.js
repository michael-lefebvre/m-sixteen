import React, { PureComponent } from 'react';
import { getPhotoUrl, ImgTracker, ImgPrefetch } from 'Utils';
import './index.scss';

export default class Image extends PureComponent {
  static defaultProps = {
    extension: 'jpg',
    className: ''
  };

  state = {
    isLoaded: false
  };

  _imgRef = React.createRef();

  //
  // Life cycle
  // --------------------------------------------------

  componentDidMount() {
    ImgTracker.observe(this._imgRef.current, this.handleOnVisible);
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    if (this._imgRef.current && !this.state.isLoaded)
      ImgTracker.unobserve(this._imgRef.current);
  }

  //
  // Helpers
  // --------------------------------------------------

  _getImgPath = () => {
    const { src, extension } = this.props;
    const format = this.state.isLoaded ? 'md' : 'sm';
    return getPhotoUrl(`${src}-${format}.${extension}`);
  };

  _getRest = () => {
    const { className, extension, src, ...rest } = this.props;

    return rest;
  };

  //
  // Handlers
  // --------------------------------------------------

  handleOnVisible = () => {
    ImgTracker.unobserve(this._imgRef.current);
    ImgPrefetch(this._getImgPath('md'), true)
      .then(r => this.setState({ isLoaded: true }))
      .catch(e => console.log(e));
  };

  //
  // Render
  // --------------------------------------------------

  render() {
    const { className } = this.props;

    return (
      <img
        ref={this._imgRef}
        src={this._getImgPath()}
        className={`figure__img figure__img--small  ${className}`}
        alt=""
        {...this._getRest()}
      />
    );
  }
}
