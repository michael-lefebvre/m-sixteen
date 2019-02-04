
//
// Break Points
// --------------------------------------------------

export const MEDIA_QUERIES_LIST = [
  {
    match: '(min-width: 1281px)',
    device: 'desktop',
    orientation: null,
  },
  {
    match: '(max-width: 1280px) and (min-width: 1025px)',
    device: 'laptop',
    orientation: null,
  },
  {
    match: '(max-width: 1024px) and (min-width: 768px)',
    device: 'tablet',
    orientation: 'portrait',
  },
  {
    match: '(max-width: 1024px) and (min-width: 768px) and (orientation: landscape)',
    device: 'tablet',
    orientation: 'landscape',
  },
  {
    match: '(max-width: 767px) and (min-width: 481px)',
    device: 'mobile',
    orientation: 'landscape',
  },
  {
    match: '(max-width: 480px) and (min-width: 320px)',
    device: 'mobile',
    orientation: 'portrait',
  },
];

export const MEDIA_QUERIES_BY_MATCH = MEDIA_QUERIES_LIST.reduce(
  (prev, {match, device, orientation}) => {
    prev[match] = {device, orientation}
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
  outer = document.createElement("div");
  outerStyle = outer.style;
  outerStyle.position = "absolute";
  outerStyle.width = "100px";
  outerStyle.height = "100px";
  outerStyle.overflow = "scroll";
  outerStyle.top = "-9999px";
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
]
