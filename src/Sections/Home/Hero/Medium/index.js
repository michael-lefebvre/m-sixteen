import React, { Fragment } from 'react';
import { VIDEOS_ID, RELEASES_ID } from 'Constants';
import HomeWrapper from '../HomeWrapper';
import Elements from '../Elements';

import './index.scss';

const HeroMedium = ({ state, mounted, onNext }) => (
  <HomeWrapper state={state} onNext={onNext} screen="medium">
    <Elements native state={`medium:${state}`}>
      {style => (
        <Fragment>
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
        </Fragment>
      )}
    </Elements>
  </HomeWrapper>
);

export default HeroMedium;
