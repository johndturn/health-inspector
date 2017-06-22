import React from 'react'
import './Nav.css'
import Logo from '../Logo/Logo'

class Nav extends React.Component {
  render() {
    const navbarClasses = this.props.userHasSearched
      ? 'navbar'
      : 'navbar-hide'
    return (
      <div className={navbarClasses}>
        <Logo logoSizeIsSmall={this.props.userHasSearched} />
      </div>
    )
  }
}

Nav.propTypes = {
  userHasSearched: React.PropTypes.bool.isRequired
}

export default Nav
