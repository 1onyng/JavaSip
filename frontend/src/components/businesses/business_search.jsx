import React from "react";
import { Link } from 'react-router-dom';
import SearchNav from '../nav/search_nav_container';
import Map from './map_container';
import RatingStar from "../rating/star_rating_container";

class BusinessSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { search: "" };
    // this.updateSearch = this.updateSearch.bind(this);
  }

  componentDidMount() {
    this.props.fetchBusinesses(this.props.search);
    this.setState({ search: this.props.search });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.search !== this.props.search) {
      this.props.fetchBusinesses(this.props.search);
      // this.setState({ search: this.props.search });
      // this.updateSearch();
    }
  }

  // updateSearch() {
  //   this.setState({ search: this.props.search })
  // }

  getPrice(n) {
    let price = "";
    let i;
    for (i = 0; i < n; i++) {
      price += "$";
    }
    return <p>{price}</p>
  }
  
  hasWifi(wifi) {
    return <div>{wifi ? <div className="wifi"><i className="fas fa-wifi"></i><p className="wifi-description">Free Wifi</p></div> : ""}</div>
  }

  getReviewRate(reviews) {
    let sum = 0; 
    reviews.forEach(review => {
      sum += review.rate
    })
    let avg = Math.floor(sum / reviews.length);
    return reviews.length === 0 ? <p className="no-review-count">0 reviews</p> : <div className="avg-rate-search"><RatingStar name="rate" rate={avg} readOnly="true" /><p className="has-review-count">{reviews.length} reviews</p></div>; 
  }

  getBusinesses() {
    const businessList = this.props.businesses.map((business, i) => (
      <div className="search-business" key={i}>
        <img src={business.imgURL} className="business-search-image" />
        <div className="business-description-div">
          <div className="business-search-info">
            <Link to={`/businesses/${business._id}`} className="search-business-name">{business.business_name}</Link>
            <p className="shop-price">{this.getPrice(business.price)}</p>
            {this.getReviewRate(business.reviews)}
            {this.hasWifi(business.wifi)}
          </div>
          <div className="business-search-address">
            <div className="business-info">
              <p>{business.street_address}</p>
              <p>{business.city}, {business.state}</p>
              <p>{business.phone}</p>
          </div>
        </div>
        </div>
      </div>));
    return businessList;
  }

  render() {
    // let center;
    // if (this.props.search === "Oakland") {
    //   center = { lat: 37.834416, lng: -122.300707 };
    // } else if (this.props.search === "San Francisco") {
    //   center = { lat: 37.7758, lng: -122.435 };
    // } else if (this.props.search === "San Jose") {
    //   center = { lat: 37.375240, lng: -121.877454 };
    // }
    debugger;
    return (
      <div>
        <div className="search-nav">
          <SearchNav />
        </div>
        <div className="title-div">
          <p className="search-page-title">Browsing {this.props.search} Coffee Shops</p>
        </div>
        <p className="search-page-subtitle">All Results</p>
         <div className="index-contents">
          <div className="search-business-list">
            {this.getBusinesses()}
          </div>
          <div className="map-div"> 
            <Map businesses={this.props.businesses}
                  search={this.props.search}
                  // search={this.state.search}
                  // search={center}
            /> 
          </div>
        </div> 
        </div>

    );
  }

}

export default BusinessSearch;
