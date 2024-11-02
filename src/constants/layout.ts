//
// Device types and Motion preferences
// --------------------------------------------------

// `navigator.maxTouchPoints > 0` offers a better detection for touch devices
// but it doesnt work with DevTools Device Mode
export const APP_TOUCH_DEVICE_QUERY = '(hover: none) and (pointer: coarse)';

export const APP_POINTER_DEVICE_QUERY = '(hover: hover) and (pointer: fine)';

export const APP_PREFERS_REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

//
// Discography covers
// --------------------------------------------------

export const DISCOGRAPHY_COVER_SIZES = {
  xs: 48,
  sm: 296,
  md: 316,
  lg: 632,
};

export type DiscographyCoverSize = keyof typeof DISCOGRAPHY_COVER_SIZES;
