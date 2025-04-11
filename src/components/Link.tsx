import {
  memo,
  useCallback,
  useMemo,
  type AnchorHTMLAttributes,
  type DetailedHTMLProps,
} from 'react';

import { useIsActivePath } from '@/hooks/useIsActivePath';
import { push } from '@/utils/navigation';

type AnchorProps = DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;

type Config = { active: boolean };

type LinkProps = Omit<AnchorProps, 'className' | 'style' | 'children'> & {
  href: string;
  className?: AnchorProps['className'] | ((config: Config) => AnchorProps['className']);
  style?: AnchorProps['style'] | ((config: Config) => AnchorProps['style']);
  children?: AnchorProps['children'] | ((config: Config) => AnchorProps['children']);
  exact?: boolean;
};

export const Link = memo(
  ({ className, style, onClick: originalOnClick, href, children, exact, ...props }: LinkProps) => {
    const realHref = useMemo(() => href, [href]);
    const isActive = useIsActivePath(realHref, exact);

    const config = useMemo<Config>(() => ({ active: isActive }), [isActive]);

    const onClick = useCallback(
      (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        const currentTarget = event.currentTarget;
        const url = new URL(event.currentTarget.href, window.location.origin);
        const currentLocation = new URL(window.location.href, window.location.origin);
        const hasDifferentOrigin = url.origin !== currentLocation.origin;
        const hasModifier = currentTarget.download != '' || currentTarget.target != '';
        const hasMetaKey = event.metaKey || event.ctrlKey;
        const isSamePage = url.pathname === currentLocation.pathname;
        if (isSamePage) {
          event.preventDefault();
          return;
        }

        const shouldRunDefaultBehavior = hasDifferentOrigin || hasModifier || hasMetaKey;

        if (originalOnClick != undefined) {
          originalOnClick(event);
        }

        if (!shouldRunDefaultBehavior) {
          event.preventDefault();
          push(url.pathname);
        }
      },
      [originalOnClick],
    );

    return (
      <a
        {...props}
        style={typeof style === 'function' ? style(config) : style}
        className={typeof className === 'function' ? className(config) : className}
        onClick={onClick}
        href={realHref}
      >
        {typeof children === 'function' ? children(config) : children}
      </a>
    );
  },
);
