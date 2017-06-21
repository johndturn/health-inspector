import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import About from './pages/About/About'
import RestaurantInfo from './pages/RestaurantInfo/RestaurantInfo'
import Map from './components/Map/Map'

import Nav from './components/Nav/Nav'
import ResultsList from './components/ResultsList/ResultsList'
import Search from './components/Search/Search'

import './styles/index.css'
import registerServiceWorker from './config/registerServiceWorker'

class Inspector extends React.Component {
  constructor() {
    super()

    this.state = {
      searchTerm: '',
      results: []
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Search />

          <Route exact path="/" component={ResultsList} />
          <Route path="/about/" component={About} />
          <Route path="/map/" component={Map} />
          <Route path="/restaurant/:restaurantId/" component={RestaurantInfo} />
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<Inspector />, document.getElementById('root'))
registerServiceWorker()
