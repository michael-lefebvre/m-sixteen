import React from 'react';

export const getInitialContext = () => ({
  playerState: 'pauseVideo',
  playerReady: false,
  videoId: null,
  state: 'idle'
});

const VideoContext = React.createContext(getInitialContext());

export const { Provider, Consumer } = VideoContext;

export default VideoContext;
