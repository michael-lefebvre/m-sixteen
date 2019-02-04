import throttle from 'lodash.throttle'
import { STORY_TRIGGER_EVENTS, STORY_TRIGGER_THROTTLE } from 'Constants'

class StoryTrigger {
  constructor() {
    this._eventsBound = false
    this._releaseId = null
    this._callback = null

    this._handleEvent = throttle(this._handleEvent, STORY_TRIGGER_THROTTLE);
  }

  _bindEvents = () => {
    if (this._eventsBound) return

    STORY_TRIGGER_EVENTS.forEach(e => {
      document.addEventListener(e, this._handleEvent, {
        capture: true,
        passive: true,
      })
    })
    this._eventsBound = true
  };

  _unbindEvents = () => {
    if (!this._eventsBound) return

    STORY_TRIGGER_EVENTS.forEach(e => {
      document.removeEventListener(e, this._handleEvent, {
        capture: true,
        passive: true,
      })
    })
    this._eventsBound = false
  };

  _handleEvent = () => {
    if(this._releaseId === null) return
    this._callback(this._releaseId)
    this.stop()
  };

  start(_releaseId, _callback) {
    if(this._releaseId !== null) {
      const msg = this._releaseId === _releaseId ? 'StoryTrigger already started' : 'StoryTrigger binded to another release'
      console.error(msg, this._releaseId, _releaseId)
      return
    }

    this._releaseId = _releaseId
    this._callback = _callback
  }

  stop() {
    this._releaseId = null
    this._callback = null
  }
}

const inst = new StoryTrigger()
inst._bindEvents()

export default inst;
