import React from 'react'
import './Search.css'
import SearchBar from './SearchBar'

class Search extends React.Component {
  constructor() {
    super()

    this.state = {
      shrink: false
    }
  }

  setShrink = (shrink) => {
    this.setState({ shrink })
  }

  render() {
    const classes = !this.state.shrink
      ? 'search-container'
      : 'search-container search-container-small'
    return (
      <div className={classes}>
        <SearchBar
          resetSearch={this.props.resetSearch}
          updateSearchTerm={this.props.updateSearchTerm}
          setShrink={this.setShrink} />
      </div>
    )
  }
}
Search.propTypes = {
  updateSearchTerm: React.PropTypes.func.isRequired,
  resetSearch: React.PropTypes.func.isRequired
}
export default Search
