import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './marker';


const APIkey = require("./config/map_key").MapKey;

class Map extends Component {
  constructor(props) {
    super(props)
  }

  placeMarkers() {
    debugger;
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
    let center;
    if (this.props.search === "Oakland") {
      center = { lat: 37.834416, lng: -122.300707 };
    } else if (this.props.search === "San Francisco") {
      center = { lat: 37.7758, lng: -122.435 };
    } else if (this.props.search === "San Jose") {
      center = { lat: 37.375240, lng: -121.877454 };
    }

    return (
      
      <div style={{ height: '325px', width: '300px' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: APIkey  }}
          defaultCenter={center}
          defaultZoom={11}
        >
          {this.placeMarkers()}

        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;