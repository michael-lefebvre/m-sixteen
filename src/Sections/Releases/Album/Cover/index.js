import React from 'react'
import { Spring, animated } from 'react-spring'
import './index.scss'

let _COVERSTRIPES = [];

for(let i = 0; ++i < 12;)
  _COVERSTRIPES.push(i)

const ReleaseAlbumCover = React.forwardRef( ({ displayBkgd, onRest }, _refs) => {

  if(!displayBkgd) return null;
  return (
    <Spring
      native
      from={{ width: 0 }}
      to={{ width: 2000 }}
      onRest={onRest('cover')}
      >
      {style => (
        <animated.div className="release__cover--album__bkgd" style={style}>
          <span className="release__cover--album__bkgd__letters" ref={_refs._cover}>
            <span className="release__cover--album__bkgd__m release__cover--album__bkgd__m--o release__cover--album__bkgd__m--f-" />
            <span className="release__cover--album__bkgd__sixteen">sixteen</span>
          </span>
          <span className="release__cover--album__bkgd__strips">
            {_COVERSTRIPES.map(i =>
              <span className={`release__cover--album__bkgd__strip release__cover--album__bkgd__strip--${i}`} key={`album__cover__stripes__${i}`} />
            )}
          </span>
          <span className="release__cover--album__bkgd__strips release__cover--album__bkgd__strips--odd" ref={_refs._stripes}>
            {_COVERSTRIPES.map(i =>
              <span className={`release__cover--album__bkgd__strip release__cover--album__bkgd__strip--${i} release__cover--album__bkgd__strip--odd--${i}`} key={`album__cover__stripes__odd__${i}`} />
            )}
          </span>
        </animated.div>
      )}
    </Spring>
  );
});

export default ReleaseAlbumCover;
