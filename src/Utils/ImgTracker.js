export default class ImgTracker {
  static observedImages = new Map();

  static Observer =
    'IntersectionObserver' in window
      ? new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (entry.intersectionRatio > 0) {
                let elt = entry.target;
                ImgTracker.observedImages.get(elt)();
                ImgTracker.unobserve(elt);
              }
            });
          },
          {
            rootMargin: '50px 0px',
            threshold: 0.01
          }
        )
      : null;

  static observe(elt, callback) {
    if (ImgTracker.Observer != null) {
      ImgTracker.Observer.observe(elt);
      ImgTracker.observedImages.set(elt, callback);
    } else {
      callback();
    }
  }

  static unobserve(elt) {
    if (ImgTracker.Observer != null) {
      ImgTracker.observedImages.delete(elt);
      ImgTracker.Observer.unobserve(elt);
    }
  }
}
