import React from 'react'
import './SearchBar.css'

class SearchBar extends React.Component {
  constructor() {
    super()

    this.state = {
      search: '',
      isListSelected: true
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
    this.setState({
      isListSelected: true
    })
  }

  showMap = () => {
    this.context.router.history.push('/map/')
    this.setState({
      isListSelected: false
    })
  }

  render() {
    const mapButtonClasses = this.state.isListSelected ? 'map-button red' : 'map-button white'
    const listButtonClasses = this.state.isListSelected ? 'list-button white' : 'list-button red'
    return (
      <div>
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
            <button className="reset-button" onClick={this.handleReset}>Reset</button>
          </form>
        </div>
        <div className="toggle-container">
          <button className={listButtonClasses} onClick={this.showList}>
            <i className="fa fa-list" aria-hidden="true" />
          </button>
          <button className={mapButtonClasses} onClick={this.showMap}>
            <i className="fa fa-map-marker" aria-hidden="true" />
          </button>
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
