import { isBrowser } from './is';

export class ImgTracker {
  static observedImages = new Map<Element, CallableFunction>();

  static Observer =
    isBrowser && typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.intersectionRatio > 0) {
                const elt = entry.target;
                const cb = ImgTracker.observedImages.get(elt);
                if (cb) cb();
                ImgTracker.unobserve(elt);
              }
            });
          },
          {
            rootMargin: '50px 50px',
            threshold: 0.01,
          },
        )
      : null;

  static observe(elt: Element, callback: CallableFunction) {
    if (ImgTracker.Observer != null) {
      ImgTracker.Observer.observe(elt);
      ImgTracker.observedImages.set(elt, callback);
    } else {
      callback();
    }
  }

  static unobserve(elt: Element) {
    if (ImgTracker.Observer != null) {
      ImgTracker.observedImages.delete(elt);
      ImgTracker.Observer.unobserve(elt);
    }
  }
}
