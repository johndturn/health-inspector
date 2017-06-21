import React from 'react'
import scriptLoader from 'react-async-script-loader'
import './Map.css'

@scriptLoader(['https://maps.googleapis.com/maps/api/js?key=AIzaSyBfFo3D8jcKdksiauYAs5s3llNeewx0lMg'])
class Map extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
    this.map = null
    this.infoWindow = null
  }
  componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
      if (isScriptLoadSucceed) {
        this.map = new google.maps.Map(this.refs.map, {
          center: {lat: 41.881832, lng: -87.623177},
          zoom: 10
        })
      } else this.props.onError()
    }
  }

  componentDidMount() {
    // generate makers if there is search data
    this.props.results && this.generateMarkers()
  }

  generateMarkers = () => {
    this.props.results.map((item) => {
      const marker = new google.maps.Marker({
        position: {lat: parseFloat(item.latitude), lng: parseFloat(item.longitude)},
        map: this.map
      })

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
    return (
      <div>
        <div ref="map" style={{height: '500px', width: '500px'}} />
        { !this.map && <div className="center-md">Loading...</div>}
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
