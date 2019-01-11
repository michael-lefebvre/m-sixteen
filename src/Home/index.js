import React, { PureComponent, Fragment } from 'react'
import { Spring, Trail, animated, config } from 'react-spring'
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { withApp } from 'Views/Provider'
import { isHome, getSection } from 'Utils';
// import delay from 'delay'

import './styles.scss'

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
    to={{ t: ready ? 84 : 70 }}
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

const Abstract = ({ ready, onRest }) => (
  <Spring
    native
    immediate={!ready}
    config={{ delay: 800 }}
    from={{ w: 0, t: -100 }}
    to={{ w: ready ? 100: 0, t: ready ? 0 : -100 }}
    onRest={onRest}
    >
    {({ w, t }) => (
      <div className="home__abstract">
        <animated.p className="home__abstract__txt" style={{ transform: t.interpolate(t => `translateY(${t}%)`) }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent condimentum bibendum rhoncus. Duis viverra tempus felis, eu tempor nisi fringilla ac.
        </animated.p>
        <animated.hr className="home__abstract__hr" style={{ width: w.interpolate(w => `${w}%`) }} />
      </div>
    )}
  </Spring>
)

// const HomeNavItems = {
//   releases: ['album', 'split', 'ep'],
//   videos: ['nevers', 'rouge']
// }

const getHomeNavItemsSrc = (section, item) => {
  switch(section) {
    case 'releases': return `/static/covers/${item}.jpg`
    case 'videos': return `/static/photos/videos/${item}-md.jpg`
    case 'shows': return `/static/covers/${item}.jpg`
    default:
        // do nothing
  }
}

const HomeNav = ({ ready, items, from, section }) => {
  return (
    <Spring
      native
      immediate={!ready}
      config={{ delay: 1000 }}
      from={{ t: from }}
      to={{ t: ready ? 0 : from }}
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
                  <img src={getHomeNavItemsSrc(section, item)} className="home__nav__thumb" alt="" />
                </Link>
              </animated.li>
            )}}
          </Trail>
        </animated.ul>
      )}
    </Spring>
  )
}

class Home extends PureComponent {
  state = {
    // mounted: false,
    ready: false,
    leave: !isHome(this.props),
    section: getSection(this.props),
    prevSection: null,
  };
  _ref = React.createRef();


  static getDerivedStateFromProps(nextProps, prevState) {
    const leave = !isHome(nextProps)
    const ready = nextProps.homeReady;
    const section = getSection(nextProps)
    if(prevState.leave !== leave || prevState.ready !== ready || section !== prevState.section)
      return {
        leave,
        ready,
        section,
        prevSection: prevState.section
      }

    return null;
  }


  //
  // Life cycle
  // --------------------------------------------------

  componentDidMount() {
    this._ref.current.focus()
    // this._setReady()
  }

  componentDidUpdate() {
    // this._setReady()
  }

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

  //
  // Events Handlers
  // --------------------------------------------------

  handleOnClick = () => {
    // this.setState({ leave: !this.state.leave })
  };

  handleOnRest = () => {
    // console.log('handleOnRest')
  };

  //
  // Renderers
  // --------------------------------------------------

  _render() {
    const { ready, leave, section, prevSection } = this.state;
    // console.log({leave, ready, section, prevSection})

    return (
      <Spring
        native
        // immediate={!leave}
        config={config[ prevSection ? 'slow' : 'stiff']}
        from={{ s: 1, o: 1, t: 0 }}
        to={{ s: (leave && section === 'releases') ? .93 : 1, o: leave ? 0 : 1, t: (leave && section === 'videos') ? 50 : 0 }}
        >
        {({ s, o, t }) => (
          <animated.header className="home" ref={this._ref} tabIndex="-1" onClick={this.handleOnClick} style={{ transform: t.interpolate(t => `translateY(-${t}%)`) }}>
            <animated.div className="home__wrapper" style={{ opacity: o.interpolate(o => o),  transform: s.interpolate(s => `rotate(-45deg) scale(${s})`)  }}>
              <BlockquoteStart ready={ready} />
              <Title ready={ready} />
              <BlockquoteEnd ready={ready}>
                <BlockquoteEndContent ready={ready} />
              </BlockquoteEnd>
              <Abstract ready={ready} onRest={this.handleOnRest} />
              <HomeNav ready={ready} items={['album', 'split', 'ep']} from={50} section="releases" />
              <HomeNav ready={ready} items={['nevers', 'rouge']} from={-50} section="videos" />
              {/*<HomeNav ready={ready} items={['album', 'split', 'ep','album', 'split', 'ep','album', 'split', 'ep']} from={0} section="shows" />*/}
            </animated.div>
          </animated.header>
        )}
      </Spring>
    )
  }

  render() {
    const { ready } = this.state;

    return (
      <header className="home" ref={this._ref} tabIndex="-1">
        <animated.div className="home__wrapper" style={{ opacity: 1, transform:'rotate(-45deg) scale(1)' }}>
          <BlockquoteStart ready={ready} />
          <Title ready={ready} />
          <BlockquoteEnd ready={ready}>
            <BlockquoteEndContent ready={ready} />
          </BlockquoteEnd>
          <Abstract ready={ready} onRest={this.handleOnRest} />
          <HomeNav ready={ready} items={['album', 'split', 'ep']} from={50} section="releases" />
          <HomeNav ready={ready} items={['nevers', 'rouge']} from={-50} section="videos" />
          {/*<HomeNav ready={ready} items={['album', 'split', 'ep','album', 'split', 'ep','album', 'split', 'ep']} from={0} section="shows" />*/}
        </animated.div>
      </header>
    )
  }
}

export default withRouter(withApp( Home ))
