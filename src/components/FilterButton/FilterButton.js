import React from 'react'
import './FilterButton.css'
import onClickOutside from 'react-onclickoutside'

class FilterButton extends React.Component {
  constructor() {
    super()

    this.state = {
      showDropdown: false
    }
  }

   handleClickOutside = (e) => {
     // handle outside click
     this.toggleDropdown(e)
   }

   toggleDropdown = (outside) => {
     // if window click is outside, dropdown is always false
     outside ? this.setState({ showDropdown: false }) : this.setState({ showDropdown: !this.state.showDropdown })
   }
   render() {
    const dropdownContainerClasses = this.state.showDropdown ? 'dropdown-content show' : 'dropdown-content'
    return (
      <div>
        <button type="button" className="filter-button" onClick={() => this.toggleDropdown(false)}>{this.props.filter}
          <i className="fa fa-angle-down" aria-hidden="true" />
        </button>
        <div id="myDropdown" className={dropdownContainerClasses}>
          <button type="button" onClick={() => this.props.changeFilter('All')} className="filter-item">All</button>
          <button type="button" onClick={() => this.props.changeFilter('Pass')} className="filter-item">Pass</button>
          <button type="button" onClick={() => this.props.changeFilter('Fail')} className="filter-item">Fail</button>
        </div>
      </div>
    )
  }
}

FilterButton.propTypes = {
  changeFilter: React.PropTypes.func.isRequired,
  filter: React.PropTypes.string.isRequired
}

export default onClickOutside(FilterButton)
