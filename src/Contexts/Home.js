import React, { Component } from 'react';
import { withApp } from './App';

const getInitialContext = () => ({
  isMounted: false,
  isCurrentSection: false,
  currentSection: null,
  bkgdPlaying: false
});

export const { Provider, Consumer } = React.createContext({
  ...getInitialContext(),
  isReady: () => null,
  // getViewPort: () => null,
  // isDesktop: () => null,
  // isTablet: () => null,
  // isMobile: () => null,
  // isLandscape: () => null,
  // onReady: () => null,
  // onSectionChange: () => null,
});


const getInitialState = ({isCurrentSection, currentSection}) => ({
  isMounted: false,
  bkgdPlaying: false,
  isCurrentSection,
  currentSection,
})

class Home extends Component {
  state = getInitialState(this.props);

  static getDerivedStateFromProps(nextProps, prevState) {
    const { currentSection, isCurrentSection } = nextProps;

    if(currentSection !== prevState.currentSection)
      return {
        isCurrentSection,
        currentSection
      }

    return null;
  }

  //
  // Life cycle
  // --------------------------------------------------

  componentDidMount() {}

  componentWillUnmount() {}

  //
  // Helpers
  // --------------------------------------------------

  //
  // Events Handlers
  // --------------------------------------------------

  handleOnReady = () => this.setState({ ready: true });

  handleOnSectionChange = (section) => this.setState(({ currentSection }) => ({ currentSection: section, prevSection: currentSection }));

  //
  // Renderers
  // --------------------------------------------------

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

const mapContextToProps = state => ({
  ready: state.isReady(),
  currentSection: state.currentSection,
  isCurrentSection: state.currentSection === 'home',
});

export default withApp(mapContextToProps)(Home);

export const withHome = (mapContextToProps = v => v) => (
  Child
) => (props) => (
  <Consumer>
    {value => <Child {...mapContextToProps(value, props)} {...props} />}
  </Consumer>
);
