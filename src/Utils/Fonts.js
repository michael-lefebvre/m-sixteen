import FontFaceObserver from 'fontfaceobserver';
import { APP_FONTS_LIST, APP_FONTS_TIMEOUT } from 'Constants';

export const ObserveFontsLoading = () => {
  const observers = APP_FONTS_LIST.reduce((a, { name, weight }) => {
    const font = new FontFaceObserver(name, { weight });
    a.push(font.load(null, APP_FONTS_TIMEOUT));
    return a;
  }, []);

  return Promise.all(observers);
  // .then(() => {
  //   console.log('fonts loaded')
  //   return true
  //  })
  // .catch(err => {
  //   console.warn('Some critical font are not available:', err);
  //   return false
  // });
};
