//
// Device types and Motion preferences
// --------------------------------------------------

// `navigator.maxTouchPoints > 0` offers a better detection for touch devices
// but it doesnt work with DevTools Device Mode
export const APP_TOUCH_DEVICE_QUERY = '(hover: none) and (pointer: coarse)';

export const APP_POINTER_DEVICE_QUERY = '(hover: hover) and (pointer: fine)';

export const APP_PREFERS_REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
