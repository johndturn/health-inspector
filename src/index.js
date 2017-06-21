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
      results: []
    }
    this.getSearchData = this.getSearchData.bind(this)
  }

  updateSearchTerm = (searchTerm) => {
    this.getSearchData(searchTerm).then((results) => {
      this.setState({
        results
      })
    }).catch((e) => {
      console.log(e.message)
    })
  }

  async getSearchData(searchTerm) {
    let response
    try {
      response = await fetch(`https://data.cityofchicago.org/resource/cwig-ma7x.json?$query=SELECT * where Contains(dba_name, "${searchTerm}") or Contains(aka_name, "${searchTerm}") LIMIT 100`)
      if (!response.ok) {
        throw Error('Bad Request')
      }
    } catch (e) {
      throw e
    }
    let json
    try {
      json = await response.json()
    } catch (e) {
      throw e
    }
    return json
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Search updateSearchTerm={this.updateSearchTerm} />

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
