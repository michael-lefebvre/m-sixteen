import React       from 'react'
import classNames  from 'classnames'

import { withApp } from 'Views/Provider'
// import Image       from 'Views/Image'
import Figure    from 'Views/Image'

import Icon        from './icon-scroll.svg'

import './styles.css'

const Index = ({ screenHeight, screenWidth, currentView }) =>
{
  var width       = screenWidth > 680 ? 680 : screenWidth
    , height      = width > 530 ? screenHeight : 'auto'
  //   , thumbWidth  = screenWidth
  //   , thumbHeight = ( 2 * Math.round( ( thumbWidth * .7) / 2 ) )

  // if( width > 530 )
  // {
  //   thumbWidth  = ( 2 * Math.round( ( ( width / 2 ) - 10 ) / 2 ) )
  //   thumbHeight = ( 2 * Math.round( ( thumbWidth * .67) / 2 ) )
  // }

  return (
    <div className={classNames('home', { 'home--in': currentView === 'home' })} style={{ height }}>
      <div className="home__content">
        <div className="home__header">
          <h1>m-sixteen</h1>
          <p>paris punk rock, 2000-2010</p>
        </div>
        <div className="home__videos">
          <div className="home__video">
            {/*<Image path="videos/rouge" video="Fj8WOeQamvw" className="page__image--homevideo" />*/}
            <Figure path="videos/rouge" video="Fj8WOeQamvw" className="page__image--homevideo" />
            <span>Rouge video</span>
          </div>
          <div className="home__video">
            <Figure path="videos/nevers" video="AymtEvBubmQ" className="page__image--homevideo" />
            {/*<Image path="videos/nevers" video="AymtEvBubmQ" className="page__image--homevideo" />*/}
            <span>Live at Nevers, 2007</span>
          </div>
        </div>
        {/*<p><a href="https://www.facebook.com/M-SIXTEEN-58910733346/" target="_blank" rel="noopener noreferrer">facebook</a></p>*/}
      </div>
      <img className="home__scroll" src={Icon} alt="" />
    </div>
  )
}

export default withApp( Index )
