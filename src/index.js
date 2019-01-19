import React from 'react'
import ReactDOM              from 'react-dom'
// import MediaQuery from 'react-responsive'
import { BrowserRouter, Route } from "react-router-dom";
import AppContext from 'Contexts/App';
// import Provider   from 'Views/Provider'
// import Landing    from 'Views/Landing'
import Layout                   from 'Layout'
// import Home                   from 'Home'
// import Releases                   from 'Releases'
// import Videos                   from 'Videos'
import registerServiceWorker from 'registerServiceWorker'

import 'Scss/index.scss'

const MainRoute = () => (
  <AppContext>
    <Layout />
  </AppContext>
)

const App = () => (
  <BrowserRouter>
    <Route path="/:section?/:id?" component={MainRoute} />
  </BrowserRouter>
)

ReactDOM.render(
    <App />
  , document.getElementById('app-root')
)

registerServiceWorker()
