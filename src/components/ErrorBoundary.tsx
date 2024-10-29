import { Component, ErrorInfo, ReactNode } from 'react';

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState;

  public constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  //
  // Life cycle
  // --------------------------------------------------

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error);
    console.log(errorInfo.componentStack);
  }

  //
  // Events Handlers
  // --------------------------------------------------

  //
  // Renderers
  // --------------------------------------------------

  render() {
    //render fallback UI
    if (this.state.hasError)
      return (
        <div className="app__errorboundary">
          <p>Whoops, something went wrong.</p>
          <a
            className="app__errorboundary__link"
            href="/"
          >
            Reload the page
          </a>
        </div>
      );

    //when there's not an error, render children untouched
    return this.props.children;
  }
}
