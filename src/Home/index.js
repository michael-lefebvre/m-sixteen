import React, { PureComponent, Fragment } from 'react'
import { Spring, Trail, animated } from 'react-spring'
import { withApp } from 'Views/Provider'
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
    {({ y, w, t }) => (
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
            {item => styles => (
              <animated.li className="home__nav__item" style={styles}>
                <img src={item} className="home__nav__thumb" alt="" />
              </animated.li>
            )}
          </Trail>
        </animated.ul>
      )}
    </Spring>
  )
}


class Home extends PureComponent {
  state = { ready: false, leave: false };
  _ref = React.createRef();
  componentDidMount() {
    this._ref.current.focus()
    this._setReady()
  }
  componentDidUpdate() {
    this._setReady()
  }
  _setReady() {
    const ready = !!this.props.landingVideo;

    if(!ready)
      return

    if(ready && !this.state.ready)
      this.setState({ ready: true })
  }

  handleOnClick = () => {
    this.setState({ leave: !this.state.leave })
  };

  handleOnRest = () => {
    console.log('handleOnRest')

  };

  render() {
    const { ready, leave } = this.state;

    return (
      <Spring
        native
        immediate={!leave}
        from={{ s: 1, o: 1 }}
        to={{ s: leave ? .93 : 1, o: leave ? 0 : 1 }}
        >
        {({ s, o }) => (
          <Fragment>
            <header className="home" ref={this._ref} tabIndex="-1" onClick={this.handleOnClick}>
              <animated.div className="home__wrapper" style={{ opacity: o.interpolate(o => o),  transform: s.interpolate(s => `rotate(-45deg) scale(${s})`)  }}>
                <BlockquoteStart ready={ready} />
                <Title ready={ready} />
                <BlockquoteEnd ready={ready}>
                  <BlockquoteEndContent ready={ready} />
                </BlockquoteEnd>
                <Abstract ready={ready} onRest={this.handleOnRest} />
                <HomeNav ready={ready} items={['/static/covers/album.jpg', '/static/covers/split.jpg', '/static/covers/ep.jpg']} from={50} section="releases" />
                <HomeNav ready={ready} items={['/static/photos/videos/nevers-md.jpg', '/static/photos/videos/rouge-md.jpg']} from={-50} section="videos" />
              </animated.div>
            </header>
{/*<div className="horizontal-scroll-wrapper squares">
  <div>item 1</div>
  <div>item 2</div>
  <div>item 3</div>
  <div>item 4</div>
  <div>item 5</div>
  <div>item 6</div>
  <div>item 7</div>
  <div>item 8</div>
</div>*/}
          </Fragment>
        )}
      </Spring>
    )
  }
}

export default withApp( Home )
