import React      from 'react'
import classNames from 'classnames'

import './styles.css'

const Index = ({ currentView, previousView, children }) =>
{
  const className = {
      'bkgd--0-1': previousView === 0 && currentView === 1
    , 'bkgd--0-2': previousView === 0 && currentView === 2
    , 'bkgd--0-3': previousView === 0 && currentView === 3
    , 'bkgd--1-0': previousView === 1 && currentView === 0
    , 'bkgd--1-1': previousView === 1 && currentView === 1
    , 'bkgd--1-2': previousView === 1 && currentView === 2
    , 'bkgd--1-3': previousView === 1 && currentView === 3
    , 'bkgd--2-0': previousView === 2 && currentView === 0
    , 'bkgd--2-1': previousView === 2 && currentView === 1
    , 'bkgd--2-3': previousView === 2 && currentView === 3
    , 'bkgd--3-0': previousView === 3 && currentView === 0
    , 'bkgd--3-1': previousView === 3 && currentView === 1
    , 'bkgd--3-2': previousView === 3 && currentView === 2
  }

  return (
    <div className={classNames('bkgd', className )} data-current={currentView} data-previous={previousView}>
      {children}
    </div>
  )
}

export default Index
