import React from 'react'

import Page  from 'Views/Page'
import Home  from 'Views/Home'
import Album from './Album'
import Split from './Split'
import Ep    from './Ep'

import './styles.css'

const Index = () =>
  <div className="pages">
    <Page id="home">
      <Home />
    </Page>
    <Album />
    <Split />
    <Ep />
  </div>

export default Index
