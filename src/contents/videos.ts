import { VideoProps } from '@/types/media';
import { assets } from './assets';

// TEMPORARY, must be merged with the `VideoProps` sources
export const videos: VideoProps[] = [
  {
    // date: ['2003', '7'],
    // format: 'mp4',
    // kind: 'video',
    publicId: 'videos/split_loko_teaser',
    // height: 240,
    // width: 320,
    title: 'Split Loko Teaser',
    caption: 'A teaser for the Split CD. Footage from the recording in the Loko Studio in 2004',
    // poster: 'photos/split/recording-l12-md.jpg',
    poster: 'photos/nevers_2007/nevers2.jpg',
    // poster: {
    //   placeholder: '255,0,0',
    //   src: '/static/photos/split/recording-l12-md.jpg',
    //   width: 400,
    //   height: 300,
    //   kind: 'image',
    //   format: 'jpg',
    //   publicId: 'photos/split/recording-l12-md.jpg',
    // },
    // preview: {
    //   src: '/static/videos/loko-preview.mp4',
    //   height: 240,
    //   width: 320,
    //   kind: 'video',
    //   format: 'mp4',
    //   publicId: '/static/videos/loko-preview.mp4',
    // },
  },
  {
    publicId: 'videos/the-change_banska-b',
    // format: 'mp4',
    // width: 640,
    // height: 480,
    // kind: 'video',
    title: 'The change (Banska B, Slovakia)',
    caption: 'Live in Banska Bystrica, Slovakia',
    poster: 'videos/the-change_banska-b.jpg',
    // poster: {
    //   publicId: 'videos/the-change_banska-b.jpg',
    //   src: 'https://res.cloudinary.com/m-sixteen/video/upload/f_auto,q_auto/v1/videos/the-change_banska-b.jpg',
    //   format: 'jpg',
    //   width: 640,
    //   height: 480,
    //   kind: 'video',
    //   // placeholder: '97,63,45',
    //   // placeholder: '255,0,0',
    // },
    preview: 'videos/the-change_banska-b.mp4',
    // preview: {
    //   src: 'https://res.cloudinary.com/m-sixteen/video/upload/c_scale,w_240/du_10,so_40/ac_none/videos/the-change_banska-b.mp4',
    //   width: 240,
    //   height: 180, // ratio rounded 2.66: 480/2.66 = 180
    //   kind: 'video',
    //   format: 'mp4',
    //   publicId: 'videos/the-change_banska-b.mp4',
    // },
  },
  {
    publicId: 'videos/shaihulud',
    source: 'youtube',
    // src: 'https://youtu.be/iKuVj7a3Cj8',
    // format: 'mp4',
    // width: 640,
    // height: 480,
    // kind: 'video',
    title: 'Shai Hulud Opening',
    caption: 'Understress live at Paris',
    poster: 'videos/shaihulud.jpg',
    // poster: {
    //   publicId: 'videos/shaihulud.jpg',
    //   src: 'https://i9.ytimg.com/vi_webp/iKuVj7a3Cj8/mq1.webp?sqp=COz-lbkG&rs=AOn4CLBMwf9HCASywEVbjX_mB39xTa8-Dg',
    //   format: 'jpg',
    //   width: 640,
    //   height: 480,
    //   kind: 'image',
    //   placeholder: '255,0,0',
    // },
  },
  {
    publicId: 'videos/nevers',
    // src: 'https://vimeo.com/936124',
    source: 'vimeo',
    title: 'Live in Nevers, France',
    caption: '4 songs from the concert in Nevers, France',
    poster: 'videos/nevers-lg.jpg',
    // width: 640,
    // height: 480,
    // kind: 'video',
    // format: 'mp4',
    // date: ['2007', '11', '16'],
    // poster: {
    //   placeholder: '255,0,0',
    //   width: 512,
    //   height: 342,
    //   kind: 'video',
    //   format: 'jpg',
    //   src: '/static/videos/nevers-lg.jpg',
    //   publicId: 'videos/nevers-lg.jpg',
    // },
    // preview: {
    //   src: '/static/videos/nevers-preview.mp4',
    //   width: 240,
    //   height: 180,
    //   kind: 'video',
    //   format: 'mp4',
    //   publicId: 'videos/nevers-preview.mp4',
    // },
  },
];

export const videosDic = videos.reduce(
  (acc, video) => {
    acc[video.publicId] = video;
    return acc;
  },
  {} as Record<string, VideoProps>,
);

export const getVideoByPublicId = (publicId: string) => {
  const fromDic = videosDic[publicId];
  if (!fromDic) {
    throw new Error(`Video with publicId "${publicId}" not found`);
  }
  const fromAssets = assets.get(publicId);
  if (!fromAssets) {
    throw new Error(`Asset with publicId "${publicId}" not found`);
  }
  return { ...fromDic, ...fromAssets };
};
