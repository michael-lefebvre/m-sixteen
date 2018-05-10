import React    from 'react'

import Provider from 'Views/Provider'
import Landing  from 'Views/Landing'
import Headers  from 'Views/Headers'
import Pages    from 'Views/Pages'
import Video    from 'Views/Video'

import './styles.css'

const Index = () =>
  <Provider>
    <div className="site">
      <Landing />
      <Headers />
      <Pages />
      <Video />
    </div>
  </Provider>

export default Index
