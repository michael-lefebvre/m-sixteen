import React, { Fragment } from 'react';
import { Keyframes, animated } from 'react-spring';
import { VIDEOS_ID, RELEASES_ID } from 'Constants';
import Elements from '../Elements';

import './index.scss';

const _homeProps = { s: 1, o: 1, t: 0 };
const _releasesProps = { s: 0.95, o: 0, t: 0 };
const _videosProps = { s: 1, o: 0, t: 5 };
const _defaultProps = { immediate: true, to: _homeProps };

const HomeSpring = Keyframes.Spring({
  entering: _defaultProps,
  mounted: _defaultProps,
  releases_in: { from: _homeProps, to: _releasesProps },
  releases_out: { to: _homeProps, from: _releasesProps },
  videos_in: { from: _homeProps, to: _videosProps },
  videos_out: { to: _homeProps, from: _videosProps }
});

const HeroLarge = ({ state, mounted, onNext, onMounted }) => (
  <HomeSpring native state={state} onRest={onNext}>
    {({ s, o, t }) => (
      <animated.header
        className="home home--desktop"
        tabIndex="-1"
        style={{ transform: t.interpolate(t => `translateY(-${t}%)`) }}
      >
        <animated.div
          className="home__wrapper"
          style={{
            opacity: o.interpolate(o => o),
            transform: s.interpolate(s => `rotate(-45deg) scale(${s})`)
          }}
        >
          <Elements
            native
            state={`large:${state}`}
            onRest={onMounted}
            mounted={mounted}
          >
            {style => (
              <Fragment>
                <Elements.BlockquoteStart style={style} />
                <Elements.Title style={style} />
                <Elements.BlockquoteEnd style={style}>
                  <Elements.BlockquoteEndContent style={style} />
                </Elements.BlockquoteEnd>
                <div className="home__menu">
                  <Elements.Abstract style={style} />
                  <Elements.HomeNav
                    HomeNavActive={style.HomeNavActive}
                    mounted={mounted}
                    translateX={style.ReleasesNavTranslateX}
                    items={RELEASES_ID}
                    section="releases"
                  />
                  <Elements.HomeNav
                    HomeNavActive={style.HomeNavActive}
                    mounted={mounted}
                    translateX={style.VideosNavTranslateX}
                    items={VIDEOS_ID}
                    section="videos"
                  />
                </div>
              </Fragment>
            )}
          </Elements>
        </animated.div>
      </animated.header>
    )}
  </HomeSpring>
);

export default HeroLarge;
