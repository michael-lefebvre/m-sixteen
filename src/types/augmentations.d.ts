import 'react';

type CSSPropertiesWithVariables = {
  [key in `--${string}`]: string | number;
};

declare module 'react' {
  export interface CSSProperties extends CSSPropertiesWithVariables {}
  export namespace JSX {
    interface HTMLAttributes {
      popover?: 'auto' | 'manual' | true;
    }

    // Note this doesn't cover <input type="button"/>
    interface ButtonHTMLAttributes {
      popovertarget?: string;
    }

    interface CustomEventHandlersCamelCase {
      onBeforeToggle?: (event: ToggleEvent) => void;
      onToggle?: (event: ToggleEvent) => void;
    }
  }
}
