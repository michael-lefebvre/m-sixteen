// Alternative for "any function" ((...args: any[]) => any) without using any
//
// source: https://stackoverflow.com/a/75645622/3908378
//
type SomeFunction = (...args: never) => unknown;

// How to add leading as options for throttle function?
// When leading is set to true, the function will be executed immediately on the first call.
// This means the function is triggered at the beginning of the wait period.
// For example, if you are throttling a function on a scroll event with a leading option,
// the function will be called as soon as the scroll starts.
//
// source: https://stackoverflow.com/a/79118267/3908378
//
export function throttle(fn: SomeFunction, wait = 100, { leading = false } = {}) {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let lastTime = leading ? -Infinity : Date.now();

  const execute = (...args: never) => {
    lastTime = Date.now();
    fn(...args);
  };

  return (...args: never) => {
    const currentTime = Date.now();
    const elapsed = currentTime - lastTime;
    if (elapsed >= wait) {
      // If enough time has passed since the last call, execute the function immediately
      execute(...args);
    } else {
      // If not enough time has passed, schedule the function call after the remaining delay
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        execute(...args);
        timeoutId = undefined;
      }, wait - elapsed);
    }
  };
}
