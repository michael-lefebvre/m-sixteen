import { PhotoProps } from '@/types/media';
import { assets } from './assets';

export const photos: PhotoProps[] = [
  {
    publicId: 'm-sixteen/debut-ep/eragny',
    alt: 'live at Eragny',
    caption: 'live at Eragny',
  },
  {
    publicId: 'm-sixteen/debut-ep/poseur2',
    alt: 'poseur at Nice',
    caption: 'poseur at Nice',
  },
  {
    publicId: 'm-sixteen/debut-ep/isleadan_13',
    alt: 'first live Isleadan',
    caption: 'first live @Isleadan 2001',
  },
  {
    publicId: 'photos/hogsteen/img-1-md.jpg',
  },
  {
    publicId: 'photos/furia/img-2-md.jpg',
  },
  {
    publicId: 'm-sixteen/videos/rouge',
  },
];

export const photosDic = photos.reduce(
  (acc, photo) => {
    acc[photo.publicId] = photo;
    return acc;
  },
  {} as Record<string, PhotoProps>,
);

export const getPhotoByPublicId = (publicId: string) => {
  const fromDic = photosDic[publicId];
  if (!fromDic) {
    throw new Error(`Photo with publicId "${publicId}" not found`);
  }
  const fromAssets = assets.get(publicId);
  if (!fromAssets) {
    throw new Error(`Asset with publicId "${publicId}" not found`);
  }
  return { ...fromDic, ...fromAssets };
};
