import { Machine, assign, send } from 'xstate';
import _merge from 'lodash.merge';
import { ObserveFontsLoading, ImgPrefetch, ImgsPrefetch } from 'Utils';
// import { actionLog } from 'Utils'
import home from './HomeStates';
import { releases, videos, shows } from './SectionsStates';
import ImgBkgd from 'Sections/Home/Bkgd/home-bkgd.jpg';
import { APP_IMAGES_ONLOAD } from 'Constants';

const appMachine = Machine(
  {
    id: 'app',
    context: {
      section: {
        current: 'home',
        previous: null,
        next: null
      },
      id: {
        current: null,
        previous: null,
        next: null
      },
      width: 0,
      height: 0,
      device: null,
      orientation: null,
      retina: false
    },
    initial: 'loadind',
    states: {
      unknown: {},
      loadind: {
        invoke: {
          src: 'loadAppAssets',
          onDone: {
            target: 'ready'
          },
          onError: {
            target: 'fatal'
          }
        }
      },
      ready: {
        type: 'parallel',
        states: {
          home,
          releases,
          videos,
          shows
        }
      },
      fatal: {
        type: 'final'
      }
    },
    on: {
      'SET.CONTEXT': {
        actions: ['setContext', send('CONTEXT.UPDATED')]
      }
    }
  },
  {
    actions: {
      setContext: assign((ctx, { context = {} }) => _merge({}, ctx, context)),
      setNextToCurrentSection: assign(ctx =>
        _merge({}, ctx, {
          section: {
            current: ctx.section.next,
            next: null
          },
          id: {
            current: ctx.id.next,
            next: null
          }
        })
      ),
      setCurrentToPreviousSection: assign(ctx =>
        _merge({}, ctx, {
          section: {
            previous: ctx.section.current,
            current: null
          },
          id: {
            previous: ctx.id.current,
            current: null
          }
        })
      ),
      clearSectionContext: assign((ctx, e) =>
        _merge({}, ctx, {
          section: {
            previous: null,
            current: ctx.section.current,
            next: null
          },
          id: {
            previous: null,
            current: ctx.id.current,
            next: null
          }
        })
      ),
      setSectionId: assign((ctx, e) =>
        _merge({}, ctx, {
          id: {
            previous: ctx.id.current,
            current: e.id,
            next: null
          }
        })
      )
    },
    services: {
      loadAppAssets: async context => {
        const image = await ImgPrefetch(ImgBkgd, true).catch(e => false);
        const images = await ImgsPrefetch(APP_IMAGES_ONLOAD).catch(e => false);
        const fonts = await ObserveFontsLoading().catch(e => false);
        const loaded = !!image && !!images && !!fonts;
        return Promise[loaded ? 'resolve' : 'reject'](true);
      }
    },
    guards: {
      canPlayHomeVideo: ({ device, section: { current, next } }) =>
        ['desktop', 'laptop'].indexOf(device) !== -1 &&
        current === 'home' &&
        next === null,
      canMountHomeVideo: ({ section: { current, next } }) => current === 'home'
      // && next === null
    }
  }
);

export default appMachine;
