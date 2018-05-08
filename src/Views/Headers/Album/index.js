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
    <div className={className} onAnimationEnd={onReady}>
      <ul className="header__album__tracks">
        <li style={{zIndex: 1}}>
          <span className="header__album__track__regular header__album__track__regular--a1" style={{ marginLeft: 108, paddingRight: 3 }}>ana</span>
          <span className="header__album__track__collapse--f header__album__track__collapse--f--a2" style={{ background: '#040301', paddingRight: 1 }}>
            <span style={{ marginLeft: -2 }}>to</span>
          </span>
          <span className="header__album__track__regular"><span className="header__album__track__collapse">m</span></span>
          <span className="header__album__track__collapse header__album__track__collapse--f--a3" style={{ background: '#040301' }}>y</span>
        </li>
        <li>
          <span className="header__album__track__regular" style={{ paddingLeft: 20, marginLeft: 87 }}>
            mon
          </span>
          <span className="header__album__track__collapse--f" style={{ background: '#040301' }}>ster</span>
        </li>
        <li>
          <span style={{ paddingLeft: 85 }}>roug</span>
          <span className="header__album__track__regular" style={{ paddingRight: 140 }}>
            <span className="header__album__track__collapse">e</span>
          </span>
        </li>
        <li>
          <span className="header__album__track__regular" style={{ paddingLeft: 24, marginLeft: 184 }}>fil</span>
          <span className="header__album__track__collapse--f">l th</span>
          <span className="header__album__track__regular header__album__track__collapse--f" style={{ width: 16 }}>e</span>
          <span> gap</span>
        </li>
        <li>
          <span style={{ paddingLeft: 95 }}>
            fix
            <span className="header__album__track__regular header__album__track__regular--ff1" style={{ marginLeft: -5, paddingLeft: 6, paddingRight: 8 }}>ed </span>
            <span style={{ height: 21, marginLeft: -5 }}>fa</span>
            <span className="header__album__track__regular header__album__track__regular--ff2" style={{ marginLeft: -4, paddingLeft: 2, paddingRight: 30 }}>ce</span>
          </span>
        </li>
        <li>
          <span className="header__album__track__regular" style={{ paddingLeft: 72.5 }}>Vio</span>
          <span className="header__album__track__collapse--f">lent apa</span>
          <span className="header__album__track__regular">th</span>
          <span className="header__album__track__collapse--f" style={{ background: '#040301'}}>y</span>
        </li>
        <li>
          <span style={{ paddingLeft: 137 }}>
            bla
            <span className="header__album__track__regular header__album__track__collapse" style={{ marginLeft: 2 }}>
              <span className="header__album__track__collapse--f">nk h</span>
            </span>
            <span className="header__album__track__collapse--f">ead</span>
          </span>
        </li>
        <li style={{zIndex: 1}}>
          <span className="header__album__track__regular" style={{ paddingLeft: 80, marginRight: 2, marginLeft: 170 }}>
            <span style={{ marginRight: -3 }}>ten</span>
          </span>
          <span style={{ paddingLeft: 1 }}>ia</span>
        </li>
        <li>
          <span style={{ paddingLeft: 46 }}>
            th
            <span className="header__album__track__collapse--f header__album__track__regular" style={{ height: 21 }}>e ch</span>
            <span className="header__album__track__collapse--f" style={{ background: '#040301' }}>ang</span>
            <span className="header__album__track__collapse header__album__track__regular" style={{ marginLeft: 0, width: 60 }}>
              <span className="header__album__track__collapse--f">e</span>
            </span>
          </span>
        </li>
        <li>
          <span style={{ paddingLeft: 84 }}>
            E<span style={{ fontSize: 28, top: -2 }}>q</span>
            <span className="header__album__track__collapse">
              ui
              <span className="header__album__track__regular" style={{ marginLeft: -2, borderLeft: '4px solid #040301' }}>
                <span className="header__album__track__collapse--f">l</span>
                <span style={{ background: '#040301', display: 'inline-block', width: 7, height: '100%', marginRight: 2, borderLeft: '2px solid #fff'}}></span>
                b
              </span>
              <span className="header__album__track__collapse--f">rist</span>
            </span>
          </span>
        </li>
      </ul>
    </div>
  )
}

export default Index