import React      from 'react'
import classNames from 'classnames'

import './styles.css'

const Index = ({ active, off, back, onReady }) =>
{
  const className = classNames('header header__album', {
      'header__album--in':   active || back
    , 'header--current':     active
    , 'header--previous':    back
    , 'header__album--out':  off
  })

  return (
    <div className={className}>
      <div className="header__album__cover" onAnimationEnd={onReady}>
        <ul className="header__album__tracks album__font">
          {/*<li style={{zIndex: 1}}>
            <span className="album__font__regular album__font__regular--a1" style={{ marginLeft: 108, paddingRight: 3 }}>ana</span>
            <span className="album__font__collapse--f album__font__collapse--f--a2" style={{ background: '#040301', paddingRight: 1 }}>
              <span style={{ marginLeft: -2 }}>to</span>
            </span>
            <span className="album__font__regular"><span className="album__font__collapse">m</span></span>
            <span className="album__font__collapse album__font__collapse--f--a3" style={{ background: '#040301' }}>y</span>
          </li>
          <li>
            <span className="album__font__regular" style={{ paddingLeft: 20, marginLeft: 87 }}>
              mon
            </span>
            <span className="album__font__collapse--f" style={{ background: '#040301' }}>ster</span>
          </li>
          <li>
            <span style={{ paddingLeft: 85 }}>roug</span>
            <span className="album__font__regular" style={{ paddingRight: 140 }}>
              <span className="album__font__collapse">e</span>
            </span>
          </li>
          <li>
            <span className="album__font__regular" style={{ paddingLeft: 24, marginLeft: 184 }}>fil</span>
            <span className="album__font__collapse--f">l th</span>
            <span className="album__font__regular album__font__collapse--f" style={{ width: 16 }}>e</span>
            <span> gap</span>
          </li>
          <li>
            <span style={{ paddingLeft: 95 }}>
              fix
              <span className="album__font__regular album__font__regular--ff1" style={{ marginLeft: -5, paddingLeft: 6, paddingRight: 8 }}>ed </span>
              <span style={{ height: 21, marginLeft: -5 }}>fa</span>
              <span className="album__font__regular album__font__regular--ff2" style={{ marginLeft: -4, paddingLeft: 2, paddingRight: 30 }}>ce</span>
            </span>
          </li>
          <li>
            <span className="album__font__regular" style={{ paddingLeft: 72.5 }}>Vio</span>
            <span className="album__font__collapse--f">lent apa</span>
            <span className="album__font__regular">th</span>
            <span className="album__font__collapse--f" style={{ background: '#040301'}}>y</span>
          </li>
          <li>
            <span style={{ paddingLeft: 137 }}>
              bla
              <span className="album__font__regular album__font__collapse" style={{ marginLeft: 2 }}>
                <span className="album__font__collapse--f">nk h</span>
              </span>
              <span className="album__font__collapse--f">ead</span>
            </span>
          </li>
          <li style={{zIndex: 1}}>
            <span className="album__font__regular" style={{ paddingLeft: 80, marginRight: 2, marginLeft: 170 }}>
              <span style={{ marginRight: -3 }}>ten</span>
            </span>
            <span style={{ paddingLeft: 1 }}>ia</span>
          </li>
          <li>
            <span style={{ paddingLeft: 46 }}>
              th
              <span className="album__font__collapse--f album__font__regular" style={{ height: 21 }}>e ch</span>
              <span className="album__font__collapse--f" style={{ background: '#040301' }}>ang</span>
              <span className="album__font__collapse album__font__regular" style={{ marginLeft: 0, width: 60 }}>
                <span className="album__font__collapse--f">e</span>
              </span>
            </span>
          </li>
          <li>
            <span style={{ paddingLeft: 84 }}>
              E<span style={{ fontSize: 28, top: -2 }}>q</span>
              <span className="album__font__collapse">
                ui
                <span className="album__font__regular" style={{ marginLeft: -2, borderLeft: '4px solid #040301' }}>
                  <span className="album__font__collapse--f">l</span>
                  <span style={{ background: '#040301', display: 'inline-block', width: 7, height: '100%', marginRight: 2, borderLeft: '2px solid #fff'}}></span>
                  b
                </span>
                <span className="album__font__collapse--f">rist</span>
              </span>
            </span>
          </li>*/}
        </ul>
      </div>
    </div>
  )
}

export default Index
