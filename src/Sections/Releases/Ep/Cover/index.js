import React from 'react'
import { Keyframes, animated } from 'react-spring'
import './index.scss'

const Bkgd = Keyframes.Spring({
  entering: { delay: 0, o: 1, from: { o: 0 } },
  leaving: { delay: 500, o: 0 },
})

const Inner = Keyframes.Spring({
  entering: { delay: 200, o: 1, t: 0, from: { o: 0, t: 5 } },
  leaving: { delay: 0, o: 0, t: 5 },
})

const ReleaseEpCover = ({ stage, onRest }) => (
  <Bkgd native state={stage} onRest={onRest('bkgd')}>
    {({ o }) => (
      <animated.div className="release__cover release__cover--ep" style={{ opacity: o }}>
        <Inner native state={stage} onRest={onRest('inner')}>
          {({ o, t }) => (
          <animated.div className="release__cover--ep__inner" style={{ transform: t.interpolate(t => `translateX(${t}%)`), opacity: o }} />
          )}
        </Inner>
      </animated.div>
    )}
  </Bkgd>
);

export default ReleaseEpCover;
