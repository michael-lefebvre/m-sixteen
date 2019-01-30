import React from 'react';
import classNames from 'classnames'
import { Transition, animated } from 'react-spring'
import ReleasesContext from 'Contexts/Releases'
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

export const ReleasesNav  = ({ onClose, isMounted }) => {
  return (
    <div className="releases-nav" onClick={onClose}>
      <Transition
        native
        items={isMounted}
        from={{ position: 'absolute', overflow: 'hidden', height: 0 }}
        enter={[{ height: 'auto' }]}
        leave={{ height: 0 }}>
        {mounted =>
          mounted && (props => <animated.div style={props}>close</animated.div>)
        }
      </Transition>
    </div>
  )
}

const Releases = () => (
  <ReleasesContext>
    <Layer section="releases" className="releases">
      <Album />
      <Split />
      <Ep />
    </Layer>
  </ReleasesContext>
);

export default Releases
