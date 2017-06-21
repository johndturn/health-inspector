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
      results: [],
      loading: false,
      searched: false
    }
    this.getSearchData = this.getSearchData.bind(this)
  }

  updateSearchTerm = (searchTerm) => {
    if (searchTerm.length === 0) {
      return null
    } else {
      this.getSearchData(searchTerm).then((results) => {
        this.setState({
          results,
          searched: true
        })
      }).catch((e) => {
        console.log(e.message)
      })
    }
  }

  resetSearch = () => {
    this.setState({
      results: [],
      loading: false,
      searched: false
    })
  }

  async getSearchData(searchTerm) {
    this.setState({ loading: true })
    let response
    try {
      response = await fetch(`https://data.cityofchicago.org/resource/cwig-ma7x.json?$query=SELECT * where Contains(upper(dba_name), upper("${searchTerm}")) or Contains(upper(aka_name), upper("${searchTerm}")) LIMIT 100`)
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
    this.setState({ loading: false })
    return json
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Search
            updateSearchTerm={this.updateSearchTerm}
            resetSearch={this.resetSearch} />

          <Route exact path="/" render={() => (
            <ResultsList
              searched={this.state.searched}
              results={this.state.results}
              loading={this.state.loading} />
          )} />
          <Route path="/about/" component={About} />
          <Route path="/map/" render={() => (
            <Map results={this.state.results} />
          )} />
          <Route path="/restaurant/:restaurantId/" component={RestaurantInfo} />
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<Inspector />, document.getElementById('root'))
registerServiceWorker()
