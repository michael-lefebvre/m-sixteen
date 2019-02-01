import React from 'react';
import classNames from 'classnames'
import Layer from 'Components/Layer';
import Album from './Album'
import Split from './Split'
import Ep from './Ep'
import './index.scss'

// const _DEBUG = false;

// https://codepen.io/2xsamurai/pen/WwmjKQ
export const ReleasesScrollInvite  = ({ show }) => (
  <div className={classNames('release__scroll-invite', { 'release__scroll-invite--show': show })}>
    <div className="release__scroll-invite__mouse">
      <div className="release__scroll-invite__scroller" />
    </div>
  </div>
)

const Releases = () => (
  <Layer section="releases" className="releases">
    <Album />
    <Split />
    <Ep />
  </Layer>
);

export default Releases
