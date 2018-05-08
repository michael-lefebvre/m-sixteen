import React      from 'react'
import classNames from 'classnames'

import './styles.css'

const Index = ({ active, back, onReady }) =>
{
  const className = classNames('header header__split', {
      'header__split--in':   active || back
    , 'header--current':     active
    , 'header--previous':    back
  })

  return (
    <div className={className}>
      <div className="header__split__container">
        <div className="header__split__bkgd" />
        <div className="header__split__cover" onTransitionEnd={onReady} />
      </div>
    </div>
  )
}

export default Index
