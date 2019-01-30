import React, { Fragment } from 'react'
import { Keyframes, animated/*, config*/ } from 'react-spring'
import classNames from 'classnames'
import delay from 'delay'
import ImgBkgd from './bkgd.png'
import ImgMother from './mother.png'
import './index.scss'

const Cover = Keyframes.Spring({
  open: async (next, cancel, { onRest }) => {
    await delay(100)
    next({ sB: 0, from: { sB: 100, sC: 100, mO: 0, mT: 5, pC: 0, cL: 0, bT: 0 } })
    await delay(300)
    next({ sC: 0 })
    await delay(500)
    next({ pC: 100 })
    await delay(200)
    next({ mT: 0 })
    await delay(100)
    next({ mO: 1 })
    await delay(500)
    await onRest()
  },
  story: async (next, cancel, { onRest }) => {
    await delay(200)
    next({ mO: 0 })
    await delay(200)
    next({ cL: 25, bT: 25 })
    await delay(500)
    await onRest()
  },
  // leaving: async (next, cancel, ownProps) => {
  //   await delay(600)
  //   // next({ sO: 0 })
  //   // await delay(300)
  //   // next({ oC: 0 })
  //   // await next({ lB: 100, config: config.default })
  //   // ownProps.onRest()
  // },
})

const ReleaseSplitCover = ({ stage, onRest, displayStory }) => (
  <Cover
    native
    state={stage}
    onRest={onRest('bkgd')}
  >
    {({ sB, sC, mO, mT, pC, cL, bT }) => (
      <Fragment>
        <animated.div
          className={classNames('split-container split__cover', { 'split__cover--story': displayStory })}
          style={{
            left: cL.interpolate(p => `${p}%`),
          }}
        >
          <animated.div
            className="split-container split__cover__bkgd split__dotted-mother"
            style={{
              transform: bT.interpolate(p => `translateX(-${p}%)`),
            }}
          >
            <animated.div
              className="split__cover__stripe split__cover__stripe--bkgd"
              style={{
                transform: sB.interpolate(p => `translateX(-${p}%)`),
              }}
            />
          </animated.div>
          <animated.div
            className="split__cover__img split__cover__img--pattern"
            style={{
              clipPath: pC.interpolate(p => `polygon(0 0, 0% 100%, ${p}% 100%, ${p}% 0)`),
            }}
          >
            <img src={ImgBkgd} alt="" />
          </animated.div>
          <animated.div
            className="split__cover__stripe split__cover__stripe--content"
            style={{
              transform: sC.interpolate(p => `translateX(${p}%)`),
            }}
          >
            <div className="split__cover__arrow" />
          </animated.div>
        </animated.div>{/* ./split__cover */}
        <animated.div
          className="split__cover__img split__cover__img--mother"
          style={{
            opacity: mO.interpolate(p => p),
            transform: mT.interpolate(p => `translateX(-${p}%)`),
          }}
        >
          <img src={ImgMother} alt="" />
        </animated.div>
      </Fragment>
    )}
  </Cover>
);

export default ReleaseSplitCover;
