import React, { Component } from 'react';
import { Spring, config } from "react-spring"

// import { safeInvoke } from "../utils"

// type TransitionAnimatedStage = "entering" | "exiting"
// type TransitionRestingStage = "entered" | "exited"
// type TransitionStage = TransitionAnimatedStage | TransitionRestingStage

// export type TransitionRenderer = (styles: React.CSSProperties) => React.ReactNode

// export interface TransitionProps {
//   children: TransitionRenderer
//   toggle?: boolean
//   lazy?: boolean

//   from: React.CSSProperties
//   to: React.CSSProperties
//   config?: SpringProps<{}>["config"]

//   onEnter?: () => void
//   onEntering?: () => void
//   onEntered?: () => void

//   onExit?: () => void
//   onExiting?: () => void
//   onExited?: () => void
// }

// interface TransitionState {
//   mounted: boolean
//   stage: TransitionStage
// }

export default class Transition extends Component {
  static defaultProps = {
    mounted: false,
    immediate: false,
    config: config.default,
    onEnter: () => null,
    onEntering: () => null,
    onEntered: () => null,
    onExit: () => null,
    onExiting: () => null,
    onExited: () => null,
  }

  state = {
    mounted: this.props.mounted,
    stage: this.props.mounted ? "entering" : "exiting",
    ready: true
  };

  static getDerivedStateFromProps(
    nextProps,
    prevState
  ) {
    if (nextProps.mounted === true && prevState.mounted === false)
      return {
        mounted: true,
        stage: nextProps.immediate ? "entered" : "entering",
        ready: nextProps.immediate
      };

    if (nextProps.mounted === false && prevState.mounted === true)
      return {
        stage: "exiting",
        ready: nextProps.immediate
      };

    return null;
  }

  //
  // Life cycle
  // --------------------------------------------------


  //
  // Helpers
  // --------------------------------------------------

  _getState() {
    const { from, to } = this.props
    return {
      entering: {
        from,
        to,
      },
      exiting: {
        from: to,
        to: from,
      },
    }[this.state.stage] || {}
  }

  //
  // Events Handlers
  // --------------------------------------------------

  handleOnRest = () => {
    if (this.state.stage === "entering")
      this.setState({ ready: true })

    if (this.state.stage === "exiting")
      this.setState({ mounted: false, ready: false })
  };

  //
  // Renderers
  // --------------------------------------------------

  childrenRenderer(style) {
    return React.Children.map(this.props.children, child =>
      React.cloneElement(child, { style, mounted: (this.state.ready && this.state.mounted) })
    );
  }

  render() {
    if (!this.state.mounted)
      return null;

    return (
      <Spring native immediate={this.props.immediate} config={this.props.config} {...this._getState()} onRest={this.handleOnRest}>
      { style => this.childrenRenderer(style)}
      </Spring>
    )
  }
}
