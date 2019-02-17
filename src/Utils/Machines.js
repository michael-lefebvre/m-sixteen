import _get from 'lodash.get';
import { actions } from 'xstate';

const { log } = actions;

export const actionLog = (label = '') =>
  log((context, event) => ({ context, event }), label);

// const sendToTarget = send((ctx, event) => ({
//   type: `SHOW.${ctx.section.current}`
// }));

export const contextMatch = (obj, str) => {
  const [path, value] = str.split(':');
  return _get(obj, path) === value;
};

export const doesCondMatches = (c1, c2) => (ctx, event) => {
  return contextMatch(ctx, c1) && contextMatch(event, c2);
};
