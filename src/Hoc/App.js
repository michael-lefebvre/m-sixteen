import React, { PureComponent } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import _get from 'lodash.get';
import { AppContext } from 'Contexts/App';
import Machine from 'Machines';
import { getComponentName } from 'Utils';

const withApp = (mapContextToProps = v => v) => WrappedComponent => {
  class AppHoc extends PureComponent {
    static contextType = AppContext;

    //
    // Helpers
    // --------------------------------------------------

    getStateByPath = path => _get(this.context.value, path);

    getValue = () => this.context.value;

    getStrings = () => this.context.toStrings();

    getNextEvents = () => this.context.nextEvents;

    getContext = () => this.context.context;

    stateMatches = state => this.context.matches(state);

    isReady = () => this.context.matches('ready');

    hasVideoHeader = () =>
      ['desktop', 'laptop'].indexOf(this.getDevice()) !== -1;

    getDevice = () => this.getContext().device;

    isDevice = device => this.getDevice() === device;

    isDesktop = () => this.isDevice('desktop');

    isTablet = () => this.isDevice('tablet');

    isMobile = () => this.isDevice('mobild');

    isLandscape = () => this.getContext().orientation === 'landscape';

    bkgdCanPlay = () => {
      const { current, previous, next } = this.getContext().section;
      return (
        this.hasVideoHeader() &&
        current === 'home' &&
        previous === null &&
        next === null
      );
    };

    getHelpers = () => ({
      getStateByPath: this.getStateByPath,
      getStrings: this.getStrings,
      getValue: this.getValue,
      getNextEvents: this.getNextEvents,
      getContext: this.getContext,
      stateMatches: this.stateMatches,
      isReady: this.isReady,
      hasVideoHeader: this.hasVideoHeader,
      bkgdCanPlay: this.bkgdCanPlay,
      isDesktop: this.isDesktop,
      isTablet: this.isTablet,
      isMobile: this.isMobile,
      isLandscape: this.isLandscape
    });

    //
    // Events Handlers
    // --------------------------------------------------

    hanleOnSend = evt => Machine.send(evt);

    hanleOnNext = () => this.hanleOnSend('NEXT');

    // Renderers
    // --------------------------------------------------

    render() {
      const { props } = this;

      return (
        <WrappedComponent
          {...mapContextToProps(this.context, props)}
          {...props}
          {...this.getHelpers()}
          onNext={this.hanleOnNext}
          onSend={this.hanleOnSend}
        />
      );
    }
  }

  AppHoc.displayName = `withApp(${getComponentName(WrappedComponent)})`;

  hoistStatics(AppHoc, WrappedComponent);

  return AppHoc;
};

export default withApp;
