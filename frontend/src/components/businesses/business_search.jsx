import React from "react";
import { Link } from 'react-router-dom';
import SearchNav from '../nav/search_nav_container';
import Map from './map_container';
import RatingStar from "../rating/star_rating_container";

class BusinessSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { search: "" };
  }

  componentDidMount() {
    this.props.fetchBusinesses(this.props.search);
    this.setState({ search: this.props.search });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.search !== this.props.search) {
      this.props.fetchBusinesses(this.props.search);
    }
  }

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
    let browseMsg = <p className="search-page-title">Browsing {this.props.search} Coffee Shops</p>

    if (this.props.businesses.length === 0) {
      browseMsg = <><p className="search-page-title">No Results for {this.props.search}. Please search for "Oakland", "San Francisco", or "San Jose".</p></>
    }
    return (
      <div>
        <div className="search-nav">
          <SearchNav />
        </div>
        <div className="title-div">
          {browseMsg}
        </div>
        {/* <p className="search-page-subtitle">All Results</p> */}
         <div className="index-contents">
          <div className="search-business-list">
            {this.getBusinesses()}
          </div>
          <div className="map-div"> 
            <Map businesses={this.props.businesses}
                  search={this.props.search}
            /> 
          </div>
        </div> 
        </div>

    );
  }

}

export default BusinessSearch;
