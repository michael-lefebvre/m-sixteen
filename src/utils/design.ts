/** intToPx(): append `px` unit to a number */
export const intToPx = (int: number): string => `${int}px`;

/** pxTo(): converts a `px` value to `rem` or `em` value */
export const pxTo = (value: unknown, base: number = 16, unit: string = 'rem'): string =>
  `${parseFloat('' + value) / base}${unit}`;

/** toPx(): converts `rem` or `em` to `px` */
export const toPx = (value: unknown, base: number = 16): string =>
  `${parseFloat('' + value) * base}px`;

/** parseUnit(): parses a number and unit string, and returns the unit used */
export const parseUnit = (str: string): string => {
  const arr = str.trim().match(/[\d.\-+]*\s*(.*)/);
  return arr?.[1] ?? '';
};

export const fixFloat = (f: number) => +parseFloat('' + f).toFixed(5);

export const pxToPt = (px: number) => fixFloat((px * 1.04) / 100);
