export const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';

export const isFunction = (obj: unknown): obj is CallableFunction => obj instanceof Function;
