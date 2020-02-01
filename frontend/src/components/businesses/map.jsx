import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './marker';


const APIkey = require("./config/map_key").MapKey;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = { center: {} };
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

  componentDidMount() {
    if (this.props.search === "Oakland") {
      this.setState({ center: { lat: 37.834416, lng: -122.300707 } });
    } else if (this.props.search === "San Francisco") {
      this.setState({ center: { lat: 37.7758, lng: -122.435 } });
    } else if (this.props.search === "San Jose") {
      this.setState({ center: { lat: 37.375240, lng: -121.877454 } });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.search !== this.props.search) {
      if (nextProps.search === "Oakland") {
        this.setState({center: { lat: 37.834416, lng: -122.300707 }});
      } else if (nextProps.search === "San Francisco") {
        this.setState({center: { lat: 37.7758, lng: -122.435 }});
      } else if (nextProps.search === "San Jose") {
        this.setState({center: { lat: 37.375240, lng: -121.877454 }});
      }
    }
  }

  render() {
    return (
      <div style={{ height: '325px', width: '300px' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: APIkey  }}
          // defaultCenter={center}
          // defaultCenter={this.props.search}
          center={this.state.center}
          defaultZoom={11}
        >
          {this.placeMarkers()}
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;