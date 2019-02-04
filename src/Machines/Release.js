import { Machine, assign /*, send, sendParent, interpret*/ } from 'xstate';
import delay from 'delay'
import { RELEASE_IDLE_TIMEOUT } from 'Constants'

const getInitialContext = () => ({
  release: undefined,
  assets: null,
  isLoaded: false,
  isLeaving: false,
  isCurrent: false,
  isPrevious: false,
})

const ReleaseMachine = Machine({
  id: 'Release',
  initial: 'unknown',
  context: getInitialContext(),
  on: {
    'RELEASE.NEXT': [
      { target: 'unmounted', cond: (_, { context }) => !context.isCurrent && !context.isPrevious && !context.isLeaving },
      { target: 'loading', cond: (_, { context }) => context.isCurrent && (!_.isLoaded && !_.isCurrent) },
      { target: 'entering', cond: (_, { context }) => context.isCurrent && (_.isLoaded && !_.isCurrent) },
      { target: 'mounted', cond: (_, { context }) => context.isCurrent && _.isCurrent },
      { target: 'leaving', cond: (_, { context }) => !context.isCurrent && _.isCurrent},
    ],
  },
  states: {
    unknown: {
      on: {
        '': [
          { target: 'loading', cond: ctx => ctx.isCurrent && !ctx.isLoaded },
          { target: 'entering', cond: ctx => ctx.isCurrent && ctx.isLoaded },
          { target: 'unmounted' }
        ]
      }
    },
    unmounted: {
      invoke: {
        id: 'RELEASE.UNMOUNTED',
        src: 'clearPrevious'
      },
      onExit: 'setContext',
    },
    loading: {
      invoke: {
        src: 'fetchAssets',
        onDone: {
          target: 'unknown',
          actions: assign({ isLoaded: true })
        },
        onError: {
          target: 'fatal'
        }
      }
    },
    fatal: {
      type: 'final'
    },
    entering: {
      onExit: 'setContext',
    },
    mounted: {
      initial: "pending",
      states: {
        pending: {
          initial: "init",
          states: {
            init: {
              after: {
                [RELEASE_IDLE_TIMEOUT]: 'idle'
              },
            },
            idle: {
              on: {
                'RELEASE.PENDING': 'init',
              },
            },
          },
          on: {
            'RELEASE.STORY': 'story',
          },
          activities: ['waitForAction'],
        },
        story: {},
      },
      invoke: {
        id: 'RELEASE.MOUNTED',
        src: 'clearPrevious'
      },
      onExit: 'setContext',
    },
    leaving: {
      initial: 'unknown',
      states: {
        unknown: {
          on: {
            '': [
              { target: 'animate', cond: ctx => ctx.isLeaving },
              { target: 'background' }
            ]
          }
        },
        animate: {},
        background: {},
      },
      onExit: 'resetContext',
    }
  }
},
{
  actions: {
    setContext: assign((ctx, event) => ({...event.context})),
    resetContext: assign(({release, isLoaded, assets}) => ({...getInitialContext(), release, isLoaded, assets }))
  },
  services: {
    fetchAssets: async context => {
      if( context.assets === null )
        return Promise.resolve(true)

      await delay(500)
      return Promise.resolve(true)
      // return Promise.reject(true)
    }
  }
});

export default ReleaseMachine;
