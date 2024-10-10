import { send } from 'xstate';
import { contextMatch, doesCondMatches } from 'Utils';

const homeStates = {
  initial: 'unknown',
  states: {
    unknown: {
      on: {
        '': [
          {
            target: 'entering',
            cond: ctx => contextMatch(ctx, 'section.current:home')
          },
          { target: 'idle' }
        ]
      }
    },
    idle: {
      on: {
        NEXT: {
          target: 'entering',
          cond: ctx => contextMatch(ctx, 'section.current:home')
        }
      }
    },
    entering: {
      on: {
        'HERO.NEXT': 'mounted'
      }
    },
    mounted: {
      onEntry: 'clearSectionContext',
      on: {
        'SECTION.NAVIGATE': [
          {
            target: 'videos_in',
            cond: doesCondMatches(
              'section.current:home',
              'context.section.next:videos'
            ),
            actions: 'setContext'
          },
          {
            target: 'releases_in',
            cond: doesCondMatches(
              'section.current:home',
              'context.section.next:releases'
            ),
            actions: 'setContext'
          }
        ]
      }
    },
    releases_in: {
      onEntry: 'setCurrentToPreviousSection',
      on: {
        NEXT: [
          {
            actions: ['setNextToCurrentSection', send('NEXT')],
            cond: ctx =>
              contextMatch(ctx, 'section.previous:home') &&
              contextMatch(ctx, 'section.next:releases')
          },
          {
            target: 'releases_out',
            cond: ctx =>
              contextMatch(ctx, 'section.previous:releases') &&
              contextMatch(ctx, 'section.current:home')
          }
        ]
      }
    },
    releases_out: {
      on: {
        'HERO.NEXT': 'mounted',
        NEXT: 'mounted'
      }
    },
    videos_in: {
      onEntry: 'setCurrentToPreviousSection',
      on: {
        NEXT: [
          {
            actions: ['setNextToCurrentSection', send('NEXT')],
            cond: ctx =>
              contextMatch(ctx, 'section.previous:home') &&
              contextMatch(ctx, 'section.next:videos')
          },
          {
            target: 'videos_out',
            cond: ctx =>
              contextMatch(ctx, 'section.previous:videos') &&
              contextMatch(ctx, 'section.current:home')
          }
        ]
      }
    },
    videos_out: {
      on: {
        'HERO.NEXT': 'mounted',
        NEXT: 'mounted'
      }
    }
  }
};

export default homeStates;
