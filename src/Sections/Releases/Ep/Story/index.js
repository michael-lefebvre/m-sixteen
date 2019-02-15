import React, { useEffect, useState } from 'react';
import { Spring } from 'react-spring';

const ReleaseEpStory = ({ story }) => {
  const [show, setState] = useState(null);

  useEffect(() => {
    if (story === true) setState(true);
  }, [story]);
  // console.log({ story, show, reverse: !show, immediate: !show })
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
          <h1>EP</h1>
        </div>
      )}
    </Spring>
  );
};

export default ReleaseEpStory;
