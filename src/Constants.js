
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
