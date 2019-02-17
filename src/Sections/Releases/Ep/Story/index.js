import React, { useEffect, useState } from 'react';
import { Spring } from 'react-spring';
import { Image } from 'Components';

import './index.scss';

const ReleaseEpStory = ({ state, story }) => {
  const [show, setState] = useState(null);

  useEffect(() => {
    if (state === 'leaving') setState(null);
    if (story === true) setState(true);
  }, [state, story]);

  if (show === null) return null;

  return (
    <Spring
      // immediate={!show}
      // reverse={!show}
      from={{ opacity: 0 }}
      to={{ opacity: 1 }}
    >
      {props => (
        <div className="release__story release__story--ep" style={props}>
          <div className="ep__story">
            <div className="ep__row">
              <div className="ep__cell">
                <div
                  className="ep__photo"
                  style={{
                    width: 350,
                    transform: 'rotate(-2deg)',
                    marginLeft: '5vw'
                  }}
                  data-dust="20"
                >
                  <Image src="ep/band-1" width="350" />
                </div>
              </div>
              <div className="ep__cell">
                <h1 className="ep__title__1">
                  Debut EP<small> • 2001</small>
                </h1>
                <p className="ep__intro ep__glitch">
                  Evening was in the wood, louring with storm. A time of drought
                  had sucked the weedy pool and baked the channels; birds had
                  done with song.
                </p>
              </div>
            </div>
            <div className="ep__row">
              <ul className="ep__trackslist">
                <li>• Music for assholes</li>
                <li>• M-Sixteen</li>
                <li>• Me, myself & I</li>
                <li>• Reject</li>
                <li>• Welcome in an utopic world</li>
                <li>• Competition for life</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </Spring>
  );
};

export default ReleaseEpStory;
