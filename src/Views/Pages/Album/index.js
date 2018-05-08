import React, { PureComponent } from 'react'
// import { findDOMNode }          from 'react-dom'
// import YouTube    from 'react-youtube'

import Img1       from './img-1.jpg'
// import Img3       from './img-3.jpg'
import Img5       from './img-5.jpg'
import Img4       from './img-4.jpg'
import Vid1       from './video-1.jpg'

import './styles.css'


class Index extends PureComponent
{
  // constructor( props )
  // {
  //   super( props )

  //   this.state = {
  //       mounted: false
  //     , visible: false
  //   }
  // }

  //
  // Life cycle
  // --------------------------------------------------

  // componentWillMount()
  // {
  //   console.log('componentWillMount')
  // }

  // componentDidMount()
  // {
  //   var page        = findDOMNode( this.refs.page )
  //     , placeholder = page.querySelector('.placeholder')
  //     , small       = placeholder.querySelector('.img-small')

  //   // 1: load small image and show it
  //   var img = new Image()
  //   img.src = small.src
  //   img.onload = function () {
  //    small.classList.add('loaded')
  //   }

  //   // 2: load large image
  //   var imgLarge = new Image()
  //   imgLarge.src = placeholder.dataset.large
  //   imgLarge.onload = function () {
  //     setTimeout(() => imgLarge.classList.add('loaded'), 2000 )

  //   }
  //   placeholder.appendChild(imgLarge)
  // }

  // componentDidUpdate()
  // {
  //   console.log('componentDidUpdate')
  // }

  // componentWillUnmount()
  // {
  //   console.log('componentWillUnmount')
  // }

  //
  // Render
  // --------------------------------------------------

  render()
  {
    // const { styleHeader, styleFooter } = this.props

    // const videoOpts = {
    //     height: this.props.lineHeight
    //   , playerVars: { // https://developers.google.com/youtube/player_parameters
    //         autoplay: 0
    //       , controls: 1
    //       , showinfo: 0
    //       , rel:      0
    //       , modestbranding: 1
    //     }
    // }

    const styleLine = { height: this.props.lineHeight }

    return (
      <div className="page__container page__container--album" ref={this.props.pageRef}>
        <div className="page__content">
          <div className="page__line" style={styleLine}>
            <img src={Img4} className="page__img page__img--album1" alt="" />
            <div className="page__box page__box--album1">
              <h3>
                <span>self-entitled</span>
                <span>2008</span>
              </h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam posuere ex non nisl rutrum dapibus. Nullam eleifend maximus libero at maximus.</p>
            </div>
          </div>
          <div className="page__line" style={{ height: this.props.lineHeight * 1.5 }}>
            <img src={Img1} className="page__img page__img--album2 page__img--vert" style={styleLine} alt="" />
            <img src={Img5} className="page__img page__img--album3 page__img--vert" style={styleLine} alt="" />
          </div>
          <div className="page__line" style={styleLine}>
            <div className="page__box page__box--album2">
              <h3>
                <span>Rouge</span>
                <span>music video</span>
              </h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam posuere ex non nisl rutrum dapibus. Nullam eleifend maximus libero at maximus.</p>
            </div>
            {/*<YouTube videoId="Fj8WOeQamvw" opts={videoOpts} containerClassName="page__img page__img--album4" />*/}
            <div className="page__img page__img--video page__img--album4"><img src={Vid1} alt="" /></div>
          </div>
          {/*<img src={Img1} className="img-vert" alt="" />
          <img src={Img3} className="img-horz" alt="" />
          <img src={Img5} className="img-vert" alt="" />*/}
          {/*<YouTube videoId="AymtEvBubmQ" opts={videoOpts} containerClassName="page__container__video" />*/}
          {/*<YouTube videoId="Fj8WOeQamvw" opts={videoOpts} containerClassName="page__container__video" />*/}
          {/*<div className="placeholder" data-large="https://cdn-images-1.medium.com/max/1800/1*sg-uLNm73whmdOgKlrQdZA.jpeg">
            <img src="https://cdn-images-1.medium.com/freeze/max/27/1*sg-uLNm73whmdOgKlrQdZA.jpeg?q=2011" className="img-small" />
            <div style={{ paddingBottom: '66%' }} />
          </div>*/}
        {/*<iframe style={{border: 0, width: '100%', height: 42 }} src="https://bandcamp.com/EmbeddedPlayer/album=3663253985/size=small/bgcol=333333/linkcol=ffffff/transparent=true/" seamless><a href="http://m-sixteen.bandcamp.com/album/s-t">S/T by m-sixteen</a></iframe>*/}
        </div>
      </div>
    )
  }
}

export default Index
