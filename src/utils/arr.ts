// Creates an array of elements split into groups the length of size.
// If array can’t be split evenly, the final chunk will be the remaining elements.
//
// arrayToChunks('/releases/split-with-the-missing-23rd/moments/sts-first-releases-party-with-strike-anywhere-and-nmds-2003'.split('/').filter(Boolean), 2)
//
// [
//   [
//     "releases",
//     "split-with-the-missing-23rd"
//   ],
//   [
//     "moments",
//     "sts-first-releases-party-with-strike-anywhere-and-nmds-2003"
//   ]
// ]
//
// https://youmightnotneed.com/lodash/#chunk
// https://stackoverflow.com/a/62231943
export const arrayToChunks = <T>(arr: readonly T[], chunkSize: number, cache: T[][] = []) => {
  const arrayCopy = [...arr];
  if (chunkSize <= 0) return cache;
  while (arrayCopy.length) cache.push(arrayCopy.splice(0, chunkSize));
  return cache;
};
