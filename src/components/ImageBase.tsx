import type { ImgHTMLAttributes, Ref } from 'react';

export interface ImageBaseProps extends ImgHTMLAttributes<HTMLImageElement> {
  ref?: Ref<HTMLImageElement>;
}

export const ImageBase = (props: ImageBaseProps) => {
  return <img {...props} />;
};
