import React                 from 'react'
import ReactDOM              from 'react-dom'
import MediaQuery from 'react-responsive'
import Provider   from 'Views/Provider'
import Landing    from 'Views/Landing'
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// import App                   from 'Routes'
import Home                   from 'Home'
// import App                   from 'Views/App'
// import App                   from 'Views/Timeline'
import registerServiceWorker from 'registerServiceWorker'

const App = () => (
  <MediaQuery minWidth={992} className="site">
  { matches => (
    <Provider Desktop={matches}>
      <Landing />
      <Home />
    </Provider>
  )}
  </MediaQuery>
)

// import 'Scss/index.css'

// const Index = () => <h2>Home</h2>;
// const About = () => <h2>About</h2>;
// const Users = () => <h2>Users</h2>;

// const AppRouter = () => (
//   <Router>
//     <div>
//       <nav>
//         <ul>
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/about/">About</Link>
//           </li>
//           <li>
//             <Link to="/users/">Users</Link>
//           </li>
//         </ul>
//       </nav>

//       <Route path="/" exact component={Index} />
//       <Route path="/about/" component={About} />
//       <Route path="/users/" component={Users} />
//     </div>
//   </Router>
// );


ReactDOM.render(
    <App />
  , document.getElementById('app-root')
)

registerServiceWorker()
