import React       from 'react'
import classNames  from 'classnames'

import { withApp } from 'Views/Provider'

import './styles.css'

const Index = ({ screenHeight, currentView }) =>
  <div className="home" style={{ height: screenHeight }}>
    <div className={classNames('home__content', { 'home__content--in': currentView === 0 })}>
      <div className="home__header">
        <h1>m-sixteen</h1>
        <p>paris punk rock, 2000-2010</p>
      </div>
      <p><a href="https://www.facebook.com/M-SIXTEEN-58910733346/" target="_blank" rel="noopener noreferrer">facebook</a></p>
    </div>
  </div>

export default withApp( Index )
