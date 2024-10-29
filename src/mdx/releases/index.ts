import { ReleasePage } from '@/types/page';

export const releasePageList: ReleasePage[] = [
  {
    id: 'ep',
    title: 'Debut EP',
    description: 'Debut EP description',
    path: '/releases/debut-ep',
    importMdx: () => import('./ep.mdx'),
  },
  {
    id: 'album',
    title: 'Self-Titled Album',
    description: 'Album 2010 description',
    path: '/releases/self-titled',
    importMdx: () => import('./album.mdx'),
  },
  {
    id: 'split',
    title: 'Split w/ the Missing 23rd',
    description: 'Split w/ the Missing 23rd description',
    path: '/releases/split-with-the-missing-23rd',
    importMdx: () => import('./split.mdx'),
  },
];
