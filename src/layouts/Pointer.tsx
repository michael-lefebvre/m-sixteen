import type { FC, PropsWithChildren, ReactNode } from 'react';

import { Link } from '@/components/Link';
import { ENV_BASE_URL } from '@/constants';

const styleFnc = ({ active }: { active: boolean }) => ({
  color: active ? 'red' : undefined,
});

export const PointerLayout: FC<PropsWithChildren<{ children: ReactNode }>> = ({ children }) => {
  return (
    <div>
      <h1>
        <Link href={ENV_BASE_URL}>m-sixteen</Link>
      </h1>
      <h3>Pointer Layout</h3>

      <ul>
        <li>
          <Link
            href="/releases/debut-ep"
            style={styleFnc}
          >
            debut-ep
          </Link>
        </li>
        <li>
          <Link
            href="/releases/split-with-the-missing-23rd"
            exact={false}
            style={styleFnc}
          >
            split
          </Link>
        </li>
        <li>
          <Link
            href="/releases/self-titled"
            style={styleFnc}
          >
            album
          </Link>
        </li>
        <li>
          <Link
            href="/m-sixteen/videos/rouge"
            style={styleFnc}
          >
            video rouge
          </Link>
        </li>
        <li>
          <Link
            href="/videos/feed-by-anger-selencha-serbia"
            style={styleFnc}
          >
            video feed-by-anger
          </Link>
        </li>
        {/* <li>
          <Link
            href="/moments/sts-releases-party-with-strike-anywhere-and-nmds-2003/videos/rouge"
            style={styleFnc}
          >
            moment party, video rouge
          </Link>
        </li> */}
        <li>
          <Link
            href="/moments/early-years"
            style={styleFnc}
          >
            moment early years
          </Link>
        </li>
        {/* <li>
          <Link
            href="/releases/split-with-the-missing-23rd/moments/sts-releases-party-with-strike-anywhere-and-nmds-2003/videos/rouge"
            style={styleFnc}
          >
            split, moment party, video rouge
          </Link>
        </li>
        <li>
          <Link
            href="/releases/split-with-the-missing-23rd/moments/sts-releases-party-with-strike-anywhere-and-nmds-2003"
            style={styleFnc}
          >
            split, moment party
          </Link>
        </li> */}
        <li>
          <Link href="/moments/sts-releases-party-with-strike-anywhere-and-nmds-2003/releases/split-with-the-missing-23rd">
            wrong order moment party, split
          </Link>
        </li>
        <li>
          <Link
            href="https://open.spotify.com/intl-fr/album/3FkvXpNquCTwt2Riy9ekue?si=igdPvMF5ROWbkE_mT_OkpQ"
            target="_blank"
          >
            external link
          </Link>
        </li>
      </ul>
      <hr />

      {children}
    </div>
  );
};
