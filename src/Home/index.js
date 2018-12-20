import React       from 'react'
import MediaQuery from 'react-responsive'
import Provider   from 'Views/Provider'
import Landing    from 'Views/Landing'

// const Index = () => <h2>Home</h2>;
// const About = () => <h2>About</h2>;
// const Users = () => <h2>Users</h2>;


// import classNames  from 'classnames'

// import { withApp } from 'Views/Provider'
// import Image       from 'Views/Image'
// import Figure    from 'Views/Image'

// import Icon        from './icon-scroll.svg'

import './styles.css'


// <header className="_home">
//   <div className="_home__wrapper">
//     <blockquote className="_home__quote _home__quote--start">
//       _home__quote--start
//     </blockquote>
//     <blockquote className="_home__quote _home__quote--end">
//       _home__quote--end
//     </blockquote>
//   </div>
// </header>

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

  const handleOnClick = () => document.body.classList.toggle("rotate");

  return (
    <MediaQuery minWidth={992} className="site">
    { matches => (
      <Provider Desktop={matches}>
        <Landing />
        <header className="home">
          <div className="home__wrapper home__wrapper--hover-">
            <blockquote className="home__quote home__quote--start">
              There 's nothing left<br className="home__quote__br" />
              {" "}but a corpse
            </blockquote>
            <div className="home__title">
              <h1 className="home__title__primary">m-sixteen</h1>
              <h2 className="home__title__sub"><span>paris punk rock, 2000-2010</span></h2>
            </div>
            <blockquote className="home__quote home__quote--end">
              <span className="home__quote--end__text"><span>A crash of</span></span><br />
              <span className="home__quote--end__text"><span>flesh and bones</span></span>
              <span className="home__quote--end__hr" />
            </blockquote>
            <div className="home__abstract">
              <p className="home__abstract__txt">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent condimentum bibendum rhoncus. Duis viverra tempus felis, eu tempor nisi fringilla ac.
              </p>
              <hr className="home__abstract__hr" />
            </div>
            <ul className="home__releases">
              <li className="home__releases__item" onClick={handleOnClick}>
                <img src="/static/covers/album.jpg" className="home__releases__cover" alt="" />
              </li>
              <li className="home__releases__item">
                <img src="/static/covers/split.jpg" className="home__releases__cover" alt="" />
              </li>
              <li className="home__releases__item">
                <img src="/static/covers/ep.jpg" className="home__releases__cover" alt="" />
              </li>
            </ul>
            <ul className="home__videos">
              <li className="home__videos__item">
                <img src="/static/photos/videos/nevers-md.jpg" className="home__videos__cover" alt="" />
              </li>
              <li className="home__videos__item">
                <img src="/static/photos/videos/rouge-md.jpg" className="home__videos__cover" alt="" />
              </li>
            </ul>
          </div>
        </header>
      </Provider>
    )}
    </MediaQuery>
  )
}

export default Home
