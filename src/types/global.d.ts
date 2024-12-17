interface Scheduler {
  postTask: (cb: () => void, options: { priority: string }) => void;
}

declare global {
  interface Window {
    __historyLengthOnStart: number;
    cssPath: string;
  }

  // eslint-disable-next-line no-var
  var scheduler: Scheduler;
}

// Should be unnecessary with the latest React@19 codemods
// declare module 'mdx/types' {
//   namespace JSX {
//     type Element = runtime.JSX.Element;
//     type ElementClass = runtime.JSX.ElementClass;
//     type IntrinsicElements = runtime.JSX.IntrinsicElements;
//   }
// }

export {};
