import { ReleasePage } from '@/types/page';
import { getReleasePath } from '@/utils/path';

export const releasePageList: ReleasePage[] = [
  {
    id: 'ep',
    title: 'Debut EP',
    description: 'Debut EP description',
    path: getReleasePath('debut-ep'),
    importMdx: () => import('./ep.mdx'),
  },
  {
    id: 'album',
    title: 'Self-Titled Album',
    description: 'Album 2010 description',
    path: getReleasePath('self-titled'),
    importMdx: () => import('./album.mdx'),
  },
  {
    id: 'split',
    title: 'Split w/ the Missing 23rd',
    description: 'Split w/ the Missing 23rd description',
    path: getReleasePath('split-with-the-missing-23rd'),
    importMdx: () => import('./split.mdx'),
  },
];

export type ReleaseId = 'ep' | 'album' | 'split';

export const releaseFromId = (id: ReleaseId): ReleasePage =>
  releasePageList.find((release) => release.id === id)!;
