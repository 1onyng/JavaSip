import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './marker';


const APIkey = require("./config/map_key").MapKey;

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 37.834416,
      lng: -122.300707
    },
    zoom: 11
  };
  constructor(props) {
    super(props)
  }

  placeMarkers() {
    let businessList = this.props.businesses; 
    return businessList.map((business, i) => {
      if (business.lat && business.long ) {
      return <Marker 
        lat={business.lat}
        lng={business.long}
        name={business.business_name}
        color="#893c1f"
      />
    }
    });
  }

  render() {
    return (
      
      <div style={{ height: '325px', width: '300px' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: APIkey  }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {this.placeMarkers()}

        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;