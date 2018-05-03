import React                 from 'react'
import ReactDOM              from 'react-dom'

import App                   from 'Views/App'
import registerServiceWorker from 'registerServiceWorker'

import 'Scss/index.css'

ReactDOM.render(
    <App />
  , document.getElementById('root')
)

registerServiceWorker()
