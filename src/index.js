import React                 from 'react'
import ReactDOM              from 'react-dom'

// import App                   from 'Views/App'
import App                   from 'Views/Timeline'
import registerServiceWorker from 'registerServiceWorker'

import 'Scss/index.css'

ReactDOM.render(
    <App />
  , document.getElementById('app-root')
)

registerServiceWorker()
