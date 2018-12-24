import React, { Fragment } from 'react'
import ReactDOM              from 'react-dom'
import MediaQuery from 'react-responsive'
import { BrowserRouter, Route } from "react-router-dom";
import Provider   from 'Views/Provider'
import Landing    from 'Views/Landing'
import Home                   from 'Home'
import Releases                   from 'Releases'
import Videos                   from 'Videos'
import registerServiceWorker from 'registerServiceWorker'

import 'Scss/index.scss'

const MainRoute = () => (
  <Fragment>
    <Landing />
    <Home />
    <Releases />
    <Videos />
  </Fragment>
);

const App = () => (
  <BrowserRouter>
    <MediaQuery minWidth={992} className="site">
    { matches => (
      <Provider Desktop={matches}>
        <Route path="/:section?/:id?" component={MainRoute} />
      </Provider>
    )}
    </MediaQuery>
  </BrowserRouter>
)

ReactDOM.render(
    <App />
  , document.getElementById('app-root')
)

registerServiceWorker()
