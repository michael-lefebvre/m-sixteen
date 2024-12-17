// execute a callback when the browser is idle
// Source: https://github.com/aidenybai/react-scan/blob/f5f8f2960bd74314af69a53172d52ecc47276f04/packages/scan/src/core/web/utils.ts#L3
// Usage: https://github.com/aidenybai/react-scan/blob/f5f8f2960bd74314af69a53172d52ecc47276f04/packages/scan/src/core/monitor/utils.ts#L98
export const onIdle = (callback: () => void) => {
  if ('scheduler' in globalThis) {
    return globalThis.scheduler.postTask(callback, {
      priority: 'background',
    });
  }
  if ('requestIdleCallback' in window) {
    return requestIdleCallback(callback);
  }
  return setTimeout(callback, 0);
};
