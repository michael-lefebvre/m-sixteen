//
// Break Points
// --------------------------------------------------

export const MEDIA_QUERIES_LIST = [
  {
    match: '(min-width: 1281px)',
    device: 'desktop',
    orientation: null
  },
  {
    match: '(max-width: 1280px) and (min-width: 1025px)',
    device: 'laptop',
    orientation: null
  },
  {
    match: '(max-width: 1024px) and (min-width: 768px)',
    device: 'tablet',
    orientation: 'portrait'
  },
  {
    match:
      '(max-width: 1024px) and (min-width: 768px) and (orientation: landscape)',
    device: 'tablet',
    orientation: 'landscape'
  },
  {
    match: '(max-width: 767px) and (min-width: 481px)',
    device: 'mobile',
    orientation: 'landscape'
  },
  {
    match: '(max-width: 480px) and (min-width: 320px)',
    device: 'mobile',
    orientation: 'portrait'
  }
];

export const MEDIA_QUERIES_BY_MATCH = MEDIA_QUERIES_LIST.reduce(
  (prev, { match, device, orientation }) => {
    prev[match] = { device, orientation };
    return prev;
  },
  {}
);

//
// Break Points
// --------------------------------------------------

export const SCROLLBAR_WIDTH = (function() {
  var outer, outerStyle, scrollbarWidth;
  if (!document) return 0;
  outer = document.createElement('div');
  outerStyle = outer.style;
  outerStyle.position = 'absolute';
  outerStyle.width = '100px';
  outerStyle.height = '100px';
  outerStyle.overflow = 'scroll';
  outerStyle.top = '-9999px';
  if (document.body !== null) document.body.appendChild(outer);
  scrollbarWidth = outer.offsetWidth - outer.clientWidth;
  if (document.body !== null) document.body.removeChild(outer);
  return scrollbarWidth;
})();

//
// Idle
// --------------------------------------------------

export const RELEASE_IDLE_TIMEOUT = 1000 * 3;
export const STORY_TRIGGER_THROTTLE = 500;
export const STORY_TRIGGER_EVENTS = [
  // 'mousemove',
  'wheel',
  'DOMMouseScroll',
  'mouseWheel',
  // 'mousedown',
  'touchstart',
  'touchmove',
  'MSPointerDown',
  'MSPointerMove'
];

//
// RELEASES
// --------------------------------------------------

export const RELEASES = {
  album: {
    title: 'Album'
  },
  split: {
    title: 'Split w/ the Missing 23rd'
  },
  ep: {
    title: 'Debut EP'
  }
};
export const RELEASES_ID = Object.keys(RELEASES);
export const RELEASES_COVERS = RELEASES_ID.map(id => `covers/${id}.jpg`);

//
// VIDEOS
// --------------------------------------------------

export const VIDEOS = {
  nevers: {
    videoId: 'PhDboaR01zY',
    title: 'Live at Nevers, FR',
    description: 'Nov. 16 2007, Le café charbon'
  },
  rouge: {
    videoId: 'Fj8WOeQamvw',
    title: 'Rouge',
    description: 'music video'
  }
};

export const VIDEOS_ID = Object.keys(VIDEOS);
export const VIDEOS_THUMBS = VIDEOS_ID.map(id => `videos/${id}-md.jpg`);

//
// App Loading
// --------------------------------------------------

export const APP_FONTS_LIST = [
  { name: 'Open Sans', weight: 400 },
  { name: 'Open Sans', weight: 700 },
  { name: 'Open Sans', weight: 800 },
  // { name: 'Open_Sans', weight: 900 },
  { name: 'Rubik', weight: 500 },
  { name: 'IM Fell English' },
  { name: 'Zilla Slab' }
];
export const APP_FONTS_TIMEOUT = 5000;
export const APP_IMAGES_ONLOAD = RELEASES_COVERS.concat(VIDEOS_THUMBS);

export const HOME_BKGD_VIDEOID = 'Pdni_p27l_0';
