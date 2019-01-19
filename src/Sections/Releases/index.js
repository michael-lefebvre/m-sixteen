import React from 'react';
import { Transition, animated } from 'react-spring'
import ReleasesContext from 'Contexts/Releases'
import Layer from 'Components/Layer';
import Album from './Album'
import Split from './Split'
import Ep from './Ep'
import './index.scss'

// const _DEBUG = false;


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
