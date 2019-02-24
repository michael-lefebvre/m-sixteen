import React from 'react';
import { Keyframes, animated } from 'react-spring';

const _homeProps = { s: 1, o: 1, t: 0 };
const _releasesProps = { s: 0.95, o: 0, t: 0 };
const _videosProps = { s: 1, o: 0, t: 5 };
const _defaultProps = { immediate: true, to: _homeProps };

const HomeWrapperSpring = Keyframes.Spring({
  entering: _defaultProps,
  mounted: _defaultProps,
  releases_in: { from: _homeProps, to: _releasesProps },
  releases_out: { to: _homeProps, from: _releasesProps },
  videos_in: { from: _homeProps, to: _videosProps },
  videos_out: { to: _homeProps, from: _videosProps }
});

const HomeWrapper = ({ children, state, screen, onNext }) => (
  <HomeWrapperSpring native state={state} onRest={onNext}>
    {({ s, o, t }) => (
      <animated.header
        className={`home home--${screen}`}
        tabIndex="-1"
        style={{ transform: t.interpolate(t => `translateY(-${t}%)`) }}
      >
        <animated.div
          className="home__wrapper"
          style={{
            opacity: o.interpolate(o => o),
            transform: s.interpolate(
              s => `rotate(-${screen === 'large' ? 45 : 0}deg) scale(${s})`
            )
          }}
        >
          {children}
        </animated.div>
      </animated.header>
    )}
  </HomeWrapperSpring>
);

export default HomeWrapper;
