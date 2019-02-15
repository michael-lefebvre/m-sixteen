import React from 'react';
import { Keyframes, animated } from 'react-spring';
import './index.scss';

const Bkgd = Keyframes.Spring({
  entering: { o: 1, from: { o: 0 } },
  mounted: { o: 1, from: { o: 0 } },
  leaving: { delay: 500, o: 0 }
});

const Inner = Keyframes.Spring({
  entering: { delay: 200, o: 1, from: { o: 0 } },
  mounted: { o: 1, from: { o: 0 } },
  leaving: { delay: 0, o: 0 }
});

const ReleaseEpCover = ({ children, state, onRest }) => (
  <Bkgd native state={state} onRest={onRest('leaving')}>
    {({ o }) => (
      <animated.div
        className="release__cover release__cover--ep"
        style={{ opacity: o }}
      >
        <Inner native state={state} onRest={onRest('entering')}>
          {({ o }) => (
            <animated.div
              className="release__cover--ep__inner"
              style={{ opacity: o }}
            />
          )}
        </Inner>
        {children}
      </animated.div>
    )}
  </Bkgd>
);

export default ReleaseEpCover;
