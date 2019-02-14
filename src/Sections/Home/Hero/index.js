import React, { PureComponent, Fragment } from 'react'
import { Spring, Keyframes, Trail, animated } from 'react-spring'
import { Link } from "react-router-dom";
import { getNavImgSrc } from 'Utils'
import { withApp } from 'Hoc'

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

const _homeProps = { s: 1, o: 1, t: 0 };
const _releasesProps = { s: .95, o: 0, t: 0 };
const _videosProps = { s: 1, o: 0, t: 5 };
const _defaultProps = { immediate: true, from: _homeProps, to: _homeProps };

const HomeSpring = Keyframes.Spring({
  entering: _defaultProps,
  // mounted: _defaultProps,
  releases_in: { from: _homeProps, to: _releasesProps },
  releases_out: { to: _homeProps, from: _releasesProps },
  videos_in: { from: _homeProps, to: _videosProps },
  videos_out: { to: _homeProps, from: _videosProps },
})

class Home extends PureComponent {
  state = {
    state: this.props.state,
    mounted: false
  };

  _ref = React.createRef();

  static getDerivedStateFromProps(nextProps, prevState) {
    const { state } = nextProps;

    if(!prevState.mounted && state === 'mounted')
      return {
        mounted: true,
        state,
      }

    if(state !== prevState.state)
      return {
        state
      }

    return null;
  }

  //
  // Life cycle
  // --------------------------------------------------

  // componentDidMount() {
  //   console.log('HERO componentDidMount', this.state.state)
  // }

  // componentDidUpdate() {
  //   console.log('HERO componentDidUpdate', this.state.state)
  // }

  //
  // Helpers
  // --------------------------------------------------

  //
  // Events Handlers
  // --------------------------------------------------

  handleOnRest = () => {
    this.props.onNext()
  };

  //
  // Renderers
  // --------------------------------------------------

  render() {
    const { state, mounted: ready } = this.state;

    // console.log('  ')
    // console.log({hasVideoHeader: this.props.hasVideoHeader(), bkgdCanPlay: this.props.bkgdCanPlay()})
    // console.log('HOME.HERO render')
    // console.log({state: this.state})
    // console.log(JSON.stringify(this.state, null, 2))
    // console.log(JSON.stringify(this.props.getValue(), null, 2))
    // console.log(JSON.stringify(this.props.getStrings(), null, 2))
    // console.log(JSON.stringify(this.props.getContext(), null, 2))

    if(state === 'idle') return null;

    return (
      <Fragment>
        <HomeSpring
          native
          state={state}
          onRest={this.handleOnRest}
        >
          {({ s, o, t }) => (
            <animated.header className="home" ref={this._ref} tabIndex="-1" style={{ transform: t.interpolate(t => `translateY(-${t}%)`) }}>
              <animated.div className="home__wrapper" style={{ opacity: o.interpolate(o => o), transform: s.interpolate(s => `rotate(-45deg) scale(${s})`)  }}>
                <BlockquoteStart ready={ready} />
                <Title ready={ready} />
                <BlockquoteEnd ready={ready}>
                  <BlockquoteEndContent ready={ready} />
                </BlockquoteEnd>
                <Abstract ready={ready} sections={{}} />
                <HomeNav ready={ready} items={['album', 'split', 'ep']} from={50} section="releases" />
                <HomeNav ready={ready} items={['nevers', 'rouge']} from={-50} section="videos" onRest={this.props.onNext} />
              </animated.div>
            </animated.header>
          )}
        </HomeSpring>
        {/*<button onClick={this.props.onNext} style={{ position: 'absolute', zIndex: 5000}}>
          NEXT
        </button>*/}
      </Fragment>
    )
  }
}

const mapAppContextToProps = context => ({
  // isIdle: context.matches('ready.home.hero.idle'),
  state: context.value.ready.home.hero
});

export default withApp(mapAppContextToProps)(Home);

