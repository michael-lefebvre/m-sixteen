import React, { PureComponent } from 'react';
import { Keyframes, animated } from 'react-spring'
import { Link, NavLink } from "react-router-dom";
import delay from 'delay'
import { withApp } from 'Hoc'
import { getNavImgSrc } from 'Utils'
import './index.scss'

const _NAV_WIDTH = 36;
const _NAV_LINK_HEIGHT = 10;
const _NAV_DRAWER_PADDING = 2;
const _NAV_COVER_MARGIN = 5;
const _NAV_COVERS_HEIGHT = ((_NAV_WIDTH + _NAV_COVER_MARGIN) * 3);
const _NAV_CLOSE_Y = _NAV_LINK_HEIGHT + _NAV_DRAWER_PADDING;
const _NAV_COVERS_Y_FULL = _NAV_CLOSE_Y + _NAV_COVERS_HEIGHT;
const _NAV_COVERS_Y = _NAV_COVERS_HEIGHT;

// nW: nav Width
// cbT: close button translateY
// clT: covers list translateY
// mbO: more button opacity

const getInitialProps = () => ({ nW: 0, cbT: _NAV_CLOSE_Y, clT: _NAV_COVERS_Y_FULL, mbO: 1 });

const NavState = Keyframes.Spring({
  unmounted: getInitialProps(),
  mounted: async next => {
    next({ nW: _NAV_WIDTH, from: getInitialProps() })
    await delay(300)
    next({ cbT: 0, clT: _NAV_COVERS_Y })
  },
  expend: async next => {
    next({ mbO: 0, clT: 0 })
  },
  unexpend: async next => {
    await delay(300)
    next({ clT: _NAV_COVERS_Y })
    await delay(200)
    next({ mbO: 1 })
  },
})

class ReleasesNav extends PureComponent {

  state = {
    coversState: undefined
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { isIdle, isLeaving } = nextProps

    if(prevState.coversState !== undefined && (isIdle || isLeaving))
      return {
        coversState: undefined
      }

    return null;
  }


  handleOnMouseEnter = () => {
    if(this.props.isIdle) return
    if(this.state.coversState === 'expend') return
    this.setState({ coversState: 'expend' }, () => this.props.onSend('RELEASE.PENDING'))
  };

  handleOnMouseLeave = () => {
    // if(!this.props.isMounted && this.state.coversState !== undefined)
    //   return this.setState({ coversState: undefined })

    if(this.state.coversState === 'unexpend') return

    this.setState({ coversState: 'unexpend' })
  };

  render() {
    const { isMounted, isIdle, isLeaving } = this.props;
    const { coversState } = this.state;
    const state = (isIdle || isLeaving) ? 'unmounted' : coversState === undefined ? 'mounted' : coversState;
    return (
      <NavState
        native
        state={state}
      >
        {({ nW, cbT, clT, mbO }) => (
          <div className={`releases__nav ${isMounted ? 'releases__nav--mounted' : ''}`}>
            <div className="releases__nav__drawer releases__nav__drawer--close">
              <animated.div
                className="releases__nav__drawer__content"
                style={{
                  transform: cbT.interpolate(p => `translateY(${p}px)`),
                }}
              >
                <Link
                  to="/"
                  className="releases__nav__link"
                >
                  close
                </Link>
              </animated.div>
            </div>
            <animated.div
              className="releases__nav__hr"
              style={{
                width: nW.interpolate(p => p),
              }}
            />
            <div
              className="releases__nav__drawer releases__nav__drawer--covers"
              onMouseLeave={this.handleOnMouseLeave}
            >
              <animated.div
                className="releases__nav__drawer__content"
                style={{
                  transform: clT.interpolate(p => `translateY(-${p}px)`),
                }}
              >
                <div
                  className="releases__nav__covers"
                  onMouseEnter={this.handleOnMouseEnter}
                >
                  {['album', 'split', 'ep'].map(item =>
                    <NavLink
                      to={`/releases/${item}`}
                      key={`releases__nav__covers__${item}`}
                      className="releases__nav__covers__link"
                      activeClassName="releases__nav__covers__link--active"
                    >
                      <img
                        src={getNavImgSrc('releases', item)}
                        className={`releases__nav__covers__img releases__nav__covers__img--${item}`}
                        alt=""
                      />
                    </NavLink>
                  )}
                </div>
                <animated.div
                  className="releases__nav__link"
                  onClick={this.handleOnMouseEnter}
                  style={{
                    opacity: mbO.interpolate(p => p),
                  }}
                >
                  more
                </animated.div>
              </animated.div>
            </div>
          </div>
        )}
      </NavState>
    )
  }
}

const mapContextToProps = (context) => ({
  isIdle: context.matches('ready.releases.idle'),
  isMounted:context.matches('ready.releases.mounted'),
  isLeaving:context.matches('ready.releases.leaving'),
});

export default withApp(mapContextToProps)(ReleasesNav);
