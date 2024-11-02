import { VideoPage } from '@/types/page';
import { getVideoPath } from '@/utils/path';

export const videoPageList: VideoPage[] = [
  {
    id: 'livenevers2007',
    title: 'Live at Nevers, FR',
    description: 'Nov. 16 2007, Le café charbon',
    path: getVideoPath('live-nevers-2007'),
  },
  {
    id: 'rouge',
    title: 'Rouge',
    description: 'music video',
    path: getVideoPath('rouge'),
  },
  {
    id: 'feedbyanger',
    title: 'Feed by anger',
    description: 'Live at Selencha, Serbia',
    path: getVideoPath('feed-by-anger-selencha-serbia'),
  },
  {
    id: 'shaihulud',
    title: 'Shai Hulud Opening',
    description: 'Understress live at Paris',
    path: getVideoPath('understress-shai-hulud'),
  },
];

export const videoFromSlug = (slug: string): VideoPage => {
  const pathToTest = getVideoPath(slug);
  const video = videoPageList.find((p) => p.path === pathToTest);
  if (!video) {
    throw new Error(`Video not found: ${slug}`);
  }
  return video;
};
