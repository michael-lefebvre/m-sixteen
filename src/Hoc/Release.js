import React, { PureComponent } from 'react'
import hoistStatics from 'hoist-non-react-statics'
import _get from 'lodash.get'
import withApp from './App'
import { ReleasesLoading } from 'Sections/Releases'
import { getComponentName, ImgsPrefetch } from 'Utils'

// const getStateFromProps = ({ state, story, isLeaving, isCurrent, isPrevious }) => ({
//   state,
//   story,
// })

const getReleaseStage = value => typeof value === 'string' ? value : Object.keys(value)[0];

const withRelease = (WrappedComponent, { release, assets = null }) => {
  class ReleaseHoc extends PureComponent {

    state = {
      assetsLoaded: assets === null,
      assetsLoading: false
    };

    //
    // Life cycle
    // --------------------------------------------------

    // componentDidMount() {
    //   console.log('Release componentDidMount', release, getStateFromProps(this.props))
    // }

    // componentDidUpdate() {
    //   console.log('Release componentDidUpdate', release, getStateFromProps(this.props))
    // }

    getSnapshotBeforeUpdate(
      prevProps,
      prevState
    ) {
      return prevProps.state === 'idle' && this.props.state !== 'idle'
    }

    componentDidUpdate(
      prevProps,
      prevState,
      snapshot
    ) {
      if (snapshot && !this.state.assetsLoaded && !this.state.assetsLoading)
        this.handleOnLoadAssets()
    }

    //
    // Helpers
    // --------------------------------------------------

    _loadAssets = () => {
      ImgsPrefetch(assets, true)
        .then(() =>
          this.setState({ assetsLoading: false, assetsLoaded: true })
        )
    };

    //
    // Events Handlers
    // --------------------------------------------------

    handleOnLoadAssets = () => this.setState({ assetsLoading: true }, () => this._loadAssets());

    handleOnMounted = evt => () => this.props.onSend(evt);

    handleOnNext = evt => () => {
      if(this.props.stateMatches(`ready.releases.${evt}`))
        this.props.onNext();
    }

    //
    // Renderers
    // --------------------------------------------------

    render() {
      const { state, story } = this.props;

      if(state === 'idle')
        return null

      if(!this.state.assetsLoaded)
        return <ReleasesLoading />

      return (
        <div className={`release release--${release}`}>
          <WrappedComponent
            state={state}
            story={story}
            onNext={this.handleOnNext}
            onMounted={this.handleOnMounted}
          />
        </div>
      )
    }
  }

  ReleaseHoc.displayName = `withRelease(${getComponentName(WrappedComponent)})`;

  hoistStatics(ReleaseHoc, WrappedComponent)

  const idleResponse = () => ({
    state: 'idle',
    story: false
  });

  return withApp(context => {

    if(context.matches('ready.releases.idle'))
      return idleResponse();

    const { section: { previous }, id: { previous: previousId, current: currentId } } = context.context;

    const isCurrent = currentId === release;
    const isPrevious = previousId === release;
    const isLeaving = isPrevious && previous === 'releases';

    if( !isPrevious && !isCurrent )
      return idleResponse();

    if( isPrevious && !isLeaving )
      return {
        state: context.history ? getReleaseStage(_get(context.history.value, 'ready.releases')) : "mounted",
        story: context.history ? context.history.matches('ready.releases.mounted.story') : false,
      }

    return {
      state: getReleaseStage(_get(context.value, 'ready.releases')),
      story: context.matches('ready.releases.mounted.story'),
    }
  })(ReleaseHoc)
}

export default withRelease;
