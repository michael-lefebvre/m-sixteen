import React from 'react'

import './styles.css'

const Index = ({ screenHeight }) =>
{
  return (
    <div className="home" style={{ height: screenHeight }}>
      <div className="home__content">
        <div className="home__header">
          <h1>m-sixteen</h1>
          <p>paris punk rock, 2000-2010</p>
        </div>
        <p><a href="https://www.facebook.com/M-SIXTEEN-58910733346/" target="_blank" rel="noopener noreferrer">facebook</a></p>
      </div>
    </div>
  )
}

export default Index
