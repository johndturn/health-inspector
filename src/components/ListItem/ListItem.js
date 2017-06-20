import React from 'react'

import GreenBadge from '../../assets/GreenBadge.png'
/* import YellowBadge from '../../assets/YellowBadge.png' */
import RedBadge from '../../assets/RedBadge.png'
import GreyBadge from '../../assets/GreyBadge.png'

import './ListItem.css'

class ListItem extends React.Component {
  constructor() {
    super()

    this.state = {
      showMore: false
    }
  }

  render() {
    let badge
    if (this.props.restaurant.results === 'Fail') {
      badge = RedBadge
    } else if (this.props.restaurant.results === 'Pass') {
      badge = GreenBadge
    } else {
      badge = GreyBadge
    }

    return (
      <div className="result-list-item">
        <div className="result-list-item-description">
          <h2>{this.props.restaurant.aka_name}</h2>
          <span>{this.props.restaurant.address}</span>
        </div>
        <div className="result-list-item-badge">
          <img src={badge}
            alt={this.props.restaurant.results}
            title={this.props.restaurant.results} />
        </div>
      </div>
    )
  }
}

ListItem.propTypes = {
  restaurant: React.PropTypes.object.isRequired
}

export default ListItem
