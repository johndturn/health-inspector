import React from 'react'

import ListItem from '../ListItem/ListItem'

import './ResultsList.css'

class ResultsList extends React.Component {
  constructor() {
    super()

    this.state = {
      loading: false,
      results: [
        {
          'address': '3329 N MILWAUKEE AVE ',
          'aka_name': 'Subway',
          'city': 'CHICAGO',
          'dba_name': 'Subway Sandwich And Salads',
          'facility_type': 'Restaurant',
          'inspection_date': '2014-10-01T00:00:00.000',
          'inspection_id': '1497418',
          'inspection_type': 'Canvass',
          'latitude': '41.941701770957565',
          'license_': '2074325',
          'location': {
            'type': 'Point',
            'coordinates': [
              -87.727891,
              41.941702
            ]
          },
          'longitude': '-87.72789069244538',
          'results': 'Pass',
          'risk': 'Risk 1 (High)',
          'state': 'IL',
          'zip': '60641'
        },
        {
          'address': '3329 N MILWAUKEE AVE ',
          'aka_name': 'Subway',
          'city': 'CHICAGO',
          'dba_name': 'Subway Sandwich And Salads',
          'facility_type': 'Restaurant',
          'inspection_date': '2014-10-01T00:00:00.000',
          'inspection_id': '1497418',
          'inspection_type': 'Canvass',
          'latitude': '41.941701770957565',
          'license_': '2074325',
          'location': {
            'type': 'Point',
            'coordinates': [
              -87.727891,
              41.941702
            ]
          },
          'longitude': '-87.72789069244538',
          'results': 'Out of Business',
          'risk': 'Risk 1 (High)',
          'state': 'IL',
          'zip': '60641'
        }
      ]
    }
  }

  render() {
    return (
      <div className="results-list-container">
        <div className="results-list">
          { this.state.results.map((item, i) => (
            <ListItem key={i} restaurant={item} />
          ))}
        </div>
      </div>
    )
  }
}

export default ResultsList
