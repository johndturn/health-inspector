import React from 'react'
import scriptLoader from 'react-async-script-loader'
import './Map.css'

@scriptLoader(['https://maps.googleapis.com/maps/api/js?key=AIzaSyBfFo3D8jcKdksiauYAs5s3llNeewx0lMg'])
class Map extends React.Component {
  constructor(props) {
    super(props)
    this.map = null
  }
  componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
      if (isScriptLoadSucceed) {
        this.map = new google.maps.Map(this.refs.map, {
          center: {lat: 41.8781, lng: 87.6298},
          zoom: 20
        })
      } else this.props.onError()
    }
  }

  render() {
    return (
      <div>
        <div ref="map" style={{height: '80%', width: '80%'}} />
        { !this.map && <div className="center-md">Loading...</div> }
      </div>
    )
  }
}

Map.propTypes = {
  isScriptLoaded: React.PropTypes.bool,
  onError: React.PropTypes.func
}

export default Map
