import React, { Fragment } from 'react';
import { VIDEOS_ID, RELEASES_ID } from 'Constants';
import HomeWrapper from '../HomeWrapper';
import Elements from '../Elements';

import './index.scss';

const HeroLarge = ({ state, mounted, onNext, onMounted }) => (
  <HomeWrapper state={state} onNext={onNext} screen="large">
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
  </HomeWrapper>
);

export default HeroLarge;
