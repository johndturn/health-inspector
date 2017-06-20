import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import About from './pages/About/About'
import Nav from './components/Nav/Nav'
import RestaurantInfo from './pages/RestaurantInfo/RestaurantInfo'
import Search from './pages/Search/Search'
import MapContainer from './pages/Map/Map'
import registerServiceWorker from './config/registerServiceWorker'

import './styles/index.css'

const Inspector = () => (
  <Router>
    <div>
      <Nav />

      <Route exact path="/" component={Search} />
      <Route path="/about/" component={About} />
      <Route path="/map/" component={MapContainer} />
      <Route path="/restaurant/:restaurantId/" component={RestaurantInfo} />
    </div>
  </Router>
)

ReactDOM.render(<Inspector />, document.getElementById('root'))
registerServiceWorker()
