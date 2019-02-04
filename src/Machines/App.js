import { Machine, /*interpret, send, sendParent*/ } from 'xstate';

const AppMachine = Machine({
  id: 'App',
  initial: 'idle',
  states: {
    idle: {
      on: {
        'APP.LOADING': 'loading'
      }
    },
    loading: {
      on: {
        'APP.LOADED': 'loaded'
      }
    },
    loaded: {
      on: {
        'APP.READY': 'ready'
      }
    },
    ready: {
      type: 'final'
    }
  }
});

export default AppMachine;
