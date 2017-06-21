import React from 'react'
import scriptLoader from 'react-async-script-loader'
import './Map.css'

@scriptLoader(['https://maps.googleapis.com/maps/api/js?key=AIzaSyBfFo3D8jcKdksiauYAs5s3llNeewx0lMg'])
class Map extends React.Component {
  constructor(props) {
    super(props)
    this.markers = []
    this.map = null
    this.infoWindow = null
  }
  componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
      if (isScriptLoadSucceed) {
        this.map = new google.maps.Map(this.refs.map, {
          center: {lat: 41.881832, lng: -87.623177},
          zoom: 11
        })
      } else this.props.onError()
    }
  }

  generateMarkers = () => {
    // delete old markers
    this.markers.forEach((marker) => {
      marker.setMap(null)
    })
    this.markers = []
    if (this.props.results.length === 0) {
      return null
    }
    // load new markers from results
    this.props.results.map((item) => {
      let markerIcon
      if (item.results === 'Pass') { // change icon color based on results of inspection
        markerIcon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
      } else if (item.results === 'Fail') {
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
  isScriptLoaded: React.PropTypes.bool,
  onError: React.PropTypes.func,
  results: React.PropTypes.array
}

export default Map
