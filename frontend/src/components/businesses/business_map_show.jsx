import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./marker";

const APIkey = require("./config/map_key").MapKey;

class showMap extends Component {
  
  constructor(props) {
    super(props);
  }

  placeMarkers() {
    let business = this.props.business;
    return (
      <Marker
        lat={business.lat}
        lng={business.long}
        name={business.business_name}
        color="#893c1f"
      />
    );
  }

  render() {
    return (
      <div style={{ height: "135px", width: "275px" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: APIkey }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {this.placeMarkers()}
        </GoogleMapReact>
      </div>
    );
  }
}

export default showMap;
