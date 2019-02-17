import { send } from 'xstate';
import _merge from 'lodash.merge';
import { contextMatch } from 'Utils';
import { RELEASE_IDLE_TIMEOUT } from 'Constants';

const getSectionStates = section => ({
  initial: 'unknown',
  states: {
    unknown: {
      on: {
        '': [
          {
            target: 'entering',
            cond: ctx => contextMatch(ctx, `section.current:${section}`)
          },
          { target: 'idle' }
        ]
      }
    },
    idle: {
      on: {
        NEXT: {
          target: 'entering',
          cond: ctx => contextMatch(ctx, `section.current:${section}`)
        }
      }
    },
    entering: {
      on: {
        NEXT: {
          target: 'mounted',
          cond: ctx => contextMatch(ctx, `section.current:${section}`)
        }
      }
    },
    mounted: {
      activities: ['listenEscKey'],
      onEntry: 'clearSectionContext',
      on: {
        'SECTION.NAVIGATE': {
          target: 'leaving',
          cond: ctx => contextMatch(ctx, `section.current:${section}`),
          actions: 'setContext'
        },
        'SECTION.NAVIGATE.ID': {
          cond: ctx => contextMatch(ctx, `section.current:${section}`),
          actions: ['setSectionId', send('CONTEXT.UPDATED')]
        }
      }
    },
    leaving: {
      onEntry: 'setCurrentToPreviousSection',
      on: {
        NEXT: {
          target: 'idle',
          actions: ['setNextToCurrentSection', send('NEXT')],
          cond: ctx =>
            contextMatch(ctx, `section.previous:${section}`) &&
            contextMatch(ctx, 'section.next:home')
        }
      }
    }
  }
});

export const videos = _merge({}, getSectionStates('videos'));
export const shows = _merge({}, getSectionStates('shows'));

export const releases = _merge({}, getSectionStates('releases'), {
  states: {
    mounted: {
      on: {
        'SECTION.NAVIGATE.ID': {
          target: 'entering'
        }
      },
      initial: 'pending',
      states: {
        pending: {
          initial: 'init',
          states: {
            init: {
              after: {
                [RELEASE_IDLE_TIMEOUT]: 'idle'
              }
            },
            idle: {
              on: {
                'RELEASE.PENDING': 'init'
              }
            }
          },
          on: {
            'RELEASE.STORY': 'story'
          },
          activities: ['waitingForStoryTrigger']
        },
        story: {
          type: 'final'
        }
      }
    }
  }
});
