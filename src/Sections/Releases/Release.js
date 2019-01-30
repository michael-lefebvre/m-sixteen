import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { withApp } from 'Contexts/App'

const withRelease = (WrappedComponent, ownProps) => {

  class WithRelease extends PureComponent {
    state = {
      stage: 'unmounted',
      isCurrent: false,
      isPrevious: false,
    };

    static getDerivedStateFromProps(nextProps, prevState) {
      const { current, previous, unmount } = nextProps;
      const { isCurrent, stage } = prevState;

      if( (!isCurrent && current) && stage === 'unmounted')
        return {
          stage: 'entering',
          isCurrent: true,
          isPrevious: false
        }

      if( (isCurrent && !current && unmount) && stage === 'mounted')
        return {
          stage: 'leaving',
          isCurrent: false,
          isPrevious: true
        }

      if( !current && !previous && stage === 'leaving')
        return {
          stage: 'unmounted',
          isCurrent: false,
          isPrevious: false
        }

      if( !current && !previous && stage === 'mounted')
        return {
          stage: 'unmounted',
          isCurrent: false,
          isPrevious: false
        }

      return null;
    }

    //
    // Life cycle
    // --------------------------------------------------

    //
    // Events Handlers
    // --------------------------------------------------

    handleOnRest = () => {
      if( this.state.stage === 'entering')
        return this.setState({ stage: 'mounted' }, this.props.onCoverReady)

      if( this.state.stage === 'leaving' )
        this.props.onCoverReady()
    };

    handleOnClose = () => {
      this.props.history.push('/')
    };

    //
    // Renderers
    // --------------------------------------------------

    render() {
      if(this.state.stage === 'unmounted') return null
      const { current, previous } = this.props;

      return (
        <div
          className={classNames(`release release--${ownProps.id}`, {
            'release--current': current,
            'release--previous': previous,
          })}
        >
          <WrappedComponent
            stage={this.state.stage}
            onRest={this.handleOnRest}
            onClose={this.handleOnClose}
          />
        </div>
      );
    }
  }

  WithRelease.displayName = `WithRelease(${getDisplayName(WrappedComponent)})`;

  const mapAppContextToProps = (state) => ({
    unmount: state.previousId === ownProps.id && state.wasPreviousSection('releases'),
    current: state.currentId === ownProps.id,
    previous: state.previousId === ownProps.id,
    onCoverReady: state.onClearPrevSection,
    history: state.getHistory()
  });
  return withApp(mapAppContextToProps)(WithRelease);
}

const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component';

export default withRelease;
