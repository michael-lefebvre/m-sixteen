import React, { Fragment } from 'react'
import { Keyframes, animated, config } from 'react-spring'
import delay from 'delay'
import { withApp } from 'Contexts/App'
import './index.scss'

const Cover = Keyframes.Spring({
  entering: async (next, cancel, { onRest, offsetHeight }) => {
    await delay(300)
    next({ rB: 0, from: { rB: 100, lB: 0, pB: 0, rC: 100, lC: 0, oC: 1, pC: 0, oF: 0, sO: 0, sT: (offsetHeight * .3) }, config: config.slow })
    await delay(200)
    next({ rC: 0, config: config.slow  })
    await delay(400)
    next({ oF: 1, config: config.slow })
    await delay(600)
    next({ pB: 400, pC: 400, oF: 0, config: { tension: 280, friction: 60 }})
    await delay(500)
    next({ sT: 0, sO: 1, config: config.slow})
    onRest()
  },
  leaving: async (next, cancel, ownProps) => {
    await delay(300)
    next({ sO: 0 })
    await delay(300)
    next({ oC: 0, config: config.slow })
    await next({ lB: 100, config: config.default })
    ownProps.onRest()
  },
})

const ReleaseSplitCover = ({ stage, onRest, children, offsetHeight }) => (
  <div className="release__cover releases__cover--split">
    <Cover
      native
      state={stage}
      offsetHeight={offsetHeight}
      onRest={onRest('bkgd')}
    >
      {({ rB, lB, pB, rC, lC, pC, oC, oF, sO, sT }) => (
        <Fragment>
          <animated.div
            className="release__cover--split__bkgd"
            style={{
              backgroundPosition: pB.interpolate(p => `${p}px center`),
              right: rB.interpolate(r => `${r}%`),
              left: lB.interpolate(l => `${l}%`),
            }} />
          <animated.div
            className="release__cover--split__cover"
            style={{
              backgroundPosition: pC.interpolate(p => `${p}px center, 0 center`),
              right: rC.interpolate(r => `${r}%`),
              left: lC.interpolate(l => `${l}%`),
              opacity: oC.interpolate(o => o),
            }} />
          <animated.div
            className="release__cover--split__face"
            style={{
              right: 0,
              opacity: oF.interpolate(o => o),
            }} />
          {/*children*/}
          {React.cloneElement(children, {
            translate: sT,
            opacity: sO,
          })}
        </Fragment>
      )}
    </Cover>
  </div>
);

// export default ReleaseSplitCover;
const mapAppContextToProps = state => ({
  offsetHeight: state.getViewPort().offsetHeight
});

export default withApp(mapAppContextToProps)(ReleaseSplitCover);
