import React, { Fragment } from 'react';
import { Keyframes, Trail, animated, config } from 'react-spring';
import delay from 'delay';
import { Link } from 'react-router-dom';
import { Image } from 'Components';

const fromProps = {
  BlockquoteStartClipPath: 'polygon(0% 0%, 0% 0%, -10% 100%, 0% 100%)',
  BlockquoteStartTranslateX: 170,
  BlockquoteEndMarginTop: 70,
  BlockquoteEndContentTranslateY: -30,
  BlockquoteEndContentTranslateX: -170,
  BlockquoteEndContentWidth: 0,
  TitleHeight: 0,
  TitleOpacity: 0,
  TitleTranslateY: 200,
  AbstractWidth: 0,
  AbstractTranslateY: -100,
  ReleasesNavTranslateX: 50,
  VideosNavTranslateX: -50
};

const toProps = {
  BlockquoteStartClipPath: 'polygon(0% 0%, 110% 0%, 100% 100%, 0% 100%)',
  BlockquoteStartTranslateX: 0,
  BlockquoteEndMarginTop: 83,
  BlockquoteEndContentTranslateY: 0,
  BlockquoteEndContentTranslateX: 0,
  BlockquoteEndContentWidth: 100,
  TitleHeight: 305,
  TitleOpacity: 1,
  TitleTranslateY: 0,
  AbstractWidth: 100,
  AbstractTranslateY: 0,
  ReleasesNavTranslateX: 0,
  VideosNavTranslateX: 0,
  HomeNavActive: true
};

const _smallProps = { immediate: true, to: { ...toProps, TitleHeight: 246 } };
const _mediumProps = {
  immediate: true,
  to: { ...toProps, BlockquoteEndMarginTop: 0 }
};
const _largeProps = { immediate: true, to: toProps };

const Elements = Keyframes.Spring({
  'small:mounted': _smallProps,
  'medium:mounted': _mediumProps,
  'large:mounted': async (next, cancel, { onRest, mounted }) => {
    if (mounted) {
      await next(_largeProps);
      return;
    }
    await delay(300);
    next({
      from: fromProps,
      BlockquoteStartClipPath: toProps.BlockquoteStartClipPath,
      config: config.molass
    });
    await delay(200);
    next({
      BlockquoteEndContentWidth: toProps.BlockquoteEndContentWidth,
      config: config.molass
    });
    await delay(200);
    next({
      BlockquoteStartTranslateX: toProps.BlockquoteStartTranslateX,
      BlockquoteEndContentTranslateX: toProps.BlockquoteEndContentTranslateX,
      config: config.molass
    });
    await delay(400);
    next({
      TitleHeight: toProps.TitleHeight,
      TitleOpacity: toProps.TitleOpacity,
      BlockquoteEndMarginTop: toProps.BlockquoteEndMarginTop,
      config: config.molass
    });
    await delay(300);
    next({
      BlockquoteEndContentTranslateY: toProps.BlockquoteEndContentTranslateY,
      config: config.molass
    });
    next({
      TitleTranslateY: toProps.TitleTranslateY,
      config: config.molass
    });
    await delay(300);
    next({
      AbstractWidth: toProps.AbstractWidth,
      config: config.molass
    });
    await delay(200);
    next({
      AbstractTranslateY: toProps.AbstractTranslateY,
      config: config.molass
    });
    // await delay(100);
    await next({
      HomeNavActive: true,
      ReleasesNavTranslateX: toProps.ReleasesNavTranslateX,
      ReleasesNavOpacity: toProps.ReleasesNavOpacity,
      VideosNavTranslateX: toProps.VideosNavTranslateX,
      VideosNavOpacity: toProps.VideosNavOpacity,
      config: config.molass
    });
    if (onRest) {
      await delay(100);
      onRest();
    }
  }
});

const BlockquoteStart = ({
  style: { BlockquoteStartClipPath, BlockquoteStartTranslateX }
}) => (
  <animated.blockquote
    className="home__quote home__quote--start"
    style={{
      clipPath: BlockquoteStartClipPath,
      transform: BlockquoteStartTranslateX.interpolate(
        t => `translateX(${t}px)`
      )
    }}
  >
    There 's nothing left
    <br className="home__quote__br" /> but a corpse
  </animated.blockquote>
);

const BlockquoteEnd = ({ children, style: { BlockquoteEndMarginTop } }) => (
  <animated.blockquote
    className="home__quote home__quote--end"
    style={{ marginTop: BlockquoteEndMarginTop.interpolate(t => `-${t}px`) }}
  >
    {children}
  </animated.blockquote>
);

const BlockquoteEndContent = ({
  style: {
    BlockquoteEndContentWidth,
    BlockquoteEndContentTranslateY,
    BlockquoteEndContentTranslateX
  }
}) => (
  <Fragment>
    <span className="home__quote--end__text">
      <animated.span
        style={{
          transform: BlockquoteEndContentTranslateY.interpolate(
            y => `translateY(${y}px)`
          )
        }}
      >
        A crash of
      </animated.span>
    </span>
    <br />
    <span className="home__quote--end__text">
      <animated.span
        style={{
          transform: BlockquoteEndContentTranslateY.interpolate(
            y => `translateY(${y}px)`
          )
        }}
      >
        flesh and bones
      </animated.span>
    </span>
    <animated.span
      className="home__quote--end__hr"
      style={{
        width: BlockquoteEndContentWidth.interpolate(w => `${w}%`),
        transform: BlockquoteEndContentTranslateX.interpolate(
          x => `translateX(${x}px)`
        )
      }}
    />
  </Fragment>
);

const Title = ({ style: { TitleHeight, TitleOpacity, TitleTranslateY } }) => (
  <animated.div
    className="home__title"
    style={{ height: TitleHeight.interpolate(h => `${h}px`) }}
  >
    <animated.h1
      className="home__title__primary"
      style={{ opacity: TitleOpacity.interpolate(o => o) }}
    >
      m-sixteen
    </animated.h1>
    <h2 className="home__title__sub">
      <animated.span
        style={{
          transform: TitleTranslateY.interpolate(t => `translateY(${t}%)`)
        }}
      >
        paris punk rock, 2000-2010
      </animated.span>
    </h2>
  </animated.div>
);

const Abstract = ({ style: { AbstractWidth, AbstractTranslateY } }) => (
  <div className="home__abstract">
    <div className="home__abstract__drawer">
      <animated.p
        className="home__abstract__txt"
        style={{
          transform: AbstractTranslateY.interpolate(t => `translateY(${t}%)`)
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
        condimentum bibendum rhoncus. Duis viverra tempus felis.
      </animated.p>
    </div>
    <animated.hr
      className="home__abstract__hr"
      style={{ width: AbstractWidth.interpolate(w => `${w}%`) }}
    />
  </div>
);

const HomeNav = ({
  translateX,
  HomeNavActive,
  mounted,
  items,
  section,
  onClick = () => null
}) => (
  <animated.ul
    className={`home__nav home__nav--${section}`}
    style={{ transform: translateX.interpolate(t => `translateX(${t}%)`) }}
  >
    <Trail
      items={items}
      immediate={mounted}
      config={config.slow}
      from={{ opacity: 0 }}
      to={{ opacity: HomeNavActive ? 1 : 0 }}
    >
      {item => styles => (
        <animated.li className="home__nav__item" style={styles}>
          <Link to={`/${section}/${item}`}>
            <Image
              className={`home__nav__thumb home__nav__thumb--${section}`}
              type={section}
              onClick={onClick}
              src={item}
            />
          </Link>
        </animated.li>
      )}
    </Trail>
  </animated.ul>
);

Elements.BlockquoteStart = BlockquoteStart;
Elements.BlockquoteEnd = BlockquoteEnd;
Elements.BlockquoteEndContent = BlockquoteEndContent;
Elements.Title = Title;
Elements.Abstract = Abstract;
Elements.HomeNav = HomeNav;

export default Elements;
