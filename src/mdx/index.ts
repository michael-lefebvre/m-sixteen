import { momentPageList } from '@/mdx/moments';
import { releasePageList } from '@/mdx/releases';
import { VideoPage } from '@/types/page';

// TEMP

const videoPageList: VideoPage[] = [
  {
    id: '_IG6yXX8r4I',
    title: 'Live at Nevers, FR',
    description: 'Nov. 16 2007, Le café charbon',
    path: '/videos/live-nevers-2007',
    source:
      'https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/rabbit320.mp4',
    height: 240,
    width: 320,
  },
  {
    id: 'iV8GV8fxLdI',
    title: 'Rouge',
    description: 'music video',
    path: '/videos/rouge',
    source: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    height: 540,
    width: 960,
  },
  {
    id: 'iV8GV8fxLdI',
    title: 'Feed by anger',
    description: 'Live at Selencha, Serbia',
    path: '/videos/feed-by-anger-selencha-serbia',
    source:
      'https://mdn.github.io/learning-area/javascript/apis/video-audio/finished/video/sintel-short.mp4',
    height: 306,
    width: 480,
  },
  {
    id: 'iV8GV8fxLdI',
    title: 'Shai Hulud Opening',
    description: 'Understress live at Paris',
    path: '/videos/understress-shai-hulud',
    source: 'https://cdn.glitch.me/94aeb0f1-3796-4bdf-acdd-ccba5a23cfbf/desktop.mp4?v=1',
    height: 480,
    width: 1280,
  },
];

export const allMdxPosts = [...momentPageList, ...releasePageList, ...videoPageList];
