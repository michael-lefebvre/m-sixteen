import React, { Component } from 'react'
import { withRouter } from 'react-router'
import merge from 'lodash.merge'
import Machine from 'Machines'
import { getViewport, getRouteSection, getRouteId, getRouteParams, StoryTrigger } from 'Utils'
import { MEDIA_QUERIES_LIST, MEDIA_QUERIES_BY_MATCH } from 'Constants'

const defaultViewport = {
  width: 0,
  height: 0,
  device: null,
  orientation: null,
};

const setCurrentMediaQueries = mq => ({ ...MEDIA_QUERIES_BY_MATCH[mq.media], ...getViewport() })

const getInitialViewPort = () => MEDIA_QUERIES_LIST.reduce((a, mq) => {
  const q = window.matchMedia(mq.match);
  if(q.matches)
    a = setCurrentMediaQueries(q)
  return a
}, defaultViewport);

const getInitialContext = (props = null) => merge({}, Machine.initialContext(), {
  section: {
    current: getRouteSection(props)
  },
  id: {
    current: getRouteId(props)
  },
  ...getInitialViewPort()
});

export const AppContext = React.createContext(getInitialContext());

export const { Provider, Consumer } = AppContext;

class App extends Component {

  state = {
    machine: Machine.initialState(),
    pathname: this.props.location.pathname,
  };

  _escActive = false;

  service = Machine
    .init(getInitialContext(this.props), {
      activities: {
        waitingForStoryTrigger: ctx => this._setWaitingForStoryTrigger(ctx),
        listenEscKey: ctx => this._setListenEscKey()
      }
    })
    .get()
    .onTransition(current => this.handleOnTransition(current));

  static getDerivedStateFromProps(nextProps, prevState) {
    const { location: { pathname } } = nextProps;

    if(pathname !== prevState.pathname)
      return {
        pathname
      }

    return null
  }

  //
  // Life cycle
  // --------------------------------------------------

  componentDidMount() {
    window.addEventListener('resize', this.handleOnResize, { passive: true });
    window.addEventListener('keydown', this.handleOnKeydown);

    MEDIA_QUERIES_LIST.forEach(mq => {
      const q = window.matchMedia(mq.match);
      q.addListener(this.handleOnMediaQuery);
    });

    this.service.start();
    this.service.devTools.init(this.state.machine)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleOnResize);

    this.service.stop();
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    return prevState.pathname !== this.props.location.pathname
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot)
      this._sectionNavigate()
  }

  //
  // Helpers
  // --------------------------------------------------

  _send = evt => {
    this.service.send(evt)
  };

  _setServiceContext = (context = {}) => this._send({ type: 'SET.CONTEXT', context });

  _sectionNavigate = () => {
    const { section = 'home', id = null } = getRouteParams(this.props)
    const { section: { current: currentSection }, id: { current: currentId } } = this.state.machine.context;

    if(currentSection !== section)
      return this._send({type: 'SECTION.NAVIGATE', context: {
        section: {
          next: section
        },
        id: {
          next: id
        }
      }})

    if(currentId !== id)
      return this._send({type: 'SECTION.NAVIGATE.ID', id })
  };

  _setWaitingForStoryTrigger = ctx => {
    StoryTrigger.start(ctx.id.current, this.handleOnStoryTrigger)
    return () => StoryTrigger.stop()
  };

  _setListenEscKey = ctx => {
    this._escActive = true;
    return () => this._escActive = false;
  };

  //
  // Events Handlers
  // --------------------------------------------------

  handleOnMediaQuery = mq => {
    if (mq.matches) this._setServiceContext(setCurrentMediaQueries(mq));
  };

  handleOnResize = () => {
    this._setServiceContext(getViewport());
  };

  handleOnTransition = machine => {
    if(!machine.changed) return
    this.setState({ machine });
  };

  handleOnStoryTrigger = _id => {
    const { context: { id: { current } } } = this.state.machine;
    if(_id !== current) {
      console.error('handleOnStoryTrigger wrong release', { current, _id })
      return
    }
    this._send('RELEASE.STORY');
  };

  handleOnKeydown = ({ keyCode }) => {
    if(this._escActive && keyCode === 27)
      this.props.history.push('/')
  };

  //
  // Renderers
  // --------------------------------------------------

  render() {
    return <Provider value={this.state.machine}>{this.props.children}</Provider>;
  }
}

export default withRouter(App);
