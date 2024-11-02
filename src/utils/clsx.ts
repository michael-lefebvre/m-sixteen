type ClassValue = ClassArray | ClassDictionary | string | number | null | boolean | undefined;

type ClassDictionary = Record<string, unknown>;
type ClassArray = ClassValue[];

function toVal(mix: ClassValue) {
  let k,
    y,
    str = '';

  if (typeof mix === 'string' || typeof mix === 'number') {
    str += mix;
  } else if (typeof mix === 'object') {
    if (Array.isArray(mix)) {
      for (k = 0; k < mix.length; k++) {
        if (mix[k]) {
          y = toVal(mix[k]);
          if (y) {
            if (str.length) str += ' ';
            str += y;
          }
        }
      }
    } else {
      for (k in mix) {
        if (mix && mix[k]) {
          if (str.length) str += ' ';
          str += k;
        }
      }
    }
  }

  return str;
}

/*
  A simple JavaScript utility for conditionally joining classNames together.
  similar to `JedWatson/classnames`, but much smaller in size.

  clsx('foo', 'bar'); // => 'foo bar'
  clsx('foo', { bar: true }); // => 'foo bar'
  clsx({ 'foo-bar': true }); // => 'foo-bar'
  clsx({ 'foo-bar': false }); // => ''
  clsx({ foo: true }, { bar: true }); // => 'foo bar'
  clsx({ foo: true, bar: true }); // => 'foo bar'

  lots of arguments of various types:
  clsx('foo', { bar: true, duck: false }, 'baz', { quux: true }); // => 'foo bar baz quux'

  other falsy values are just ignored:
  clsx(null, false, 'bar', undefined, 0, 1, { baz: null }, ''); // => 'bar 1'
 */
export const clsx = (...classes: ClassValue[]): string => {
  let i = 0,
    tmp,
    x,
    str = '';
  while (i < classes.length) {
    tmp = classes[i++];
    if (tmp) {
      x = toVal(tmp);
      if (x) {
        if (str.length) str += ' ';
        str += x;
      }
    }
  }
  return str;
};
