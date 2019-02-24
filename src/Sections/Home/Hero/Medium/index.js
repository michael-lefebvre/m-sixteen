import React from 'react';
import { VIDEOS_ID, RELEASES_ID } from 'Constants';
import Elements from '../Elements';

import './index.scss';

const HeroMedium = ({ state, mounted }) => (
  <Elements native state={`medium:${state}`}>
    {style => (
      <header className="home home--medium" tabIndex="-1">
        <div className="home__wrapper">
          <div className="home--medium__top">
            <div className="home--medium__left">
              <Elements.BlockquoteStart style={style} />
              <Elements.Title style={style} />
            </div>
            <div className="home--medium__right">
              <Elements.HomeNav
                HomeNavActive={style.HomeNavActive}
                mounted={mounted}
                translateX={style.ReleasesNavTranslateX}
                items={RELEASES_ID}
                section="releases"
              />
              <Elements.BlockquoteEnd style={style}>
                <Elements.BlockquoteEndContent style={style} />
              </Elements.BlockquoteEnd>
            </div>
          </div>
          <div className="home--medium__bottom">
            <Elements.Abstract style={style} />
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

export default HeroMedium;
