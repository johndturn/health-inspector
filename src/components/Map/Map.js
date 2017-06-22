import React from 'react'
import './Map.css'

class Map extends React.Component {
  constructor(props) {
    super(props)
    this.markers = []
    this.map = null
    this.infoWindow = null
  }

  componentDidMount() {
    if (this.props.isScriptLoadSucceed && !this.map) {
      this.map = new google.maps.Map(this.refs.map, {
        center: {lat: 41.881832, lng: -87.623177},
        zoom: 11
      })
      this.generateMarkers()
    }
  }

  generateMarkers = () => {
    // create map if not there
    if (this.props.isScriptLoadSucceed && this.map != null) {
      this.map = new google.maps.Map(this.refs.map, {
        center: {lat: 41.881832, lng: -87.623177},
        zoom: 11
      })
    }
    // delete old markers
    this.markers.forEach((marker) => {
      marker.setMap(null)
    })
    this.markers = []
    if (this.props.results.length === 0) {
      if (this.map) {
        this.map.setOptions({ // disable scrolling when there are now markers
          draggable: false,
          zoomControl: false,
          scrollwheel: false,
          disableDoubleClickZoom: true
        })
      }
      return null
    }
    // load new markers from results
    this.props.results.map((item) => {
      // don't make markers for out of business
      if (item.results.toUpperCase() !== 'Out of Business'.toUpperCase()) {
        let markerIcon
        if (item.results.toUpperCase() === 'Pass'.toUpperCase()) { // change icon color based on results of inspection
          markerIcon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
        } else if (item.results.toUpperCase() === 'Fail'.toUpperCase()) {
          markerIcon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
        } else {
          markerIcon = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
        }
        const marker = new google.maps.Marker({
          position: {lat: parseFloat(item.latitude), lng: parseFloat(item.longitude)},
          map: this.map,
          icon: markerIcon
        })
        this.markers.push(marker)

        google.maps.event.addListener(marker, 'click', ((marker) => {
          return () => {
            let infowindow = new google.maps.InfoWindow({
              content: `<p>${item.dba_name}<br />
                        ${item.address}<br />
                        ${item.results}<br />
                        </p>`
            })
            infowindow.open(this.map, marker)
          }
        })(marker))
      }
    })
  }

  render() {
    // generate markers if there are results
    this.generateMarkers()
    return (
      <div className="map-container">
        <div ref="map" className="map" />
      </div>
    )
  }
}

Map.propTypes = {
  results: React.PropTypes.array,
  isScriptLoadSucceed: React.PropTypes.bool
}

export default Map
