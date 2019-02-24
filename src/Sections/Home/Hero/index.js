import React, { PureComponent } from 'react';
import { withApp } from 'Hoc';
import Large from './Large';
import Medium from './Medium';
import Small from './Small';

import './index.scss';

class Hero extends PureComponent {
  state = {
    state: this.props.state,
    mounted: this.props.screen !== 'Large'
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { state } = nextProps;

    if (state !== prevState.state)
      return {
        state
      };

    return null;
  }

  //
  // Life cycle
  // --------------------------------------------------

  componentDidMount() {
    // console.log('HERO componentDidMount', this.state.state, this.props.screen)

    if (this.state.mounted) this.props.onSend('HERO.NEXT');
  }

  // componentDidUpdate() {
  //   console.log('HERO Large componentDidUpdate', this.state.state)
  // }

  // componentWillUnmount() {
  //   console.log('HERO Large componentWillUnmount')
  // }

  //
  // Helpers
  // --------------------------------------------------

  //
  // Events Handlers
  // --------------------------------------------------

  handleOnRest = () => {
    this.setState({ mounted: true }, () => this.props.onNext());
  };

  //
  // Renderers
  // --------------------------------------------------

  render() {
    const { state, mounted } = this.state;
    const { screen, onNext } = this.props;

    if (state === 'idle') return null;

    const props = {
      state,
      mounted,
      onNext,
      onMounted: this.handleOnRest
    };

    switch (screen) {
      case 'Large':
        return <Large {...props} />;
      case 'Medium':
        return <Medium {...props} />;
      default:
        return <Small {...props} />;
    }
  }
}

const getScreenCategory = device => {
  if (device === 'mobile') return 'Small';
  if (['desktop', 'laptop'].indexOf(device) !== -1) return 'Large';
  return 'Medium';
};

const mapAppContextToProps = context => ({
  state: context.value.ready.home.hero,
  device: context.context.device,
  screen: getScreenCategory(context.context.device),
  isLandscape: context.context.orientation === 'landscape'
});

export default withApp(mapAppContextToProps)(Hero);
