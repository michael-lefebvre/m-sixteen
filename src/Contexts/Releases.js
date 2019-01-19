import React, { Component } from 'react';
import { withRouter } from "react-router";
import { withApp } from './App';
import { getParams, isSectionActive } from 'Utils'

const getInitialContext = () => ({
  isCurrentSection: false,
  wasPreviousSection: false,
  currentId: null,
  previousId: null,
  onCoverReady: () => null,
});

const getInitialState = (props) => {
  const { id } = getParams(props)
  return {
    isCurrentSection: isSectionActive(props, 'releases'),
    wasPreviousSection: false,
    currentId: id,
    previousId: null,
  }
}

export const { Provider, Consumer } = React.createContext({
  ...getInitialContext(),
});

class Releases extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ...getInitialState(this.props),
      getHistory: this.getHistory,
      onCoverReady: this.handleOnCoverReady,
    };
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const isCurrentSection = isSectionActive(nextProps, 'releases')
    const { id: currentId } = getParams(nextProps);

    if (!isCurrentSection && prevState.isCurrentSection)
      return {
        previousId: prevState.currentId,
        currentId: null,
        wasPreviousSection: true,
        isCurrentSection: false
      }


    if (isCurrentSection && !prevState.isCurrentSection)
      return {
        currentId,
        isCurrentSection,
        wasPreviousSection: false,
      }

    if (isCurrentSection && prevState.isCurrentSection && currentId !== prevState.currentId)
      return {
        previousId: prevState.currentId,
        wasPreviousSection: false,
        isCurrentSection,
        currentId,
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

  getHistory = () => this.props.history;

  //
  // Events Handlers
  // --------------------------------------------------

  handleOnCoverReady = () => {
    this.setState({ previousId: null, wasPreviousSection: false })
  };


  //
  // Renderers
  // --------------------------------------------------

  render() {
    // console.log({ props: this.props})
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

const mapContextToProps = state => ({
  ready: state.isReady(),
  currentId: state.currentId,
});

export default withRouter(withApp(mapContextToProps)(Releases));

export const withReleases = (mapContextToProps = v => v) => (
  Child
) => (props) => (
  <Consumer>
    {value => <Child {...mapContextToProps(value, props)} {...props} />}
  </Consumer>
);
