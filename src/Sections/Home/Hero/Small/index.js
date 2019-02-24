import React from 'react';
import { VIDEOS_ID, RELEASES_ID } from 'Constants';
import Elements from '../Elements';

import './index.scss';

const HeroSmall = ({ state, mounted }) => (
  <Elements native state={`small:${state}`}>
    {style => (
      <header className="home home--small" tabIndex="-1">
        <div className="home__wrapper">
          <div className="home--small__top">
            <Elements.BlockquoteStart style={style} />
            <div>
              <Elements.Abstract style={style} />
              <Elements.Title style={style} />
            </div>
          </div>
          <div className="home--small__bottom">
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
        </div>
      </header>
    )}
  </Elements>
);

export default HeroSmall;
