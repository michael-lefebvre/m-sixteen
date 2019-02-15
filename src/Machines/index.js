import { interpret } from 'xstate';
import AppMachine from './App';

export { default as AppMachine } from './App';
export { default as ReleaseMachine } from './Release';

class MachineInterpret {
  constructor() {
    this._service = null;
    this._started = false;

    return this;
  }

  init(context, config) {
    if (this._service !== null) throw new Error('Service already init');

    this._service = interpret(
      AppMachine.withContext(context).withConfig(config)
    );

    return this;
  }

  initialState() {
    return AppMachine.initialState;
  }

  initialContext() {
    return AppMachine.context;
  }

  get() {
    if (this._service === null) throw new Error('No service init');

    return this._service;
  }

  start() {
    if (this._started) throw new Error('Service already started');

    this.get().start();

    this._started = true;
  }

  stop() {
    if (!this._started) throw new Error('Service not started');

    this.get().stop();

    this._started = false;
  }

  send(o) {
    return this.get().send(o);
  }
}

const Machine = new MachineInterpret();

export default Machine;
