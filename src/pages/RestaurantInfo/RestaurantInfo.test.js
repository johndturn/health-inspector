import React from 'react'
import ReactDOM from 'react-dom'
import RestaurantInfo from './RestaurantInfo'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<RestaurantInfo />, div)
})
