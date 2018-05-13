import React      from 'react'
import MediaQuery from 'react-responsive'

import Provider   from 'Views/Provider'
import Landing    from 'Views/Landing'
import Headers    from 'Views/Headers'
import Pages      from 'Views/Pages'
import Video      from 'Views/Video'

import './styles.css'

const Index = () =>
  <MediaQuery minWidth={992} className="site">
  { matches => (
    <Provider Desktop={matches}>
      <Landing />
      <Headers />
      <Pages />
      <Video />
    </Provider>
  )}
  </MediaQuery>

export default Index
