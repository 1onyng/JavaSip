import React from "react";
import { Link } from 'react-router-dom';
import SearchNav from '../nav/search_nav_container';
class BusinessSearch extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    
    this.props.fetchBusinesses(this.props.search);
  }

  getBusinesses() {
     
    const businessList = this.props.businesses.map((business, i) => <div className="search-buisness"key={i}>{business.business_name}</div>);
    return businessList;
  }

  render() {

    return (
      <div>
        <div className="search-nav">
          <SearchNav />
        </div>
        <p className="search-page-title">Browsing {this.props.search} Coffee Shops</p>
          <div className="search-business-list">
            {this.getBusinesses()}
          </div>
        </div>

    );
  }

}

export default BusinessSearch;
