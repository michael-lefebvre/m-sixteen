import React, { PureComponent } from 'react'
import classNames from 'classnames'
import merge from "lodash.merge"
import { interpret } from 'xstate';
import { ReleaseMachine } from 'Machines'
import { withApp } from 'Contexts'
import { ReleasesScrollInvite } from 'Sections/Releases'
import ReleasesNav from 'Sections/Releases/Nav'
import { RELEASE_USER_EVENTS } from 'Constants'

// TODO: move this shite into a dedicated Class
let eventsBound = false

const _bindEvents  = (_handleEvent) => {
  if (eventsBound) return
  RELEASE_USER_EVENTS.forEach(e => {
    document.addEventListener(e, _handleEvent, {
      capture: true,
      passive: true,
    })
  })
  eventsBound = true
}

const _unbindEvents = (_handleEvent) => {
  if (!eventsBound) return
  RELEASE_USER_EVENTS.forEach(e => {
    document.removeEventListener(e, _handleEvent, {
      capture: true,
      passive: true,
    })
  })
  eventsBound = false
}


const getContextToken = ({ isLeaving, isCurrent, isPrevious }) => `${isLeaving ? 1 : 0}${isCurrent ? 1 : 0}${isPrevious ? 1 : 0}`;

const withRelease = (WrappedComponent, { release, assets = null }) => {
  class ReleaseHoc extends PureComponent {

    state = {
      current: ReleaseMachine.initialState,
      token: getContextToken(this.props.context),
    };

    service = interpret(
        ReleaseMachine
          .withContext(merge({}, ReleaseMachine.context, this.props.context))
          .withConfig({
            services: {
              clearPrevious: () => Promise.resolve(this.props.onClearPrevSection()),
            },
            activities: {
              waitForAction: () => {
                let _eventTriggered = false
                const _handleEvent = () => {
                  if(_eventTriggered) return
                  _eventTriggered = true
                  this.service.send('RELEASE.STORY')
                };
                _bindEvents(_handleEvent)
                return () => _unbindEvents(_handleEvent)
              }
            }
          })
      )
      .onTransition(current =>
        this.setState({ current })
      );

    static getDerivedStateFromProps(nextProps, prevState) {
      const token = getContextToken(nextProps.context)

      if(token !== prevState.token)
        return {
          token
        }
      return null
    }

    //
    // Life cycle
    // --------------------------------------------------

    componentDidMount() {
      this.service.start();
    }

    componentWillUnmount() {
      this.service.stop();
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
      return prevState.token !== this.state.token
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
      if (snapshot)
        this._send()
    }

    //
    // Helpers
    // --------------------------------------------------

    _send = () => {
      const { context } = this.props;
      this.service.send({ type: 'RELEASE.NEXT', context })
    };

    //
    // Events Handlers
    // --------------------------------------------------

    handleOnMounted = evt => () => this.service.send(evt);

    handleOnNext = evt => () => {
      if(this.state.current.matches(evt))
        this._send()
    }

    //
    // Renderers
    // --------------------------------------------------

    render() {
      const { context } = this.props;
      const { current } = this.state;

      if(current.matches('unmounted'))
        return null

      return (
        <div
          className={classNames(`release release--${release}`, {
            'release--current': context.isCurrent,
            'release--previous': context.isPrevious,
          })}
        >
          <ReleasesNav
            isMounted={current.matches('mounted')}
            onMounted={this.handleOnMounted('RELEASE.PENDING')}
          />
          <ReleasesScrollInvite show={current.matches('mounted.pending.idle')} />
          <WrappedComponent
            state={current}
            onNext={this.handleOnNext}
            onMounted={this.handleOnMounted}
          />
        </div>
      )
    }
  }

  ReleaseHoc.displayName = `WithRelease(${getDisplayName(WrappedComponent)})`;

  const mapAppContextToProps = ({ previousId, currentId, wasPreviousSection, onClearPrevSection }) => ({
    context: {
      release,
      assets,
      isLeaving: previousId === release && wasPreviousSection('releases'),
      isCurrent: currentId === release,
      isPrevious: previousId === release
    },
    onClearPrevSection
  });

  return withApp(mapAppContextToProps)(ReleaseHoc);
}

const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component';

export default withRelease;
