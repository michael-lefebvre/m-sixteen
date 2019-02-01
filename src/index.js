import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from "react-router-dom"
import AppContext from 'Contexts/App'
import Layout from 'Layout'
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
  <App />,
  document.getElementById('app-root')
)

registerServiceWorker()
