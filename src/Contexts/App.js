import React, { Component } from 'react';
import { withRouter } from "react-router";
import { getViewport, getSection, getParams } from 'Utils'
import { MEDIA_QUERIES_LIST, MEDIA_QUERIES_BY_MATCH } from 'Constants';

const getCurrentSection = (props) => {
  const section = getSection(props)
  return !section ? 'home' : section
}

const getCurrentId = (props) => {
  const { id } = getParams(props)
  return id || null;
}

const getInitialContext = () => ({
  ...getViewport(),
  device: null,
  orientation: null,
  ready: false,
  currentSection: null,
  currentId: null,
  prevSection: null,
  previousId: null
});

export const AppContext = React.createContext({
  ...getInitialContext(),
  isReady: () => null,
  getViewPort: () => null,
  hasVideoHeader: () => null,
  getHistory: () => null,
  bkgdCanPlay: () => null,
  isDesktop: () => null,
  isTablet: () => null,
  isMobile: () => null,
  isLandscape: () => null,
  isCurrentSection: () => false,
  wasPreviousSection: () => false,
  onReady: () => null,
  onSectionChange: () => null,
  onClearPrevSection: () => null,
});

export const { Provider, Consumer } = AppContext;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...getInitialContext(),
      currentSection: getCurrentSection(props),
      currentId: getCurrentId(props),
      isReady: this.isReady,
      getViewPort: this.getViewPort,
      getHistory: this.getHistory,
      hasVideoHeader: this.hasVideoHeader,
      bkgdCanPlay: this.bkgdCanPlay,
      isDesktop: this.isDesktop,
      isTablet: this.isTablet,
      isMobile: this.isMobile,
      isLandscape: this.isLandscape,
      isCurrentSection: this.isCurrentSection,
      wasPreviousSection: this.wasPreviousSection,
      onReady: this.handleOnReady,
      onSectionChange: this.handleOnSectionChange,
      onClearPrevSection: this.handleOnClearPrevSection,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const currentSection = getCurrentSection(nextProps)
    const currentId = getCurrentId(nextProps);

    if(currentSection !== prevState.currentSection)
      return {
        prevSection: prevState.currentSection,
        previousId: prevState.currentId,
        currentSection,
        currentId
      }

    if(currentId !== prevState.currentId)
      return {
        previousId: prevState.currentId,
        currentId
      }

    return null;
  }

  //
  // Life cycle
  // --------------------------------------------------

  componentDidMount() {
    window.addEventListener('resize', this.handleOnResize, { passive: true });

    MEDIA_QUERIES_LIST.forEach(mq => {
      const q = window.matchMedia(mq.match);
      q.addListener(this.handleMediaQuery);
      this.handleMediaQuery(q);
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleOnResize);
  }

  //
  // Helpers
  // --------------------------------------------------

  isReady = () => this.state.ready;

  getViewPort = () => ({ offsetWidth: this.state.offsetWidth, offsetHeight: this.state.offsetHeight });

  getHistory = () => this.props.history;

  hasVideoHeader = () => {
    const { device } = this.state;
    if(device === null) return null;
    return ['desktop', 'laptop'].indexOf(device) !== -1;
  };

  isDesktop = () => this.state.device === 'desktop';

  isTablet = () => this.state.device === 'tablet';

  isMobile = () => this.state.device === 'mobild';

  isLandscape = () => this.state.orientation === 'landscape';

  bkgdCanPlay = () => {
    const { currentSection, prevSection } = this.state;
    return ( this.hasVideoHeader() === true && currentSection === 'home' && prevSection === null )
  };

  isCurrentSection = section => this.state.currentSection === section;

  wasPreviousSection = section => this.state.prevSection === section;

  //
  // Events Handlers
  // --------------------------------------------------

  handleOnReady = () => this.setState({ ready: true });

  handleMediaQuery = mq => {
    if (mq.matches) this.setState({ ...MEDIA_QUERIES_BY_MATCH[mq.media], ...getViewport() })
  };

  handleOnSectionChange = (section) => this.setState(({ currentSection }) => ({ currentSection: section, prevSection: currentSection }));

  handleOnClearPrevSection = () => this.setState({ prevSection: null, previousId: null });

  handleOnResize = () => {
    this.setState({ ...getViewport() })
  };

  //
  // Renderers
  // --------------------------------------------------

  render() {
    // console.log({ props: this.props})
    // console.log({ state: this.state})
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

export default withRouter(App);

export const withApp = (mapContextToProps = v => v) => (
  Child
) => (props) => (
  <Consumer>
    {value => <Child {...mapContextToProps(value, props)} {...props} />}
  </Consumer>
);
