import { MdxPage } from '@/types/page';

export const momentPageList: MdxPage[] = [
  {
    id: 'earlyyears',
    title: 'The early years',
    description: 'The early years description',
    path: '/moments/early-years',
    importMdx: () => import('./early-years.mdx'),
  },
  {
    id: 'splitreleaseparty',
    title: 'STS first releases party w/ Strike Anywhere + NMDS + Strike Back',
    description: 'First release party description',
    path: '/moments/sts-releases-party-with-strike-anywhere-and-nmds-2003',
    importMdx: () => import('./split-release-party.mdx'),
  },
  {
    id: 'shootingrouge',
    title: 'Shooting "Rouge" video',
    description: 'Shooting "Rouge" video description',
    path: '/moments/shooting-rouge-video',
    importMdx: () => import('./shooting-rouge.mdx'),
  },
  {
    id: 'furiasound',
    title: 'Furia Sound Festival 2004',
    description: 'Furia Sound Festival 2004 description',
    path: '/moments/furia-sound-festival-2004',
    importMdx: () => import('./furia-sound.mdx'),
  },
  {
    id: 'hogsteen',
    title: 'The Hogsteen tour 2004',
    description: 'The Hogsteen tour 2004 description',
    path: '/moments/hogsteen-tour-2004',
    importMdx: () => import('./hogsteen-tour.mdx'),
  },
];
