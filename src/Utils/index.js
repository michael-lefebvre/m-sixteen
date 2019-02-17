import { Globals, animated } from 'react-spring';
import { getStaticUrl } from './Paths';

export { default as StoryTrigger } from './StoryTrigger';
export { default as ImgTracker } from './ImgTracker';
export * from './ImgPrefetch';
export * from './Machines';
export * from './Fonts';

export const getComponentName = Component =>
  Component.displayName || Component.name || 'Component';

export const AnimatedDiv = animated(Globals.defaultElement);
export const raf = cb => Globals.requestFrame(cb);
export const caf = cb => Globals.cancelFrame(cb);

const defaultRouteProps = { match: { params: { section: 'home', id: null } } };

export const getRouteParams = ({ match: { params } }) => params;
export const getRouteSection = (props = null) =>
  getRouteParams(props || defaultRouteProps).section;
export const getRouteId = (props = null) =>
  getRouteParams(props || defaultRouteProps).id;

export const getImageUrl = path => getStaticUrl(`images/${path}`);
export const getPhotoUrl = path => getStaticUrl(`photos/${path}`);
export const getVideoUrl = path => getStaticUrl(`videos/${path}`);

export const getViewport = () => {
  const { width, height } = document.body.getBoundingClientRect();
  return {
    width,
    height
  };
};
export const roundToEven = n => 2 * Math.round(n / 2);

export const getNavImgSrc = (section, item) => {
  switch (section) {
    case 'releases':
      return getStaticUrl(`covers/${item}.jpg`);
    case 'videos':
      return getStaticUrl(`videos/${item}-md.jpg`);
    // case 'shows': return getStaticUrl(`covers/${item}.jpg`)
    default:
    // do nothing
  }
};

// https://github.com/MicheleBertoli/react-automata/blob/master/src/utils.js#L12
export const stringify = (state, path = []) => {
  if (typeof state === 'string') {
    return path.concat(state).join('.');
  }

  return Object.keys(state).reduce(
    (prev, key) => prev.concat(stringify(state[key], path.concat(key))),
    []
  );
};
