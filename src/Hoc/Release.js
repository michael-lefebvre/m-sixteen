import React, { PureComponent } from 'react'
import classNames from 'classnames'
import merge from "lodash.merge"
import hoistStatics from 'hoist-non-react-statics'
import { interpret } from 'xstate';
import { ReleaseMachine } from 'Machines'
import { withApp } from 'Contexts'
import { ReleasesScrollInvite } from 'Sections/Releases'
import ReleasesNav from 'Sections/Releases/Nav'
import { StoryTrigger, getComponentName } from 'Utils'

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
                StoryTrigger.start(release, this.handleOnStoryTrigger)
                return () => StoryTrigger.stop()
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
        this._sendNext()
    }

    //
    // Helpers
    // --------------------------------------------------

    _send = evt => {
      this.service.send(evt)
    };

    _sendNext = () => {
      const { context } = this.props;
      this._send({ type: 'RELEASE.NEXT', context })
    };

    //
    // Events Handlers
    // --------------------------------------------------

    handleOnStoryTrigger = _id => {
      if(_id !== release) {
        console.error('handleOnStoryTrigger wrong release', { release, _id })
        return
      }
      this._send('RELEASE.STORY');
    };

    handleOnMounted = evt => () => this._send(evt);

    handleOnNext = evt => () => {
      if(this.state.current.matches(evt))
        this._sendNext()
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

  ReleaseHoc.displayName = `withRelease(${getComponentName(WrappedComponent)})`;

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

  hoistStatics(ReleaseHoc, WrappedComponent)

  return withApp(mapAppContextToProps)(ReleaseHoc);
}

export default withRelease;
