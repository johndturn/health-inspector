import React from 'react'
import './SearchBar.css'
import SearchIcon from '../../assets/searchIcon.png'

class SearchBar extends React.Component {
  constructor() {
    super()

    this.state = {
      search: '',
      results: ''
    }
  }

  handleTextChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.updateSearchTerm(this.state.search)
  }
  render() {
    return (
      <div className="searchbar-container">
        <form onSubmit={this.handleSubmit} className="search-form">
          <input
            type="search"
            name="search"
            className="search-input"
            placeholder="Search Restaurants"
            onChange={this.handleTextChange}
          />
          <button type="submit" className="search-button">
            <img src={SearchIcon} className="search-icon" />
          </button>
        </form>
      </div>
    )
  }
}

SearchBar.propTypes = {
  updateSearchTerm: React.PropTypes.func.isRequired
}

export default SearchBar
