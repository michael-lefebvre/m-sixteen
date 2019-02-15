import React, { PureComponent, Fragment } from 'react'
import { AppContext } from 'Contexts/App'
import Home from 'Sections/Home'
import Releases, { ReleasesLoading } from 'Sections/Releases'
import Videos from 'Sections/Videos'
import Shows from 'Sections/Shows'
import ImgErr from './img_error.jpg'

const _DEBUG = false;

export default class Layout extends PureComponent {
  state = { hasError: false };

  static contextType = AppContext;

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  //
  // Life cycle
  // --------------------------------------------------

  componentDidCatch(error, info) {
    console.log(info.componentStack)
  }

  //
  // Helpers
  // --------------------------------------------------

  _hasErrorBoundary = () => this.state.hasError || this.context.matches('fatal')

  //
  // Events Handlers
  // --------------------------------------------------

  //
  // Renderers
  // --------------------------------------------------

  miniDebugRenderer() {
    if(!_DEBUG) return null

    return (
      <div className="mini-debug">
        <pre>{JSON.stringify(this.context.value, null, 2)}</pre>
        <pre>{JSON.stringify(this.context.toStrings(), null, 2)}</pre>
        <pre>{JSON.stringify(this.context.context, null, 2)}</pre>
        <pre>{JSON.stringify(this.context.nextEvents, null, 2)}</pre>
      </div>
    )
  }

  errorBoundaryRenderer() {
    return (
      <div className="error-boundary">
        <div>
          <img src={ImgErr} alt="" />
          <h1>Whoops, something went wrong.</h1>
          <a href={process.env.PUBLIC_URL}>Reload the page</a>
        </div>
      </div>
    );
  }

  render() {
    if (this._hasErrorBoundary())
      return this.errorBoundaryRenderer()

    if(!this.context.matches('ready'))
      return <ReleasesLoading />

    return (
      <Fragment>
        <Home />
        <Releases />
        <Videos />
        <Shows />
        {this.miniDebugRenderer()}
      </Fragment>
    )
  }
}
