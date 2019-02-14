import React, { lazy, Suspense } from 'react';
import classNames from 'classnames'
import { withApp } from 'Hoc'
import ReleasesNav from './Nav'
import './index.scss'

const Album = lazy(() => import('./Album'));
const Split = lazy(() => import('./Split'));
const Ep = lazy(() => import('./Ep'));

// https://codepen.io/2xsamurai/pen/WwmjKQ
export const ReleasesScrollInvite  = ({ show }) => (
  <div className={classNames('release__scroll-invite', { 'release__scroll-invite--show': show })}>
    <div className="release__scroll-invite__mouse">
      <div className="release__scroll-invite__scroller" />
    </div>
  </div>
)

const Releases = ({ isActive, id: { next, current, previous }, scrollInvite }) => (
  <div
    className={classNames('layer releases', {
      'layer--active': isActive,
      [`releases--previous-${previous}`]: previous,
      [`releases--current-${current}`]: current && isActive,
      [`releases--next-${next}`]: next && isActive,
    })}
   >
    <ReleasesNav />
    <ReleasesScrollInvite show={scrollInvite} />
    <Suspense fallback={null}>
      <Album />
      <Split />
      <Ep />
    </Suspense>
  </div>
);

const mapContextToProps = (context) => ({
  isActive: !context.matches('ready.releases.idle'),
  scrollInvite: context.matches('ready.releases.mounted.pending.idle'),
  id: context.context.id,
});

export default withApp(mapContextToProps)(Releases);
