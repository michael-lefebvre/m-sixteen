import React, { PureComponent, Fragment } from 'react'
import { Spring, Trail, animated } from 'react-spring'
import { Link } from "react-router-dom";
import { getNavImgSrc } from 'Utils'
import { withApp } from 'Contexts'

import './index.scss'

const BlockquoteStart = ({ ready }) => {
  const from = 'polygon(0% 0%, 0% 0%, -10% 100%, 0% 100%)'
  const to = 'polygon(0% 0%, 110% 0%, 100% 100%, 0% 100%)'
  return (
    <Spring
      native
      immediate={!ready}
      from={{ clipPath: from }}
      to={{ clipPath: ready ? to : from }}
      >
      {style => (
        <animated.blockquote className="home__quote home__quote--start" style={style}>
          There 's nothing left<br className="home__quote__br" />
          {" "}but a corpse
        </animated.blockquote>
      )}
    </Spring>
  )
}

const BlockquoteEndContent = ({ ready }) => (
  <Spring
    native
    immediate={!ready}
    config={{ delay: 200 }}
    from={{ y: -30, w: 0 }}
    to={{ y: ready ? 0 : -30, w: ready ? 100 : 0 }}
    >
    {({ y, w }) => (
      <Fragment>
        <span className="home__quote--end__text">
          <animated.span style={{ transform: y.interpolate(y => `translateY(${y}px)`) }}>A crash of</animated.span>
        </span>
        <br />
        <span className="home__quote--end__text">
          <animated.span style={{ transform: y.interpolate(y => `translateY(${y}px)`) }}>flesh and bones</animated.span>
        </span>
        <animated.span className="home__quote--end__hr" style={{ width: w.interpolate(w => `${w}%`) }} />
      </Fragment>
    )}
  </Spring>
);

const BlockquoteEnd = ({ ready, children }) => (
  <Spring
    native
    immediate={!ready}
    config={{ delay: 600 }}
    from={{ t: 70 }}
    to={{ t: ready ? 86 : 70 }}
    >
    {({ t }) => (
      <animated.blockquote className="home__quote home__quote--end" style={{ marginTop: t.interpolate(t => `-${t}px`) }}>
        {children}
      </animated.blockquote>
    )}
  </Spring>
);

const Title = ({ ready }) => (
  <Spring
    native
    immediate={!ready}
    config={{ delay: 400 }}
    from={{ h: 0, o: 0, t: 0 }}
    to={{ h: ready ? 305: 0, o: ready ? 1 : 0, t: ready ? 0 : 200 }}
    >
    {({ h, o, t }) => (
      <animated.div className="home__title" style={{ height: h.interpolate(h => `${h}px`) }}>
        <animated.h1 className="home__title__primary" style={{ opacity: o.interpolate(o => o) }}>m-sixteen</animated.h1>
        <h2 className="home__title__sub">
          <animated.span style={{ transform: t.interpolate(t => `translateY(${t}%)`) }}>paris punk rock, 2000-2010</animated.span>
        </h2>
      </animated.div>
    )}
  </Spring>
)

const Abstract = ({ ready, sections }) => (
  <Spring
    native
    immediate={!ready}
    config={{ delay: 800 }}
    from={{ w: 0, t: -100 }}
    to={{ w: ready ? 100: 0, t: ready ? 0 : -100 }}
    >
    {({ w, t }) => (
      <div className="home__abstract">
        <animated.p className="home__abstract__txt" style={{ transform: t.interpolate(t => `translateY(${t}%)`) }}>
          {/*JSON.stringify(sections)*/}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent condimentum bibendum rhoncus. Duis viverra tempus felis, eu tempor nisi fringilla ac.
        </animated.p>
        <animated.hr className="home__abstract__hr" style={{ width: w.interpolate(w => `${w}%`) }} />
      </div>
    )}
  </Spring>
)

const HomeNav = ({ ready, items, from, section, onRest = () => null }) => {
  return (
    <Spring
      native
      immediate={!ready}
      config={{ delay: 1000 }}
      from={{ t: from }}
      to={{ t: ready ? 0 : from }}
      onRest={onRest}
      >
      {({ t }) => (
        <animated.ul className={`home__nav home__nav--${section}`} style={{ transform: t.interpolate(t => `translateX(${t}%)`) }}>
          <Trail
            items={items}
            config={{ delay: 1200 }}
            from={{ opacity: 0 }}
            to={{ opacity: ready ? 1 : 0 }}
            >
            {item => styles => {
              // console.log(item)
              return (
              <animated.li className="home__nav__item" style={styles}>
                <Link to={`/${section}/${item}`}>
                  <img src={getNavImgSrc(section, item)} className="home__nav__thumb" alt="" />
                </Link>
              </animated.li>
            )}}
          </Trail>
        </animated.ul>
      )}
    </Spring>
  )
}


const getInitialState = ({ isReady, isCurrentSection, prevSection, currentSection }) => ({
  mounted: false,
  ready: isReady && isCurrentSection,
  prevSection,
  currentSection,
  isCurrentSection,
})

class Home extends PureComponent {
  state = getInitialState(this.props);

  _ref = React.createRef();

  static getDerivedStateFromProps(nextProps, prevState) {
    const { isReady, isCurrentSection, prevSection, currentSection } = nextProps;
    const ready = isReady && isCurrentSection

    if(ready && !prevState.ready)
      return {
        ready
      }

    if(prevState.ready && currentSection !== prevState.currentSection)
      return {
        isCurrentSection,
        prevSection,
        currentSection
      }

    return null;
  }

  //
  // Life cycle
  // --------------------------------------------------

  componentDidMount() {
    // this.props.handleOnReady()
  }

  componentDidUpdate() {}

  //
  // Helpers
  // --------------------------------------------------

  _setReady() {
    const ready = !!this.props.landingVideo;

    if(!ready)
      return

    if(ready && !this.state.ready)
      this.setState({ ready: true })
  }

  _getTransition() {
    const { ready, isCurrentSection, prevSection, currentSection } = this.state;
    const home = { s: 1, o: 1, t: 0 };
    const releases = { s: .95, o: 0, t: 0 };
    const videos = { s: 1, o: 0, t: 5 };
    if(!ready)
      return {
        immediate: true,
        from: home,
        to: home,
      }

    if(ready && currentSection === "releases" && prevSection === 'home')
      return {
        from: home,
        to: releases,
      }
    if(ready && currentSection === "videos" && prevSection === 'home')
      return {
        from: home,
        to: videos
      }
    if(ready && isCurrentSection && prevSection !== 'home')
      return {
        from: prevSection === "releases" ? releases : videos,
        to: home
      }

    return {
      immediate: true,
      from: home,
      to: home,
    }
  }

  // _setStyle = ({ s, o, t }) => {
  //   const { ready, isCurrentSection, prevSection, currentSection } = this.state;
  // };

  //
  // Events Handlers
  // --------------------------------------------------

  handleOnRest = () => {
    this.setState({ mounted: true })
  };

  handleOnSectionRest = () => {
    if(this.state.isCurrentSection && this.state.prevSection)
      this.props.onClearPrevSection()
  };

  //
  // Renderers
  // --------------------------------------------------

  render() {
    const { ready, isCurrentSection, prevSection, currentSection } = this.state;
    const sections = { isCurrentSection, prevSection, currentSection };

    // if(!ready) return null;

    return (
      <Spring
        native
        {...this._getTransition()}
        onRest={this.handleOnSectionRest}
      >
        {({ s, o, t }) => (
          <animated.header className="home" ref={this._ref} tabIndex="-1" style={{ transform: t.interpolate(t => `translateY(-${t}%)`) }}>
            <animated.div className="home__wrapper" style={{ opacity: o.interpolate(o => o), transform: s.interpolate(s => `rotate(-45deg) scale(${s})`)  }}>
              <BlockquoteStart ready={ready} />
              <Title ready={ready} />
              <BlockquoteEnd ready={ready}>
                <BlockquoteEndContent ready={ready} />
              </BlockquoteEnd>
              <Abstract ready={ready} sections={sections} />
              <HomeNav ready={ready} items={['album', 'split', 'ep']} from={50} section="releases" />
              <HomeNav ready={ready} items={['nevers', 'rouge']} from={-50} section="videos" onRest={this.handleOnRest} />
            </animated.div>
          </animated.header>
        )}
      </Spring>
    )
  }
}

const mapAppContextToProps = state => ({
  isReady: state.isReady(),
  handleOnReady: state.onReady,
  currentSection: state.currentSection,
  prevSection: state.prevSection,
  isCurrentSection: state.currentSection === 'home',
  onClearPrevSection: state.onClearPrevSection,
});

export default withApp(mapAppContextToProps)(Home);

