import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { getReleaseStateFromProps } from 'Utils'

import './index.scss'

class ReleasesEp extends PureComponent {

  state = getReleaseStateFromProps(this.props, 'ep');

  static getDerivedStateFromProps(nextProps, prevState) {
    const { active, off, back, viewPort } = getReleaseStateFromProps(nextProps, 'ep');
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


  //
  // Renderers
  // --------------------------------------------------

  render() {
    const {
      active,
      off,
      back,
    } = this.state;

    const className = classNames('releases__cover releases__cover--ep', {
      'releases__cover--ep--in': !off && ( active || back ),
      'releases__cover--current': active,
      'releases__cover--previous': back && !off,
      'releases__cover--ep--out': off
    })

    return (
      <div className={className}>
        <div className="releases__cover--ep__cover" onTransitionEnd={this.props.onReady} />
      </div>
    )
  }
}

export default ReleasesEp
