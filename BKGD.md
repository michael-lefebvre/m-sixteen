props | desc | state
------|------|------
hasBkgdVideo | device allow video |
homeState | Home machine state | idle, entering, mounted, releases_in, releases_out, videos_in, videos_out
playerIsReady | YT player emit `onReady` event | boolean
playerState | if player ready, video state | null, playVideo, pauseVideo
currentTime | if player ready, current video time | null, number
posterDisplayed | if currentTime not null and playerState === pauseVideo
