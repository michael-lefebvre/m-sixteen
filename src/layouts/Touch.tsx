import type { FC, PropsWithChildren, ReactNode } from 'react';

export const TouchLayout: FC<PropsWithChildren<{ children: ReactNode }>> = ({ children }) => {
  return (
    <div>
      <h1>Touch Layout</h1>
      {children}
    </div>
  );
};
