import { ImgHTMLAttributes, ReactEventHandler, Ref, RefObject, useEffect, useRef } from 'react';

import spacerGif from '@/assets/1x1.gif?url';
import { ImageBase } from '@/components/ImageBase';
import { clsx } from '@/utils/clsx';
import { ImgTracker } from '@/utils/img-tracker';

type ImgElementWithDataProp = HTMLImageElement & {
  'data-loaded-src': string | undefined;
  'data-loaded': 'true' | undefined;
  'data-src': string;
};

interface LazyImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  'data-src': string;
  placeholder?: string;
  ref?: Ref<HTMLImageElement>;
}

type OnLoad = ReactEventHandler<HTMLImageElement> | undefined;

// See https://stackoverflow.com/q/39777833/266535 for why we use this ref
// handler instead of the img's onLoad attribute.
function handleLoading(
  img: ImgElementWithDataProp,
  onLoadRef: RefObject<OnLoad | undefined | null>,
) {
  const src = img?.src;
  if (!img || img['data-src'] === src) {
    return;
  }
  img['data-src'] = src;
  const p = 'decode' in img ? img.decode() : Promise.resolve();
  p.catch(() => {}).then(() => {
    if (!img.parentElement || !img.isConnected) {
      // Exit early in case of race condition:
      // - onload() is called
      // - decode() is called but incomplete
      // - unmount is called
      // - decode() completes
      return;
    }
    if (onLoadRef?.current) {
      // Since we don't have the SyntheticEvent here,
      // we must create one with the same shape.
      // See https://reactjs.org/docs/events.html
      const event = new Event('load');
      Object.defineProperty(event, 'target', { writable: false, value: img });
      let prevented = false;
      let stopped = false;
      onLoadRef.current({
        ...event,
        nativeEvent: event,
        currentTarget: img,
        target: img,
        isDefaultPrevented: () => prevented,
        isPropagationStopped: () => stopped,
        persist: () => {},
        preventDefault: () => {
          prevented = true;
          event.preventDefault();
        },
        stopPropagation: () => {
          stopped = true;
          event.stopPropagation();
        },
      });
    }
  });
}

export const LazyImage = (props: LazyImageProps) => {
  const { 'data-src': src } = props;
  const { className, onLoad, placeholder, style, ...rest } = props;
  const ref = useRef<HTMLImageElement>(null);
  const onLoadRef = useRef(onLoad);

  useEffect(() => {
    const imgRef = ref.current;
    if (imgRef && !imgRef.dataset.loaded) {
      const handleOnVisible = () => {
        ImgTracker.unobserve(imgRef);
        imgRef.src = src;
      };
      ImgTracker.observe(imgRef, handleOnVisible);

      return () => {
        ImgTracker.unobserve(imgRef);
      };
    }
  }, [src]);

  return (
    <ImageBase
      {...rest}
      style={{
        ...style,
        backgroundColor: placeholder && `rgb(${placeholder})`,
      }}
      className={clsx('lazy-img', className)}
      loading="lazy"
      decoding="async"
      onLoad={(event) => {
        const img = event.currentTarget as ImgElementWithDataProp;
        const dataSrc = img.dataset.src;
        const srcUrl = new URL(img.src);
        const isSrc = srcUrl.pathname === dataSrc;
        if (isSrc && img.complete) {
          img.dataset.loaded = 'true';
          img.classList.remove('lazy-img');
          handleLoading(img, onLoadRef);
        }
      }}
      ref={ref}
      src={spacerGif}
    />
  );
};
