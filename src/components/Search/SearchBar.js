import React from 'react'
import './SearchBar.css'

class SearchBar extends React.Component {
  constructor() {
    super()

    this.state = {
      search: ''
    }
  }

  handleTextChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.search !== '') {
      this.props.setShrink(true)
      this.props.updateSearchTerm(this.state.search)
    }
  }

  handleReset = (e) => {
    e.preventDefault()
    this.setState({ search: '' })
    this.props.setShrink(false)
    this.props.resetSearch()
  }

  showList = () => {
    this.context.router.history.push('/')
  }

  showMap = () => {
    this.context.router.history.push('/map/')
  }

  render() {
    return (
      <div className="searchbar-container">
        <form onSubmit={this.handleSubmit} className="search-form">
          <input
            type="search"
            name="search"
            value={this.state.search}
            className="search-input"
            placeholder="Search Restaurants"
            onChange={this.handleTextChange}
          />
          <button
            type="submit"
            onClick={this.handleSubmit}
            className="search-button">
            <i className="search-icon fa fa-search" />
          </button>
        </form>
        <button className="reset-button" onClick={this.handleReset}>Reset</button>
        <div>
          <button className="list-button" onClick={this.showList}>List</button>
          <button className="map-button" onClick={this.showMap}>Map</button>
        </div>
      </div>
    )
  }
}

SearchBar.propTypes = {
  updateSearchTerm: React.PropTypes.func.isRequired,
  setShrink: React.PropTypes.func.isRequired,
  resetSearch: React.PropTypes.func.isRequired
}

SearchBar.contextTypes = {
  router: React.PropTypes.object
}

export default SearchBar
