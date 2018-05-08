import React      from 'react'
import classNames from 'classnames'

import './styles.css'

const Index = ({ active, back, onReady }) =>
{
  const className = classNames('header header__ep', {
      'header__ep--in':   active || back
    , 'header--current':     active
    , 'header--previous':    back
  })

  return (
    <div className={className}>
      <div className="header__ep__cover" onTransitionEnd={onReady} />
    </div>
  )
}

export default Index
