import React from "react";
import { Link } from 'react-router-dom';
import SearchNav from '../nav/search_nav_container';
import Map from './map_container';

class BusinessSearch extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchBusinesses(this.props.search);
  }

  getBusinesses() {
     
    const businessList = this.props.businesses.map((business, i) => (
    <div className="search-business" key={i}>
        <img src={business.imgURL} className="business-search-image" />
        <div className="business-search-info">
      <Link to={`/businesses/${business._id}`} className="main-business-name">{business.business_name}</Link>
          <div className="business-info"><p>{business.city}</p></div>
        </div>
      </div>));
    return businessList;
  }

  render() {

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
            <Map businesses={this.props.businesses} /> 
          </div>
        </div> 
        </div>

    );
  }

}

export default BusinessSearch;
