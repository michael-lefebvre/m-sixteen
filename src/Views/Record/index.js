import React      from 'react'
import classNames from 'classnames'

import './styles.css'

const Index = ({ currentView, isScrolling }) =>
{
  if( currentView === 0 )
    return null

  const className = {
      'record--active': !isScrolling
    , 'record--1':      currentView === 1
    , 'record--2':      currentView === 2
    , 'record--3':      currentView === 3
  }

  return (
    <div className={classNames('record', className )}>
      <div className="record__content">
        <div className="record__box">
          record {currentView}
        </div>
        <div className="record__box">
          <h2>Tack list</h2>
          <ol>
            <li>Equilibrist</li>
            <li>The Change</li>
            <li>Tenia</li>
            <li>Blank Head</li>
            <li>Violent Apathy</li>
            <li>Fixed Face</li>
            <li>Fill The Gap</li>
            <li>Rouge</li>
            <li>Monster</li>
            <li>Anatomy</li>
          </ol>
        </div>
      </div>
      <div className="record__bkdg" />
    </div>
  )
}

export default Index
