import React, { PureComponent, Fragment } from 'react';
import withRelease from '../Release';
import Cover from './Cover';
import Story from './Story';
import { ReleasesNav } from '../index';
import './index.scss'

// console.log(`cssmask: ${window.Modernizr.cssmask ? 'supported' : 'not-supported'}`)

class ReleaseSplit extends PureComponent {

  state = {
    displayStory: false,
    stage: this.props.stage,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { stage } = nextProps
    if( stage === 'mounted' && prevState.stage === 'entering' )
      return {
        stage,
      }

    if( stage === 'leaving' && prevState.stage !== 'leaving' )
      return {
        stage,
      }

    return null;
  }

  //
  // Life cycle
  // --------------------------------------------------

  // componentDidMount() {}

  //
  // Helpers
  // --------------------------------------------------

  //
  // Events Handlers
  // --------------------------------------------------

  handleOnRest = (el) => () => {
    const { stage } = this.state;
    const { onRest } = this.props;
    // if(stage === 'story' && el === 'face')
    //   return this.setState({ displayStory: true })
    if(stage === 'entering' && el === 'bkgd')
      return onRest()
      // return this.setState({ displayStory: true }, onRest)
    if(stage === 'leaving' && el === 'bkgd')
      return onRest()
  };

  // handleOnScroll = () => {
  //   if(!this.state.displayStory && this.state.stage === 'mounted')
  //     this.setState({ stage: 'story' })
  // };

  //
  // Renderers
  // --------------------------------------------------

  render() {
    const { displayStory, stage } = this.state;
    return (
      <Fragment>
        <ReleasesNav isMounted={stage === 'mounted'} onClose={this.props.onClose} />
        <Cover displayStory={displayStory} stage={stage} onRest={this.handleOnRest}>
          <Story
            displayStory={displayStory}
          />
        </Cover>
        {/*<h1 style={{ top: 100, right: 100, position: 'absolute', zIndex: 1000 }}>{stage}</h1>*/}
      </Fragment>
    )
  }
}

export default withRelease(ReleaseSplit, { id: 'split' });
