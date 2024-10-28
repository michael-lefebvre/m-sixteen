declare global {
  interface Window {
    __historyLengthOnStart: number;
    cssPath: string;
  }
}

declare module 'mdx/types' {
  namespace JSX {
    type Element = runtime.JSX.Element;
    type ElementClass = runtime.JSX.ElementClass;
    type IntrinsicElements = runtime.JSX.IntrinsicElements;
  }
}

export {};
