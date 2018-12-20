import React       from 'react'


// const Index = () => <h2>Home</h2>;
// const About = () => <h2>About</h2>;
// const Users = () => <h2>Users</h2>;


// import classNames  from 'classnames'

// import { withApp } from 'Views/Provider'
// import Image       from 'Views/Image'
// import Figure    from 'Views/Image'

// import Icon        from './icon-scroll.svg'

import './styles.css'

const Home = () =>
{
  // var width       = screenWidth > 680 ? 680 : screenWidth
  //   , height      = width > 530 ? screenHeight : 'auto'
  //   , thumbWidth  = screenWidth
  //   , thumbHeight = ( 2 * Math.round( ( thumbWidth * .7) / 2 ) )

  // if( width > 530 )
  // {
  //   thumbWidth  = ( 2 * Math.round( ( ( width / 2 ) - 10 ) / 2 ) )
  //   thumbHeight = ( 2 * Math.round( ( thumbWidth * .67) / 2 ) )
  // }

  return (
    <header>
      <div className="home-wrapper">
        <blockquote className="home__quote">
          There nothing left<br className="home__quote__br" />
          {" "}but a corpse
        </blockquote>
        <h1 className="home_title">m-sixteen</h1>
        <h3 className="home_subtitle">paris punk rock, 2000-2010</h3>
        <div className="home_stats">
          <ul>
            <li>128 shows</li>
            <li>15 countries</li>
            <li>78 cities</li>
            <li>151 bands</li>
          </ul>
        </div>
        <div className="home__releases">
          <ul>
            <li className="home__releases__item">
              <a href="/releases/self-entitled">self-entitled <small className="home__releases__date">2007</small></a>
            </li>
            <li className="home__releases__item">
              <a href="/releases/split">Split w/ the Missing 23rd <small className="home__releases__date">2003</small></a>
            </li>
            <li className="home__releases__item">
              <a href="/releases/ep">EP <small className="home__releases__date">2001</small></a>
            </li>
          </ul>
        </div>
        <footer className="home__footer">
          Follow <a href="http://twitter.com/jensimmons">@jensimmons</a> on Twitter for more as it happens.<br />
          Sign up for <a href="http://layout.land">Layout Land</a>, a place for us to show off new ideas for layout.
        </footer>
      </div>
    </header>
  )
}

export default Home
