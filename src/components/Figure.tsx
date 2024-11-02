import type { FC, HTMLProps, PropsWithChildren, ReactNode } from 'react';

import { clsx } from '@/utils/clsx';

type FigureProps = HTMLProps<HTMLElement> & {
  children: ReactNode;
  className?: string;
  caption?: string;
};

export const Figure: FC<PropsWithChildren<FigureProps>> = ({
  children,
  caption,
  className,
  ...props
}) => (
  <figure
    className={clsx('figure', className)}
    {...props}
  >
    <div className="figure__thumb">{children}</div>
    <figcaption className="figure__caption">
      <span>{caption}</span>
    </figcaption>
  </figure>
);
