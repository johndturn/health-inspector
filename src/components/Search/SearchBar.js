import React from 'react'
import './SearchBar.css'
import FilterButton from '../FilterButton/FilterButton'

class SearchBar extends React.Component {
  constructor() {
    super()

    this.state = {
      search: '',
      searched: false,
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
      this.setState({ searched: true })
      this.props.setShrink(true)
      this.props.updateSearchTerm(this.state.search)
    }
  }

  handleReset = (e) => {
    e.preventDefault()
    this.setState({ search: '', searched: false })
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
            <FilterButton filter={this.props.filter} changeFilter={this.props.changeFilter} />
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
            <button className="reset-button" onClick={this.handleReset}>
              <i className="fa fa-repeat" />
            </button>
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
  resetSearch: React.PropTypes.func.isRequired,
  changeFilter: React.PropTypes.func.isRequired,
  filter: React.PropTypes.string.isRequired
}

SearchBar.contextTypes = {
  router: React.PropTypes.object
}

export default SearchBar
