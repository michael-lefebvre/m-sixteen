import { momentPageList } from '@/mdx/moments';
import { releasePageList } from '@/mdx/releases';
import { videoPageList } from '@/mdx/videos';

export const allMdxPosts = [...momentPageList, ...releasePageList];

export const allPosts = [...allMdxPosts, ...videoPageList];
