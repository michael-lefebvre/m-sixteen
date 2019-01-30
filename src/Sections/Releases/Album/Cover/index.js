
import React from 'react'
import { Spring, animated } from 'react-spring'
import { withApp } from 'Contexts/App'
import { roundToEven } from 'Utils'
import './index.scss'

const COVER_STRIPES = Array(12).fill().map((x,i)=>i);

const AlbumCover = ({ height, width, right, onRest }) => (
  <Spring
    native
    from={{ w: 0 }}
    to={{ w: 100 }}
    onRest={onRest('cover')}
    >
    {({w}) => (
      <div className="album__cover" style={{ width, right, height }}>
        <animated.div className="album__cover__stripes" style={{ width: w.interpolate(w => `${w}%`) }}>
          <div className="album__cover__m" />
          {COVER_STRIPES.map(i =>
            <div className={`album__cover__stripe album__cover__stripe--${i}`} key={`album__cover__stripes__${i}`} />
          )}
        </animated.div>
      </div>
    )}
  </Spring>
);

const mapAppContextToProps = (state, { factor }) => {
  const { offsetWidth, offsetHeight } = state.getViewPort();
  const height = roundToEven(offsetWidth * factor);
  const width = roundToEven(Math.sqrt(Math.pow(offsetHeight, 2) + Math.pow(height, 2)))
  const right = offsetWidth - height;

  return {
    width,
    right,
    height
  }
};

export default withApp(mapAppContextToProps)(AlbumCover);

