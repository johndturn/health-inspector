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

  componentDidMount() {
    // TODO: Remove - just for testing
    setTimeout(() => {
      this.setState({shrink: true})
    }, 3000)
  }

  render() {
    const classes = !this.state.shrink
      ? 'search-container'
      : 'search-container search-container-small'
    return (
      <div className={classes}>
        <SearchBar updateSearchTerm={this.props.updateSearchTerm} />
      </div>
    )
  }
}
Search.propTypes = {
  updateSearchTerm: React.PropTypes.func.isRequired
}
export default Search
