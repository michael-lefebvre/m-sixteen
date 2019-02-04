import React from 'react'
import classNames from 'classnames'

import './index.scss'

const Spinner = ({ theme, className }) => {

  let w = 44 // width & height
    , s = 4  // stroke
    , t = 2  // translate
    , r = 20  // circle radius
    , d = 'M35.816 7.757C32.158 3.037 26.434 0 20 0 8.954 0 0 8.954 0 20'
    , o = .3 // back color opacity
    , f      // front color
    , b      // back color


  switch( theme ) {
    case 'white':
      f = '#fff'
      b = '#fff'
      break
    default:
    case 'dark':
      f = '#ececec'
      b = '#575757'
      o = 1
  }

  return (
    <svg className={classNames('c-spinner', className )} width={w} height={w} viewBox={`0 0 ${w} ${w}`} xmlns="http://www.w3.org/2000/svg">
      <g transform={`translate(${t} ${t})`} strokeWidth={s} fill="none" fillRule="evenodd">
        <circle stroke={f} opacity={o} cx={r} cy={r} r={r}/>
        <path d={d} stroke={b} strokeLinecap="round"/>
      </g>
    </svg>
  )
}

Spinner.defaultProps = {
  theme: 'dark',
  className: ''
}

export default Spinner
