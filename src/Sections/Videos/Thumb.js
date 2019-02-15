import React, { useContext } from 'react';
import { VideoContext } from 'Contexts';
import { getPhotoUrl } from 'Utils';

const Thumb = ({ onClick }) => {
  const { videoId, state, playerState, playerReady } = useContext(VideoContext);

  if (!videoId || state === 'idle') return null;

  const isPayling = playerState === 'playVideo';
  const showSpinner = state !== 'leaving' && !playerReady;
  const style = {
    backgroundImage: `url(${getPhotoUrl(`videos/${videoId}-md.jpg`)})`,
    opacity: isPayling ? 0 : 1,
    pointerEvents: playerReady && isPayling ? 'none' : 'auto'
  };

  return (
    <div onClick={onClick} className="videos__thumb" style={style}>
      {showSpinner && (
        <div className="videos__spinner">
          <div />
          <div />
          <div />
          <div />
        </div>
      )}
    </div>
  );
};

export default Thumb;
