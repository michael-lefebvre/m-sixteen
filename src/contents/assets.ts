import { AssetProps } from '@/types/asset';

const assetsSrc: AssetProps[] = [
  {
    width: 305,
    height: 432,
    publicId: 'flyers/2007_06_17',
    // placeholder: '154,114,114',
    kind: 'image',
  },
  {
    publicId: 'm-sixteen/debut-ep/eragny',
    width: 218,
    height: 290,
    kind: 'image',
    placeholder: '125,113,115',
  },
  {
    publicId: 'm-sixteen/debut-ep/poseur2',
    width: 400,
    height: 300,
    kind: 'image',
    placeholder: '147,139,127',
  },
  {
    publicId: 'm-sixteen/debut-ep/isleadan_13',
    width: 350,
    height: 240,
    kind: 'image',
    placeholder: '49,47,58',
  },
  {
    src: '/static/photos/hogsteen/img-1-md.jpg',
    width: 567,
    height: 377,
    publicId: 'photos/hogsteen/img-1-md.jpg',
    kind: 'image',
    placeholder: '129,131,142',
  },
  {
    src: '/static/photos/furia/img-2-md.jpg',
    width: 436,
    height: 291,
    publicId: 'photos/furia/img-2-md.jpg',
    kind: 'image',
    placeholder: '162,159,155',
  },
  {
    width: 512,
    height: 341,
    publicId: 'm-sixteen/videos/rouge',
    kind: 'image',
    placeholder: '162,159,155',
  },
  {
    placeholder: '97,87,83',
    kind: 'image',
    src: '/static/photos/nevers_2007/2.jpg',
    width: 512,
    height: 342,
    publicId: 'photos/nevers_2007/2.jpg',
  },
  {
    placeholder: '93,76,63',
    kind: 'image',
    width: 1350,
    height: 900,
    publicId: 'photos/nevers_2007/xxbx050bwqidahflgvii',
  },
  {
    placeholder: '70,55,44',
    kind: 'image',
    width: 600,
    height: 900,
    publicId: 'photos/nevers_2007/qjaglwndcgdzhldxdpdf',
  },
  {
    placeholder: '97,87,83',
    kind: 'image',
    src: '/static/photos/nevers_2007/nevers2.jpg',
    width: 512,
    height: 342,
    publicId: 'photos/nevers_2007/nevers2.jpg',
  },
  {
    kind: 'image',
    width: 1350,
    height: 900,
    publicId: 'photos/nevers_2007/xxbx050bwqidahflgvii',
    placeholder: '93,76,63',
  },
  {
    kind: 'image',
    width: 600,
    height: 900,
    publicId: 'photos/nevers_2007/qjaglwndcgdzhldxdpdf',
    placeholder: '70,55,44',
  },
  {
    kind: 'image',
    width: 600,
    height: 900,
    publicId: 'photos/nevers_2007/pnjdr7wxh9i5z6phll8e',
    placeholder: '66,86,83',
  },
  {
    kind: 'image',
    width: 600,
    height: 900,
    publicId: 'photos/nevers_2007/t8qjvpujivehysb8lie5',
    placeholder: '90,80,72',
  },
  {
    kind: 'image',
    width: 600,
    height: 900,
    publicId: 'photos/nevers_2007/r1iyebb7weksblbj0sdq',
    placeholder: '80,92,89',
  },
  {
    kind: 'image',
    width: 600,
    height: 900,
    publicId: 'photos/nevers_2007/p59lipg8o3avdeqcbuid',
    placeholder: '58,107,104',
  },
  {
    kind: 'video',
    publicId: 'videos/split_loko_teaser',
    height: 240,
    width: 320,
  },
  {
    placeholder: '255,0,0',
    src: '/static/photos/split/recording-l12-md.jpg',
    width: 400,
    height: 300,
    kind: 'image',
    publicId: 'photos/split/recording-l12-md.jpg',
  },
  {
    src: '/static/videos/loko-preview.mp4',
    height: 240,
    width: 320,
    kind: 'video',
    publicId: '/static/videos/loko-preview.mp4',
  },
  {
    publicId: 'videos/the-change_banska-b',
    width: 640,
    height: 480,
    kind: 'video',
  },
  {
    publicId: 'videos/the-change_banska-b.jpg',
    src: 'https://res.cloudinary.com/m-sixteen/video/upload/f_auto,q_auto/v1/videos/the-change_banska-b.jpg',
    width: 640,
    height: 480,
    kind: 'video',
    // placeholder: '97,63,45',
    // placeholder: '255,0,0',
  },
  {
    src: 'https://res.cloudinary.com/m-sixteen/video/upload/c_scale,w_240/du_10,so_40/ac_none/videos/the-change_banska-b.mp4',
    width: 240,
    height: 180, // ratio rounded 2.66: 480/2.66 = 180
    kind: 'video',
    publicId: 'videos/the-change_banska-b.mp4',
  },
  {
    publicId: 'videos/shaihulud',
    // source: 'youtube',
    src: 'https://youtu.be/iKuVj7a3Cj8',
    width: 640,
    height: 480,
    kind: 'video',
  },
];

const assetsDic = assetsSrc.reduce(
  (acc, asset) => {
    acc[asset.publicId] = asset;
    return acc;
  },
  {} as Record<string, AssetProps>,
);

export const assets = new Map<string, AssetProps>(Object.entries(assetsDic));

export const getAssetByPublicId = (publicId: string): AssetProps | undefined => {
  if (!assets.has(publicId)) {
    console.error(`No asset found for publicId: ${publicId}`);
    return undefined;
  }
  return assets.get(publicId);
};
